const mongoose = require("mongoose");

const Address = mongoose.model(
    "Address",
    new mongoose.Schema({
        addressNo: String,
        addressDetail: String,
        district: String,
        subDistrict: String,
        province: String,
        postCode: String,
        createdAt: String,
    })
);

module.exports = Address;