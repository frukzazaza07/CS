import ApiRequest from '@/services/ApiRequest';
const initialState = {
    status: true,
};
const apiRequest = new ApiRequest();
// vuex วิธีใช้ 
//  this.$store.dispatch("auth/login", user)
// หน้า Login เรียกใช้ store auth/login << ชื่อตัวแปล auth เข้าถึง function ชื่อ login , ตามด้วย parameter ของ function login
export const company = {
    namespaced: true,
    state: initialState,
    actions: {
        async add({
            commit
        }, company) {
            return apiRequest.postAddCompany(company).then(
                company => {
                    // commit เป็นการบอกโปรแกรมว่าทำอะไรต่อ อยู่ ใน property mutations ด้านล่าง
                    let companyData = company.data.results;

                    // commit('loginSuccess', userData);
                    return Promise.resolve(companyData.data);
                },
                error => {
                    commit('loginFailure');
                    return Promise.reject(error);
                }
            );
        },

    },
    mutations: {
        loginSuccess(state, user) {
            state.status.loggedIn = true;
            state.user = user;
        },
    }
};