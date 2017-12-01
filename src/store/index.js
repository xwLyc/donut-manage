/*
 * @Author: lyc 
 * @Date: 2017-11-03 18:02:07 
 * @Last Modified by:   liyuancheng 
 * @Last Modified time: 2017-11-03 18:02:07 
 */
import Vue from 'vue'
import Vuex from 'vuex'
import moduleLogin from './login'
import moduleSource from './source'
import moduleLesson from './lesson'
Vue.use(Vuex)


export default new Vuex.Store({
    modules:{
        moduleLogin: moduleLogin,
        moduleSource: moduleSource,
        moduleLesson: moduleLesson,
    }
})