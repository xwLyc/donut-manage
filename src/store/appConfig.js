/*
 * @Author: lyc 
 * @Date: 2018-06-01 15:39:58 
 * @Last Modified by: liyuancheng
 * @Last Modified time: 2018-06-04 17:34:25
 */
import Vue from 'vue'
import Vuex from 'vuex'
import appConfig from '../Api/appConfig'

Vue.use(Vuex)

const state = {
    gzhList: [],

    Load: false,  //loading,加载中为true
}
const mutations = {
    gzhList: (state, gzhList) => state.gzhList = gzhList,


}
const actions = {
    // 查询公众号列表
    queryGzhList({ commit }) {
        // commit('Load', true)
        return new Promise((resolve, reject) => {
            appConfig.queryGzhList()
                .then(res => {
                    commit('gzhList', res.data.data)
                    console.log(res)
                })
                .then(res => resolve(res))
                .catch(err => reject(err))
        })
    },
    // 创建或编辑公众号
    createGzh({ commit }, payload){
        return new Promise((resolve, reject) => {
            appConfig.createGzh(payload)
                .then(res => resolve(res))
                .catch(err => reject(err))
        })
    },
    // 初始化公众号
    init_Gzh({commit}, payload){
        return new Promise((resolve, reject) => {
            appConfig.initGzh(payload)
                .then(res => resolve(res))
                .catch(err => reject(err))
        })
    },
    // 切换公号
    select_Gzh({commit}, payload){
        return new Promise((resolve, reject) => {
            appConfig.selectGzh(payload)
                .then(res => resolve(res))
                .catch(err => reject(err))
        })
    },
    // 查询当前公众号
    curr_Gzh({ commit }, payload){
        return new Promise((resolve, reject) => {
            appConfig.currGzh(payload)
                .then(res => resolve(res))
                .catch(err => reject(err))

        })
    }
}
const getters = {

}

const moduleAppConfig = {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
export default moduleAppConfig