const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;
let {
  returnValidationError,
} = require("../libaries/returnData");

checkDuplicateUsernameOrEmail = async (req, res, next) => {
  // Username
  const userData = {
    username: req.body.username
  };
  // ตัวอย่าง callback function
  // User.findOne(userData).exec((err, user) => {
  //   if (err) {
  //     res.status(500).send({
  //       message: err
  //     });
  //     return;
  //   }

  //   if (user) {
  //     res.status(400).send({
  //       message: "Failed! Username is already in use!"
  //     });
  //     return;
  //   }
  //   next();
  // });
  const user = await User.findOne(userData).exec();

  if (user) {
    returnValidationError.message = "Failed! Username is already in use!";
    return res.status(400).send(returnValidationError);
  }
  // console.log(user);
  next();
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        returnValidationError.message = `Failed! Role ${req.body.roles[i]} does not exist!`;
        res.status(400).send(returnValidationError);
        return;
      }
    }
  }

  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted
};

module.exports = verifySignUp;