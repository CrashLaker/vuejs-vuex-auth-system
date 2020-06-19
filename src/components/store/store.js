import Vue from 'vue';
import Vuex from 'vuex';
import axios from '../axios-auth.js';
import router from '@/router/index.js'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        userData: null,
        token: null,
        exp: null
    },
    mutations: {
        authUser (state, data) {
            console.log(data)
            state.userData = data 
            state.token = data.token
            state.exp = new Date(data.exp)
            localStorage.setItem('data', JSON.stringify(data))
            localStorage.setItem('token', data.token)
        },
        logoutUser(state){
            state.userData = null
            state.token = null
            state.exp = null
            localStorage.clear()
        }
    },
    actions: {
        tryLogin ({commit, dispatch}) {
            let data = localStorage.getItem('data')
            if (!data) return
            data = JSON.parse(data)
            if (new Date() < new Date(data.exp))
                dispatch('doLogin', data)       
        },
        login ({commit, dispatch}, authData) {
            // authData: username, password
            //{
            //    "exp": "2020-06-19T15:50:29.983747", 
            //    "message": "auth ok", 
            //    "token": "eyJ0eXAiOJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiZXhwIjoxNTkyNTgxODI5fQ.mAeo7KaiFNGPECLcQS0LjxkrPyKyfjRjrEOLGL83r0g"
            //}

            axios.post('/login', authData).then((rs) => {
                dispatch('doLogin', rs.data)
                return true
            })
            return false
        },
        doLogin ({commit, dispatch}, data){
            commit('authUser', data)
            let expMillis = new Date(data.exp) - new Date()
            dispatch('setLogoutTimer', expMillis)
        },
        logout({commit}){
            router.push('/')
            commit('logoutUser')
        },
        setLogoutTimer({commit, dispatch}, expMillis) {
            setTimeout(() => {
                dispatch('logout') 
            }, expMillis)
        }
    },
    getters: {
        isAuth (state) {
            return (state.token && new Date() < state.exp)
        }
    }
})


