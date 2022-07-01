import { createStore } from "vuex";
import { auth } from "./auth.module";
import { company } from "./company.module";
import { check404 } from "./check404.module";
const store = createStore({
  modules: {
    auth,
    check404,
    company,
  },
});
export default store;
