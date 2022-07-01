const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.address = require("./address.model");
db.userGoogle = require("./userGoogle.model");
db.userGoogle = require("./userGoogle.model");
db.company = require("./company.model");

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;