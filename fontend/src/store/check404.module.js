//Vuex
import {
    createStore
} from 'vuex'

const check404 = createStore({
    state() {
        return {
            isPage404: false
        }
    },
    mutations: {
        isPage404(state, pageStatus) {
            state.isPage404 = pageStatus;
        }
    }
})

export {
    check404
};