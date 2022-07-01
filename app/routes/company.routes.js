
const {
    validateCompanyAdd,
    authJwt,
} = require("../middlewares");
const controller = require("../controllers/company.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });


    app.post("/api/company/add", [
        validateCompanyAdd.validateAddData,
        authJwt.verifyToken,
    ], controller.add);
    app.get("/api/company/retive", [
        authJwt.verifyToken,
    ], controller.retive);
};