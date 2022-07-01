import ApiRequest from '@/services/ApiRequest';
const initialState = {
    companyData: [],
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
                    let companyData = company.data;

                    // commit('loginSuccess', userData);
                    return Promise.resolve(companyData);
                },
                error => {
                    commit('loginFailure');
                    return Promise.reject(error);
                }
            );
        },

        async retive({
            commit
        }) {
            return apiRequest.fetchCompanyData().then(
                company => {
                    // commit เป็นการบอกโปรแกรมว่าทำอะไรต่อ อยู่ ใน property mutations ด้านล่าง
                    let companyData = company.data.results;

                    commit('fetchCompanyDataSuccess', companyData);
                    return Promise.resolve(companyData);
                },
                error => {
                    commit('fetchCompanyDataFailed');
                    return Promise.reject(error);
                }
            );
        },

    },
    mutations: {
        fetchCompanyDataSuccess(state, companyData) {
            state.companyData = companyData;
        },
        fetchCompanyDataFailed(state) {
            state.companyData = [];
        },
    }
};