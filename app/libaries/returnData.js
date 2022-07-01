const returnSuccess = {
    status: true,
    isError: false,
    newToken: "",
    message: "Successfully.",
    results: [],
    errors: [],
};
const returnFailed = {
    status: false,
    isError: true,
    newToken: "",
    message: "Something went wrong.",
    results: [],
    errors: [],
};
const returnValidationError = {
    status: false,
    isError: true,
    newToken: "",
    message: "Validation failed.",
    results: [],
    errors: [],
};
module.exports = {
    returnSuccess: returnSuccess,
    returnFailed: returnFailed,
    returnValidationError: returnValidationError,
};