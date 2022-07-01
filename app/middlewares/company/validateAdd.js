
let {
    returnValidationError,
} = require("../../libaries/returnData");
let {
    validateAllData,
} = require("../../libaries/lib");

const validateAddData = (req, res, next) => {
    const data = [{
            key: "Company_code",
            value: req.body.companyCode,
            option: ["isAlphanumeric"],
        },
        {
            key: "Company_name",
            value: req.body.companyName,
            option: ["isAlphanumeric"],
        },
        {
            key: "Company_address",
            value: req.body.companyAddress,
            option: ["isAlphanumeric"],
        },
        {
            key: "Company_branch",
            value: req.body.companyBranch,
            option: ["isMaxValue:100", "isAlphanumeric"],
        },
        {
            key: "Company_telephone",
            value: req.body.companyTelephone,
            option: ["isNumeric"],
        },
        {
            key: "Company_fax",
            value: req.body.companyFax,
            option: ["isAlphanumeric"],
        },
        {
            key: "Company_remark",
            value: req.body.companyRemark,
            option: ["isAlphanumeric"],
        },
        {
            key: "Company_logo",
            value: req.body.companyRemark,
            option: ["isAcceptFileSize:3", "isAcceptFileType:png,jpg,jpeg"],
        },
        {
            key: "Company_map",
            value: req.body.companyRemark,
            option: ["isAcceptFileSize:3", "isAcceptFileType:png,jpg,jpeg"],
        },
    ]
    const validateResults = validateAllData([], data);
    if (validateResults.status === false) {
        returnValidationError.errors = validateResults.errorsResults;
        return res.status(401).send(returnValidationError);
    }
    next();
};
const validateAdd = {
    validateAddData,
};

module.exports = validateAdd;