import axios from "axios";
import authHeader from './authen/authHeader';
export default class ApiRequest {
    apiHeader = "";
    apiHost = "http://localhost:8085/api";
    // apiHost = process.env.SERVER_HOST;

    constructor() {
        this.apiHeader = {
            headers: authHeader()
        }
    }

    postSignup(register) {
        return new Promise((resolve, reject) => {
            axios.post(`${this.apiHost}/auth/signup`, register)
                .then(function (response) {
                    resolve(response);
                })
                .catch(function (error) {
                    console.log(error);
                    reject(error);
                });
        })

    }
    postSignin(user) {
        return new Promise((resolve, reject) => {
            axios.post(`${this.apiHost}/auth/signin`, user)
                .then(function (response) {
                    resolve(response);
                })
                .catch(function (error) {
                    console.log(error);
                    reject(error);
                });
        })

    }
    postGoogleSignin(userGoogle) {
        return new Promise((resolve, reject) => {
            axios.post(`${this.apiHost}/auth/googleSignin`, userGoogle)
                .then(function (response) {
                    resolve(response);
                })
                .catch(function (error) {
                    console.log(error);
                    reject(error);
                });
        })

    }

    postLogout() {
        // something to server
    }

    fetchContent() {
        console.log(this.apiHeader)
        return new Promise((resolve, reject) => {
            axios.get(`${this.apiHost}/test/user`, this.apiHeader)
                .then(function (response) {
                    resolve(response);
                })
                .catch(function (error) {
                    console.log(error);
                    reject(error);
                });
        })

    }

    postAddCompany(companyData) {
        return new Promise((resolve, reject) => {
            axios.post(`${this.apiHost}/company/add`, companyData, this.apiHeader)
                .then(function (response) {
                    resolve(response);
                })
                .catch(function (error) {
                    console.log(error);
                    reject(error);
                });
        })
    }
    fetchCompanyData() {
        return new Promise((resolve, reject) => {
            axios.get(`${this.apiHost}/company/retive`, this.apiHeader)
                .then(function (response) {
                    resolve(response);
                })
                .catch(function (error) {
                    console.log(error);
                    reject(error);
                });
        })
    }
}