const authJwt = require("./authJwt");
const verifySignUp = require("./verifySignUp");
const validateSignUpData = require("./validateSignUpData");
const validateCompanyAdd = require("./company/validateAdd");

module.exports = {
  authJwt,
  verifySignUp,
  validateSignUpData,
  validateCompanyAdd
};
