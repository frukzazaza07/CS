const mongoose = require("mongoose");
const UserGoogle = mongoose.model(
    "UserGoogle",
    new mongoose.Schema({
        googleId: String,
        email: String,
        firstname: String,
        lastname: String,
        roles: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role"
        }],
        createdAt: String
    })
);

module.exports = UserGoogle;