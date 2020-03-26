import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        menuVisible: false
    },
    mutations: {
        closeMenuVisible(state) {
            state.menuVisible = false
        },
        openMenuVisible(state) {
            state.menuVisible = true
        }
    },
    actions: {
    }
})

export default store