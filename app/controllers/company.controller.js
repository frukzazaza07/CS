const db = require("../models");
const Company = db.company;
const {
    returnSuccess,
    returnValidationError,
    returnFailed
} = require("../libaries/returnData");
const {
    createDate,
    uploadImage
} = require("../libaries/lib");

exports.add = async (req, res) => {
    //   // save address
    try {
        const uploadCompanyMap = await uploadImage(req.body.companyLogo);
        const uploadCompanyLogo = await uploadImage(req.body.companyMap);
        const companyData = {
            Company_code: req.body.companyCode,
            Company_name: req.body.companyName,
            Company_address: req.body.companyAddress,
            Company_branch: req.body.companyBranch,
            Company_telephone: req.body.companyTelephone,
            Company_fax: req.body.companyFax,
            Company_remark: req.body.companyRemark,
            createBy: req.body.userId,
            Company_logo: uploadCompanyLogo.pathImage,
            Company_map: uploadCompanyMap.pathImage,
            isDelete: false,
            createdAt: createDate(),
        };
        const company = new Company(companyData);
        const companySave = await company.save();

        returnSuccess.message = "Created company successfully.";
        return res.status(200).send(returnSuccess);
    } catch (error) {
        returnFailed.errors.push(error.message || error.toString());
        return res.status(500).send(returnFailed);
    }

};
exports.retive = async (req, res) => {
    //   // save address
    try {
        const companyRetiveData = await Company.find({});
        console.log(companyRetiveData);
        returnSuccess.message = "Retive company data successfully.";
        returnSuccess.results = companyRetiveData;
        return res.status(200).send(returnSuccess);
    } catch (error) {
        returnFailed.errors.push(error.message || error.toString());
        return res.status(500).send(returnFailed);
    }

};