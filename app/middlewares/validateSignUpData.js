const db = require("../models");
let {
    returnValidationError,
} = require("../libaries/returnData");
let {
    validateAllData,
} = require("../libaries/lib");

const validateSignUpData = (req, res, next) => {
    let errorData = [];

    const data = [{
            key: "username",
            value: req.body.username,
            option: ["isMinValue:4", "isMaxValue:20", "isAlphanumeric"],
        },
        {
            key: "password",
            value: req.body.password,
            option: ["isMinValue:8", "isMaxValue:20"],
        },
        {
            key: "firstname",
            value: req.body.firstname,
            option: ["isMaxValue:100", "isAlphanumeric"],
        },
        {
            key: "lastname",
            value: req.body.lastname,
            option: ["isMaxValue:100", "isAlphanumeric"],
        },
        {
            key: "idCard",
            value: req.body.idCard,
            option: ["isNumeric", "isEqualValue:13"],
        },
        {
            key: "roles",
            value: req.body.roles,
            option: ["isAlphanumeric"],
        },
        {
            key: "addressNo",
            value: req.body.addressNo,
            option: ["isAlphanumeric"],
        },
        {
            key: "addressDetail",
            value: req.body.addressDetail,
            option: ["isAlphanumeric"],
        },
        {
            key: "district",
            value: req.body.district,
            option: ["isAlphanumeric"],
        },
        {
            key: "subDistrict",
            value: req.body.subDistrict,
            option: ["isAlphanumeric"],
        },
        {
            key: "province",
            value: req.body.province,
            option: ["isAlphanumeric"],
        },
        {
            key: "postCode",
            value: req.body.postCode,
            option: ["isAlphanumeric"],
        },
    ]
    const validateResults = validateAllData([], data);
    if (validateResults.status === false) {
        returnValidationError.errors = validateResults.errorsResults;
        return res.status(401).send(returnValidationError);
    }
    next();
};
const validateData = {
    validateSignUpData,
};

module.exports = validateData;