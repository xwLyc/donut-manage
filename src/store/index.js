/*
 * @Author: lyc 
 * @Date: 2017-11-03 18:02:07 
 * @Last Modified by: liyuancheng
 * @Last Modified time: 2018-01-30 17:16:26
 */
import Vue from 'vue'
import Vuex from 'vuex'
import moduleLogin from './login'
import moduleSource from './source'
import moduleLesson from './lesson'
import moduleActivity from './activity'
import moduleTemplate from './template'
import moduleStatistics from './statistics'
Vue.use(Vuex)


export default new Vuex.Store({
    modules:{
        moduleLogin: moduleLogin,
        moduleSource: moduleSource,
        moduleLesson: moduleLesson,
        moduleTemplate: moduleTemplate,
        moduleActivity: moduleActivity,
        moduleStatistics: moduleStatistics
    }
})