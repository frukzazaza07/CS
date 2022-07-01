const mongoose = require("mongoose");

const Address = mongoose.model(
    "company",
    new mongoose.Schema({
        createBy: String,
        Company_code: String,
        Company_name: String,
        Company_address: String,
        Company_branch: String,
        Company_telephone: String,
        Company_fax: String,
        Company_remark: String,
        Company_logo: String,
        Company_map: String,
        createdAt: String,
    })
);

module.exports = Address;