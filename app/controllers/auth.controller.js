const config = require("../config/auth.config");
const db = require("../models");
const {
  returnSuccess,
  returnValidationError,
  returnFailed
} = require("../libaries/returnData");
const {
  createDate
} = require("../libaries/lib");
// google
const metadata = require('gcp-metadata');
const {
  OAuth2Client
} = require('google-auth-library');

const clientId = "366255957559-10oiqhc8t5cnpagu8v5kgsnte9sk415c.apps.googleusercontent.com";
const oAuth2Client = new OAuth2Client(clientId);

const User = db.user;
const UserGoogle = db.userGoogle;
const Role = db.role;
const Address = db.address;
const tokenRememberMeExpried = config.rememberMeTokenExpiresIn;
const tokenAccessExpried = config.accessTokenExpiresIn;

let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");

// register
exports.signup = async (req, res) => {
  const userData = {
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 8),
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    idCard: req.body.idCard,
    roles: req.body.roles || "user",
    address: null,
    createdAt: createDate(),
  };
  const addressData = {
    addressNo: "req.body.addressNo",
    addressDetail: req.body.addressDetail,
    district: req.body.district,
    subDistrict: req.body.subDistrict,
    province: req.body.province,
    postCode: req.body.postCode,
    createdAt: createDate(),
  };

  // validate data

  // check user permissions Roles
  const roleCheck = await Role.find({
    name: {
      $in: userData.roles
    }
  });

  if (roleCheck.length === 0) {
    returnValidationError.status = false;
    returnValidationError.errors = [{
      roles: "User role is miss match."
    }];
    return res.status(400).send(returnValidationError);
  }

  // save address
  try {
    const address = new Address(addressData);
    const addressSave = await address.save();

    const user = new User(userData);
    if (addressSave) {
      user.address = addressSave.id;
    }

    user.roles = roleCheck[0].id;
    // returnSuccess.results = user;
    const userSave = await user.save();
    returnSuccess.message = "Created user successfully.";
    return res.status(200).send(returnSuccess);
  } catch (error) {
    returnFailed.errors = error.message || error.toString();
    return res.status(500).send(returnFailed);
  }

};

exports.signin = async (req, res) => {
  try {
    const checkRememberMe = req.body.rememberMe || false;
    // const tokenRememberMeExpried = 60 * 60 * 24 * 365 * 2;
    // const tokenAccessExpried = 60 * 60 * 24;


    const userData = await User.findOne({
        username: req.body.username
      })
      .populate("roles", "-__v")
      .exec();

    if (!userData) {
      return res.status(401).send({
        message: "Username or password incorrect."
      });
    }

    let passwordIsValid = bcrypt.compareSync(
      req.body.password,
      userData.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Username or password incorrect."
      });
    }

    // let accessToken = jwt.sign({
    //   id: userData.id
    // }, config.secret, {
    //   expiresIn: tokenAccessExpried + "d",
    // });

    const accessToken = config.createJwtToken(userData.id, tokenAccessExpried + "d");

    if (checkRememberMe === true) {
      // rememberMeToken = jwt.sign({
      //   id: userData.id
      // }, config.secret, {
      //   expiresIn: tokenRememberMeExpried + "d",
      // });
      rememberMeToken = config.createJwtToken(userData.id, tokenRememberMeExpried + "d");

    }

    let authorities = [];
    for (let i = 0; i < userData.roles.length; i++) {
      authorities.push("ROLE_" + userData.roles[i].name.toUpperCase());
    }

    returnSuccess.results = {
      id: userData._id,
      username: userData.username,
      email: userData.email,
      roles: authorities,
      accessToken: accessToken,
      accessTokenExpiresIn: createDate("yyyy-mm-dd hh:mm:ss", tokenAccessExpried),
      isRememberMe: checkRememberMe,
      rememberMeExpiresIn: (checkRememberMe === true ? createDate("yyyy-mm-dd hh:mm:ss", tokenRememberMeExpried) : ""),
      typeLogin: config.typeLogin.normal,
    }
    returnSuccess.message = "Loggedin successfully.";

    return res.status(200).send(returnSuccess);
  } catch (error) {
    returnFailed.errors = error.message || error.toString();
    return res.status(500).send(returnFailed);
  }


  // (err, user) => {
  //   if (err) {
  //     res.status(500).send({
  //       message: err
  //     });
  //     return;
  //   }

  //   if (!user) {
  //     return res.status(401).send({
  //       message: "Username or password incorrect."
  //     });
  //   }

  //   let passwordIsValid = bcrypt.compareSync(
  //     req.body.password,
  //     user.password
  //   );

  //   if (!passwordIsValid) {
  //     return res.status(401).send({
  //       accessToken: null,
  //       message: "Username or password incorrect."
  //     });
  //   }

  //   let token = jwt.sign({
  //     id: user.id
  //   }, config.secret, {
  //     expiresIn: 86400 // 24 hours
  //     // 1day seconds = 86400
  //   });

  //   let authorities = [];

  //   for (let i = 0; i < user.roles.length; i++) {
  //     authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
  //   }
  //   res.status(200).send({
  //     id: user._id,
  //     username: user.username,
  //     email: user.email,
  //     roles: authorities,
  //     accessToken: token
  //   });
  // }
};

exports.googleSignin = async (req, res) => {
  try {
    const googleUserToken = req.body.googleUserToken;
    const ticket = await oAuth2Client.verifyIdToken({
      idToken: googleUserToken,
      audience: clientId,
    })
    const payload = ticket.getPayload();
    const userId = payload['sub'];

    const userData = {
      googleId: userId,
      email: req.body.email,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      roles: "user",
      createdAt: createDate(),
    };
    let userIdMongo = "";
    // search google user
    let googleUserData = await UserGoogle.findOne({
        googleId: userData.googleId,
      })
      .populate("roles", "-__v")
      .exec();
    
    if (!googleUserData) {
      // ถ้าไม่เจอ สร้าง google user
      const roleCheck = await Role.find({
        name: {
          $in: userData.roles
        }
      });

      if (roleCheck.length === 0) {
        returnValidationError.status = false;
        returnValidationError.errors = [{
          roles: "User role is miss match."
        }];
        return res.status(400).send(returnValidationError);
      }
      
      const userGoogle = new UserGoogle(userData);

      userGoogle.roles = roleCheck[0].id;
      // returnSuccess.results = user;
      googleUserData = await userGoogle.save();
      googleUserData.roles = roleCheck;
      // userIdMongo = "";
      
    }// end check if not have user
    const checkRememberMe = req.body.rememberMe || false;
    const accessToken = config.createJwtToken(userData.id, tokenAccessExpried + "d");

    // let rememberMe = null;
    if (checkRememberMe === true) {
      rememberMeToken = config.createJwtToken(userData.id, tokenRememberMeExpried + "d");
    }

    let authorities = [];
    for (let i = 0; i < googleUserData.roles.length; i++) {
      authorities.push("ROLE_" + googleUserData.roles[i].name.toUpperCase());
    }

    returnSuccess.results = {
      id: googleUserData._id,
      email: googleUserData.email,
      roles: authorities,
      accessToken: accessToken,
      accessTokenExpiresIn: createDate("yyyy-mm-dd hh:mm:ss", tokenAccessExpried),
      isRememberMe: checkRememberMe,
      rememberMeExpiresIn: (checkRememberMe === true ? createDate("yyyy-mm-dd hh:mm:ss", tokenRememberMeExpried) : ""),
      typeLogin: config.typeLogin.google,
    }
    returnSuccess.message = "Loggedin successfully.";

    return res.status(200).send(returnSuccess);
  } catch (error) {
    returnFailed.errors = error.message || error.toString();
    return res.status(500).send(returnFailed);
  }
};
