import Vue from 'vue'
import Vuex from 'vuex'
import route from '../router'
import utils from '../utils'

Vue.use(Vuex)

const state = {
  collectionEdit: false,  // true为正在编辑， false为创建
}

const mutations = {

}

const actions = {
  
}

const getters = {

}
const moduleCollection = {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
export default moduleCollection