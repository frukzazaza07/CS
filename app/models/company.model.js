const mongoose = require("mongoose");

const Company = mongoose.model(
    "Company",
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
        isDelete: { type: Boolean, enum: [true, false] },
        createdAt: String,
    })
);

module.exports = Company;