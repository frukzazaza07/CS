const moment = require('moment');
const crypto = require('crypto');
const fs = require('fs');
const createDate = (format = "yyyy-mm-dd hh:mm:ss", addDate = 0) => {
    let dateOb = new Date();
    let returnData = "";
    dateOb.setDate(dateOb.getDate() + addDate);
    // current date
    // adjust 0 before single digit date
    let date = ("0" + dateOb.getDate()).slice(-2);

    // current month
    let month = ("0" + (dateOb.getMonth() + 1)).slice(-2);

    // current year
    let year = dateOb.getFullYear();

    // current hours
    let hours = dateOb.getHours();

    // current minutes
    let minutes = dateOb.getMinutes();

    // current seconds
    let seconds = dateOb.getSeconds();

    // current milliseconds 
    let milliseconds = dateOb.getMilliseconds();

    switch (format) {
        case "yyyy-mm-dd":
            returnData = year + "-" + month + "-" + date;
            break;
        case "yyyy-mm-dd hh:mm:ss":
            returnData = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
            break;
        case "yyyy-mm-dd hh:mm:ss.ms":
            returnData = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds + "." + milliseconds;
            break;
        case "dd-mm-yyyy":
            returnData = date + "-" + month + "-" + year;
            break;
        case "dd-mm-yyyy hh:mm:ss":
            returnData = date + "-" + month + "-" + year + " " + hours + ":" + minutes + ":" + seconds;
            break;
        case "yyyy/mm/dd":
            returnData = year + "/" + month + "/" + date;
            break;
        case "yyyy/mm/dd hh:mm:ss":
            returnData = year + "/" + month + "/" + date + " " + hours + ":" + minutes + ":" + seconds;
            break;
        case "dd/mm/yyyy":
            returnData = date + "/" + month + "/" + year;
            break;
        case "dd/mm/yyyy hh:mm:ss":
            returnData = date + "/" + month + "/" + year + " " + hours + ":" + minutes + ":" + seconds;
            break;
    }

    return returnData;
}

const dateDiff = (date1, date2) => {
    const startDate = moment(date1, "YYYY-MM-DD HH:mm:ss");
    const endDate = moment(date2, "YYYY-MM-DD HH:mm:ss");
    const years = startDate.diff(endDate, 'year');
    endDate.add(years, 'years');

    const months = startDate.diff(endDate, 'months');
    endDate.add(months, 'months');

    const days = startDate.diff(endDate, 'days');
    endDate.add(days, 'days');

    const hours = startDate.diff(endDate, 'hours');
    endDate.add(hours, 'hours');

    const minutes = startDate.diff(endDate, 'minutes');
    endDate.add(minutes, 'minutes');

    const seconds = startDate.diff(endDate, 'seconds');

    return {
        years,
        months,
        days,
        hours,
        minutes,
        seconds
    };
}

const isString = (string) => {
    if (string === "" || string === undefined) return true;
    let returnData = false;
    if (typeof string === 'string') {
        returnData = true;
    }
    return returnData;
}
const isNumeric = (number) => {
    if (number === "" || number === undefined) return true;
    let returnData = false;
    // Math.floor(number) === number;
    if (Math.floor(number) != NaN) {
        returnData = true;
    }
    return returnData;
}

const isAlphanumeric = (alphanumericString) => {
    if (alphanumericString === "" || alphanumericString === undefined) return true;
    // https://stackoverflow.com/questions/388996/regex-for-javascript-to-allow-only-alphanumeric/389022#389022
    //     if you need to this regexp supports universal character you can find list of unicode characters here.
    // for example: /^([a-zA-Z0-9\u0600-\u06FF\u0660-\u0669\u06F0-\u06F9 _.-]+)$/
    let returnData = false;
    const alphanumeric = /^([a-zA-Z0-9\u0E00-\u0E7Fa-zA-Z]+)$/;
    if (alphanumericString.match(alphanumeric) !== null) {
        returnData = true;
    }

    return returnData;
}

const isMinValue = (value, min = 0) => {
    if (value === "" || value === undefined) return true;
    let returnData = false;
    if (value.length > min) {
        returnData = true;
    }
    return returnData;
}
const isMaxValue = (value, max = 0) => {
    if (value === "" || value === undefined) return true;
    let returnData = false;
    if (value.length < max) {
        returnData = true;
    }
    return returnData;
}

const isEqualValue = (value, equal) => {
    if (value === "" || value === undefined) return true;
    let returnData = false;
    if (value.length === equal) {
        returnData = true;
    }
    return returnData;
}

const checkDateFormat = (format, value) => {
    if (value === "" || value === undefined) return true;
    // ture isValid false isInvalid
    return moment(value, format, true).isValid();
}

const isEmpty = (strValue) => {
    let returnData = false;
    if (strValue && strValue !== "") {
        returnData = true;
    }
    return returnData;
}

const isAcceptFileSize = (imgBase64, maxSize = 0) => { // รับ format นี้ data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABg
    const img = imgBase64;
    const buffer = Buffer.from(img.substring(img.indexOf(',') + 1));
    const fileSizeMB = buffer.length / 1e+6;
    if (fileSizeMB > maxSize) {
        return false;
    }
    return true;
}
const isAcceptFileType = (type, acceptType = ["png", "jpg", "jpeg"]) => {
    if (!type) return {
        status: false,
        message: "Please select file."
    };

    let fileType = type;
    const checkType = acceptType.indexOf(fileType);
    if (checkType < 0) return {
        status: false,
        message: "File accept type (" + acceptType.join(",") + ")",
    };
    return {
        status: true,
        message: ""
    };
}

const decodeBase64Image = (dataString) => {
    const matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
        response = {};

    if (matches.length !== 3) {
        return new Error('Invalid input string');
    }
    const imageType = matches[1].split("/");
    response.type = matches[1];
    response.imageType = imageType[1];
    response.data = new Buffer.from(matches[2], 'base64');
    response.base64 = matches.join()
    return response;
}


const uploadImage = async (imgBase64, maxSizeMB = 5) => {
    let returnData = {
        status: true,
        message: "Upload file successfully",
        validation: [],
        pathImage: ""
    };
    if (imgBase64 == "" || imgBase64 == undefined) {
        returnData.validation = [`The file is not empty.`];
        returnData.status = false;
        returnData.message = "Validate fail.";
        return returnData;
    }
    const imageData = imgBase64;
    const imageFile = decodeBase64Image(imageData)
    const acceptFileType = isAcceptFileType(imageFile.imageType);
    
    if (!acceptFileType.status) {
        returnData.validation = [`File type is accept for (jpeg, png, jpg)`];
        returnData.status = false;
        returnData.message = "Validate fail.";
        return returnData;
    }

    const imageFileBase64 = imageFile.base64;
    const imageFileDataBase64 = imageFile.data;
    const currentDate = createDate("yyyy-mm-dd");
    const currentDateFullFormat = createDate("yyyy-mm-dd hh:mm:ss.ms");
    const pathImageHash = Buffer.from(currentDate).toString('base64');
    const pathImageSuccess = `./app/public/uploads/${currentDate}-${pathImageHash}`;
    const imageName = currentDateFullFormat;
    const imageNameBase64 = crypto.createHash('md5').update(Buffer.from(imageName).toString('base64')).digest('hex') + "." + imageFile.imageType;
    // check path ก่อนสร้าง
    if (!fs.existsSync(pathImageSuccess)) {
        // สร้าง path
        fs.mkdirSync(pathImageSuccess, {
            recursive: true
        });
    }
    if (!isAcceptFileSize(imageFileBase64, maxSizeMB)) {
        returnData.validation = [`The file size must not exceed ${maxSizeMB} MB.`];
        returnData.status = false;
        returnData.message = "Validate fail.";
        return returnData;
    }
    return new Promise(function (resolve, reject) {
        fs.writeFile(`${pathImageSuccess}/${imageNameBase64}`, imageFileDataBase64, function (err) {
            if (err) {
                returnData.status = false;
                returnData.message = "Something went wrong in fs.writeFile!";
                returnData.validation = ["Something went wrong in fs.writeFile!"];
                resolve(returnData);
            } else {
                const pathImage = `http://localhost:8085/static/uploads/${currentDate}-${pathImageHash}`;
                returnData.pathImage = `${pathImage}/${imageNameBase64}`;
                resolve(returnData)
            };
        });
    });
}

const validateAllData = (ignoreField = [], data = {}) => {
    // ตัวอย่าง data
    // const data = [{
    //         key: "username",
    //         value: req.body.username,
    //         option: ["isEmpty", "isMinValue:8", "isMaxValue:20", "isAlphanumeric"],
    //     },
    //     {
    //         key: "password",
    //         value: req.body.password,
    //         option: ["isEmpty", "isMinValue:8", "isMaxValue:20"],
    //     },
    // ]
    let returnData = {};
    //  return อีกแบบ
    // let returnData = [];
    let status = true;
    //  return อีกแบบ
    // let i = 0;

    data.forEach(function callback(value, index) {
        let check = "";
        let message = "";
        // return อีกแบบ
        // returnData[i] = {}
        // returnData[i][value.key] = [];

        // validate by option

        value.option.forEach(function callback(subValue, subIndex) {
            check = "";
            let optionSet = subValue.split(":");
            switch (optionSet[0]) {
                case "checkDateFormat":
                    const format = subValue.split(":");
                    check = checkDateFormat(format, value.value);
                    message = "Date isValid: " + format;
                    break;
                case "isMaxValue":
                    const max = subValue.split(":");
                    check = isMaxValue(value.value, max[1]);
                    message = "Length of value is max: " + max[1];
                    break;
                case "isMinValue":
                    const min = subValue.split(":");
                    check = isMinValue(value.value, min[1]);
                    message = "Length of value is min: " + min[1];
                    break;
                case "isEqualValue":
                    const equal = subValue.split(":");
                    check = isEqualValue(value.value, equal[1]);
                    message = "Length of value is equal: " + equal[1];
                    break;
                case "isAlphanumeric":
                    check = isAlphanumeric(value.value);
                    message = "Value is alphanumeric only";
                    break;
                case "isNumeric":
                    check = isNumeric(value.value);
                    message = "Value is numeric only";
                    break;
                case "isString":
                    check = isString(value.value);
                    message = "Value is string only";
                    break;
                case "isEmpty":
                    check = isEmpty(value.value);
                    message = "Value is not empty";
                    break;
                case "isAcceptFileType":
                    let typeFile = subValue.split(":");
                    let typeText = typeFile[1];
                    typeFile = typeText.split(",");
                    check = isAcceptFileType(value.value, typeFile);
                    message = "File type is accept for (" + typeText + ")";
                    break;
                case "isAcceptFileSize":
                    const sizeFile = subValue.split(":");
                    check = isAcceptFileSize(value.value, sizeFile[1]);
                    message = "File size is accept less than " + sizeFile + "MB.";
                    break;
            }
            if (check === false) {
                returnData[value.key] = [];
                status = check
                returnData[value.key].push(message);
            }
            //  return อีกแบบ
            // returnData[i][value.key].push({
            //     status: check,
            //     value: value.value,
            //     validate: subValue,
            // });

        })
        // console.log(`${value.key}: ${value.value}`);
        //  return อีกแบบ
        // i++;
    });


    return {
        status: status,
        errorsResults: status === false ? returnData : []
    };
}

module.exports = {
    createDate,
    dateDiff,
    checkDateFormat,
    isMaxValue,
    isMinValue,
    isEqualValue,
    isAlphanumeric,
    isNumeric,
    isString,
    isEmpty,
    isAcceptFileSize,
    decodeBase64Image,
    uploadImage,
    validateAllData
}