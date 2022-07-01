import Lib from "@/libaries/Lib";
const lib = new Lib();
const authCookie = JSON.parse(localStorage.getItem('CSUserLocal'));
const authCookieSesion = JSON.parse(sessionStorage.getItem('CSUserSession'));
const checkRememberMe = () => {
    const currentData = lib.createDate("yyyy-mm-dd hh:mm:ss");
    if (authCookieSesion !== null) return authCookieSesion;

    if (!authCookie) return null;

    if (!authCookie.isRememberMe) return null;

    const dateDiff = lib.dateDiff(authCookie.rememberMeExpiresIn, currentData);
    let isRememberMe = authCookie;
    if (dateDiff.years <= 0 && dateDiff.months <= 0 && dateDiff.days <= 0 && dateDiff.hours <= 0 && dateDiff.minutes <= 0 && dateDiff.seconds <= 0) {
        isRememberMe = null;
        localStorage.removeItem('CSUser');
    }
    return isRememberMe;

}
export {
    checkRememberMe
};