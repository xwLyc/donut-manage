/*
 * @Author: lyc 
 * @Date: 2017-11-03 18:02:41 
 * @Last Modified by: liyuancheng
 * @Last Modified time: 2017-12-04 17:38:14
 */
import Vue from 'vue'
import Vuex from 'vuex'
import Route from '../router'
import Login from '../Api/login'

Vue.use(Vuex)

export const USER_SIGNIN = 'USER_SIGNIN' //登录成功
export const USER_SIGNOUT = 'USER_SIGNOUT' //退出登录

const state = {
   user: sessionStorage.getItem('user')||'',
   loginFail: true,
   loginTips: ''

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
    loginFail: (state, loginFail) => state.loginFail = loginFail,
    loginTips: (state, loginTips) => state.loginTips = loginTips,

}
const actions = {
    [USER_SIGNIN](context, userInfo){
        Login.login(userInfo).then(res => {
            if(res.data.code == 0){
                context.commit(USER_SIGNIN, userInfo.username);
                Route.push({path:'/lesson'});
            }else{
                context.commit('loginFail', !context.state.loginFail);
                context.commit('loginTips', res.data.msg);
            }
        })
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