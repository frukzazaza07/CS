var moment = require('moment');

export default class Lib {
    createDate(format = "yyyy-mm-dd hh:mm:ss", addDate = 0) {
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

        switch (format) {
            case "yyyy-mm-dd":
                returnData = year + "-" + month + "-" + date;
                break;
            case "yyyy-mm-dd hh:mm:ss":
                returnData = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
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

    dateDiff(date1, date2) {
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
            seconds,
        };
    }

    isString(string) {
        if (string == "") return false;
        let returnData = false;
        if (typeof string === 'string') {
            returnData = true;
        }
        return returnData;
    }

    isNumeric(number) {
        if (number === "") return false;

        let returnData = false;
        let numeric = /^([0-9]+)$/;
        if (number.match(numeric) !== null) {
            returnData = true;
        }

        return returnData;
    }

    isDecimal(number) {
        if (number === "") return false;
        const decimal = number.split(".");
        if (decimal.length !== 2) return false;

        let returnData = false;
        let numeric = /^([0-9]+)$/;
        if (decimal[0].match(numeric) !== null && decimal[1] !== "" && decimal[1].match(numeric) !== null && decimal[0] !== "") {
            returnData = true;
        }
        return returnData;
    }

    isAlphanumeric(alphanumericString) {
        if (alphanumericString == "") return false;
        // https://stackoverflow.com/questions/388996/regex-for-javascript-to-allow-only-alphanumeric/389022#389022
        //     if you need to this regexp supports universal character you can find list of unicode characters here.
        // for example: /^([a-zA-Z0-9\u0600-\u06FF\u0660-\u0669\u06F0-\u06F9 _.-]+)$/
        let returnData = false;
        let alphanumeric = /^([a-zA-Z0-9\u0E00-\u0E7Fa-zA-Z]+)$/;
        if (alphanumericString.match(alphanumeric) !== null) {
            returnData = true;
        }

        return returnData;
    }

    isMinValue(value, min = 0) {
        if (value == "") return false;
        let returnData = false;
        if (value.length > min) {
            returnData = true;
        }
        return returnData;
    }
    isMaxValue(value, max = 0) {
        if (value == "") return false;
        let returnData = false;
        if (value.length < max) {
            returnData = true;
        }
        return returnData;
    }

    isEqualValue(value, equal) {
        if (value == "") return false;
        let returnData = false;
        if (value.length === equal) {
            returnData = true;
        }
        return returnData;
    }

    checkDateFormat(format, value) {
        if (value == "") return false;
        // ture isValid false isInvalid
        return moment(value, format, true).isValid();
    }

    isEmpty(strValue) {
        let returnData = false;
        if (strValue && strValue !== "") {
            returnData = true;
        }
        return returnData;
    }

    validateFile(file, maxSize = 1000, acceptType = ["png", "jpg", "jpeg"]) {
        if (!file) return {
            status: false,
            message: "Please select file."
        };
        const files = file[0];

        let fileType = files.name.split(".");
        fileType = fileType[fileType.length - 1];
        const checkType = acceptType.indexOf(fileType);
        if (checkType < 0) return {
            status: false,
            message: "File accept type (" + acceptType.join(",") + ")",
        };

        if (files.size > maxSize) return {
            status: false,
            message: "Max size is " + (maxSize / 1000) + "mb.",
        };

        return {
            status: true,
            message: ""
        };
    }

    convertFileTobase64(file) {
        return new Promise((resolve, reject) => {
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                console.log(reader.result);
                resolve(reader.result);
            };
            reader.onerror = function (error) {
                console.log("Error: ", error);
                reject(error);
            };
        })

    }

    validateAllData(data = {}) {
        // ตัวอย่าง data
        // data = [{
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

        data.forEach(function callback(value) {
            let check = "";
            let message = "";
            // return อีกแบบ
            // returnData[i] = {}
            // returnData[i][value.key] = [];
            // returnData[value.key] = [];
            // validate by option

            value.option.forEach(function callback(subValue) {
                check = "";
                const lib = new Lib();
                let optionSet = subValue.split(":");
                let format, max, min, equal, maxSize, acceptType, fileStatus;
                switch (optionSet[0]) {
                    case "checkDateFormat":
                        format = subValue.split(":");
                        check = lib.checkDateFormat(format, value.value);
                        message = `${value.key} Date isValid: ` + format + `: '${value.value}'`;
                        break;
                    case "isMaxValue":
                        max = optionSet[1];
                        check = lib.isMaxValue(value.value, max);
                        message = `Length of ${value.key} is max: ` + max + `: '${value.value}'`;
                        break;
                    case "isMinValue":
                        min = optionSet[1];
                        check = lib.isMinValue(value.value, min);
                        message = `Length of ${value.key} is min: ` + min + `: '${value.value}'`;
                        break;
                    case "isEqualValue":
                        equal = optionSet[1];
                        check = lib.isEqualValue(value.value, equal);
                        message = `Length of ${value.key} is equal: ` + equal + `: '${value.value}'`;
                        break;
                    case "isAlphanumeric":
                        check = lib.isAlphanumeric(value.value);
                        message = `${value.key} is alphanumeric only : '${value.value}'`;
                        break;
                    case "isNumeric":
                        check = lib.isNumeric(value.value);
                        message = `${value.key} is numeric only : '${value.value}'`;
                        break;
                    case "isDecimal":
                        check = lib.isDecimal(value.value);
                        message = `${value.key} is decimal only : '${value.value}'`;
                        break;
                    case "isString":
                        check = lib.isString(value.value);
                        message = `${value.key} is string only : '${value.value}'`;
                        break;
                    case "isEmpty":
                        check = lib.isEmpty(value.value);
                        message = `${value.key} is not empty : '${value.value}'`;
                        break;
                    case "validateFile":
                        maxSize = optionSet[1];
                        acceptType = optionSet[2].split(",");
                        fileStatus = lib.validateFile(value.value, maxSize, acceptType);
                        check = fileStatus.status;
                        message = `${value.key} ${fileStatus.message}`;
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
}