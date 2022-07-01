import ApiRequest from '@/services/ApiRequest';
import {
    checkRememberMe
} from '@/services/authen/authCookie';
const user = checkRememberMe();
const initialState = user ? {
    status: {
        loggedIn: true
    },
    user
} : {
    status: {
        loggedIn: false
    },
    user: null
};
const apiRequest = new ApiRequest();
// vuex วิธีใช้ 
//  this.$store.dispatch("auth/login", user)
// หน้า Login เรียกใช้ store auth/login << ชื่อตัวแปล auth เข้าถึง function ชื่อ login , ตามด้วย parameter ของ function login
export const auth = {
    namespaced: true,
    state: initialState,
    actions: {
        async login({
            commit
        }, user) {
            // try {
            //     const loginData = await apiRequest.postSignin(user);
            //     // commit เป็นการบอกโปรแกรมว่าทำอะไรต่อ อยู่ ใน property mutations ด้านล่าง
            //     const userData = loginData.data;
            //     localStorage.setItem("user", JSON.stringify(userData.results));
            //     commit('loginSuccess', userData.results);
            //     state.status.loggedIn = true;
            //     return userData;
            // } catch (e) {
            //     return e;
            // }
            return apiRequest.postSignin(user).then(
                user => {
                    // commit เป็นการบอกโปรแกรมว่าทำอะไรต่อ อยู่ ใน property mutations ด้านล่าง
                    let userData = user.data.results;

                    sessionStorage.setItem("CSUserSession", JSON.stringify(userData));
                    if (userData.isRememberMe === true) {
                        localStorage.setItem("CSUserLocal", JSON.stringify(userData));
                    }

                    commit('loginSuccess', userData);
                    return Promise.resolve(user.data);
                },
                error => {
                    commit('loginFailure');
                    return Promise.reject(error);
                }
            );
        },
        async googleLogin({
            commit
        }, userGoogle) {
            return apiRequest.postGoogleSignin(userGoogle).then(
                userGoogle => {
                    // commit เป็นการบอกโปรแกรมว่าทำอะไรต่อ อยู่ ใน property mutations ด้านล่าง
                    let userData = userGoogle.data.results;

                    sessionStorage.setItem("CSUserSession", JSON.stringify(userData));
                    if (userData.isRememberMe === true) {
                        localStorage.setItem("CSUserLocal", JSON.stringify(userData));
                    }

                    commit('loginSuccess', userData);
                    return Promise.resolve(user.data);
                },
                error => {
                    commit('loginFailure');
                    return Promise.reject(error);
                }
            );
        },
        logout({
            commit
        }) {
            apiRequest.postLogout();
            localStorage.removeItem('CSUserLocal');
            sessionStorage.removeItem('CSUserSession');
            commit('logout');
        },
        register({
            commit
        }, user) {
            return apiRequest.postSignup(user).then(
                response => {
                    commit('registerSuccess');
                    return Promise.resolve(response.data);
                },
                error => {
                    commit('registerFailure');
                    return Promise.reject(error);
                }
            );
        }
    },
    mutations: {
        loginSuccess(state, user) {
            state.status.loggedIn = true;
            state.user = user;
        },
        loginFailure(state) {
            state.status.loggedIn = false;
            state.user = null;
        },
        logout(state) {
            state.status.loggedIn = false;
            state.user = null;
        },
        registerSuccess(state) {
            state.status.loggedIn = false;
        },
        registerFailure(state) {
            state.status.loggedIn = false;
        }
    }
};