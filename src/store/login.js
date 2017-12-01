/*
 * @Author: lyc 
 * @Date: 2017-11-03 18:02:41 
 * @Last Modified by:   liyuancheng 
 * @Last Modified time: 2017-11-03 18:02:41 
 */
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export const USER_SIGNIN = 'USER_SIGNIN' //登录成功
export const USER_SIGNOUT = 'USER_SIGNOUT' //退出登录

const state = {
   user: sessionStorage.getItem('user')||''
}
const mutations = {
    [USER_SIGNIN](state,user){
        sessionStorage.setItem('user',user);
        state.user = user
    },
    [USER_SIGNOUT](state){
        sessionStorage.removeItem('user'),
        state.user = ''
    },
}
const actions = {
    [USER_SIGNIN]({commit},user){
        commit(USER_SIGNIN, user)
    },
    [USER_SIGNOUT]({commit}){
        commit(USER_SIGNOUT)
    }

}
const getters = {

}
const moduleLogin = {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
export default moduleLogin