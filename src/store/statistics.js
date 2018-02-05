
import Vue from 'vue'
import Vuex from 'vuex'
import Statistics from '../Api/statistics'
Vue.use(Vuex)
const state = {
    courseActInfo: {
        name: '',
        _id : '',
        lessonCount: '',
        status: ''
    },
    activityActInfo: {
        name: '',
        _id : '',
        status: ''
    },
    errInfo: '',
    
}
const mutations = {
    errInfo: (state, errInfo) => state.errInfo = errInfo,
    courseActInfo: (state, courseActInfo) => state.courseActInfo = courseActInfo,
    activityActInfo: (state, activityActInfo) => state.activityActInfo = activityActInfo,
}
const actions = {
    // 查询课程/活动信息
    queryCourseActInfo({commit}, payload){
        if(payload.name){
            return new Promise((resolve, reject) => {
                Statistics.queryCourseActInfo({
                    name: payload.name,
                    type: payload.type
                }).then(res => {
                    // console.log(res)
                    commit('errInfo', '');
                    if(res.data.code==0){
                        if(!payload.type){  // 0课程  1活动
                            state.courseActInfo = '';
                            commit('courseActInfo', res.data.data)
                        }else{
                            state.activityActInfo = '';
                            commit('activityActInfo', res.data.data)
                        }
                        
                    }else{
                        commit('errInfo', res.data.msg+"!")
                    }
                    return res.data.code;
                }).then(res => resolve(res))
            })
        }
    },
    // 课程统计
    courseStatistics(context, payload){
        return Statistics.courseStatistics(payload)
    },
    // 课节统计
    lessonStatistics(context, payload){
        return Statistics.lessonStatistics(payload)
    },
    // 课程学习天数统计
    courseStudyDays(context, payload){
        return Statistics.courseStudyDays(payload)
    },
    // 累计有效天数统计
    vipAllDays(context, payload){
        return Statistics.vipAllDays(payload)
    }
    

}
const getters = {

}
const moduleStatistics = {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
export default moduleStatistics