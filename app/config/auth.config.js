const jwt = require("jsonwebtoken");
const secret = "secretkey";

const createJwtToken = (userId, tokenExpired) => {
  const accessToken = jwt.sign({
    id: userId
  }, secret, {
    expiresIn: tokenExpired,
  })
  return accessToken;
};

const typeLogin = {
  normal: "normal",
  google: "google",
}

module.exports = {
  secret: secret,
  typeLogin,
  accessTokenExpiresIn: 1,
  rememberMeTokenExpiresIn: 730,
  createJwtToken,
};