/*
 * @Author: lyc 
 * @Date: 2017-11-03 18:02:17 
 * @Last Modified by: liyuancheng
 * @Last Modified time: 2018-01-11 16:28:57
 */
import Vue from 'vue'
import Vuex from 'vuex'
import route from '../router'
import utils from '../utils'
import Activity from '../Api/activity'
import Lesson from '../Api/lesson'
// import Template from '../Api/template'


Vue.use(Vuex)


const state = {
    activityEdit: false,                          // true为正在编辑， false为创建
    activityList: [{
        name:'',
        activityCount:'',
        uptime:'',
        downtime:'',
        finished:'',
        status:'',
    }],                                           //活动列表
    activityLoad: false,                            //加载状态
    totalCount: 0,                                //活动总条数
    pageCount: 10,                                //每页条数
    activityCurId:'',                               //当前活动ID
    updatedStatus: false,                           //上线 下线更新状态
    activityType: '1',                              //活动类型 1裂变类 0 课程类

    

    


}
const mutations = {
    activityEdit: (state, activityEdit) => state.activityEdit = activityEdit,
    activityList: (state, activityList) => state.activityList = activityList,
    activityLoad: (state, activityLoad) => state.activityLoad = activityLoad,
    totalCount: (state, totalCount) => state.totalCount = totalCount,
    activityCurId: (state, activityCurId) => state.activityCurId = activityCurId,
    updatedStatus: (state, updatedStatus) => state.updatedStatus = updatedStatus,
    activityType: (state, activityType) => state.activityType = activityType,


    

}
const actions = {
    clearActivity(context){                                   //清空活动信息
        context.commit('activityCurId', '');
        
        context.commit('activityEdit', false);

    },

    
    queryLesson(context){                                   // 查询课程
        return Lesson.queryLesson()
    },


    createActivity(context, payload) {                        //新建以及更新活动请求
        let datas = {
            type: payload.type,
            actionName: payload.name,
            count: payload.part,
            poster_url: payload.picUrl,
            self_base_poster_url: payload.picUrlSelf,
            poster_content: payload.content
        }
        if(payload.lesson){
            datas.course_id = payload.lesson;
        }
        if(payload.site){
            datas.rect_xywh = payload.site;
        }

        return Activity.createActivity(datas)

    },
    queryActivity(context, payload) {                             //查询活动
        context.commit('activityLoad',true);
        let datas = {};
        if(payload.name){
            datas.actionName = payload.name;
        }
        if(payload.type){
            datas.type = payload.type=='课程类'? 0: 1;
        }
        if(payload.date){
            datas.date = payload.date;
        }
        if(payload.page){
            datas.page = payload.page;
        }
        if(payload.pageCount){
            datas.pageCount = payload.pageCount;
        }else{
            datas.pageCount = 10;
        }
        Activity.queryActivity(datas).then(res => {
            // console.log(res)
            if(res.data.code == 0){
                // console.log(res.data.data)
                context.commit('activityList',res.data.data);
                context.commit('activityLoad', false);
                context.commit('totalCount', res.data.totalCount);
            }else{
                alert(res.data.msg)
            }
        })
    },

    queryActivityDetail(context, activeCurId) {                       //查询单个活动 码段
        return Activity.queryActivityDetail({segment_id:activeCurId})
    },
    editActivityDetail(context, payload) {                       //编辑单个活动 码段
        return Activity.editActivityDetail(payload)
    },
    createMsgBody(context, payload) {                            //创建编辑消息体
        return Activity.createMsgBody(payload)
    },
    queryMsgBody(context, _id) {                                //查询消息配置信息
        return Activity.queryMsgBody({_id: _id})
            .then(res => {
                let data = res.data.data;
                let keyword = [];
                for(let key in data){
                    if(key.indexOf('keyword')>-1){
                        keyword.unshift(data[key])
                    }
                }
                data.keyword = keyword;
                return data;
            })
    },
    lockConfig(context, payload) {                            // 解锁消息配置
        return new Promise((resolve, reject) => {
            Activity.lockConfig(payload)
            .then(res => resolve(res))
            .catch(err => reject(err))
        })
    },
    queryMsgConfig(context, _id) {                            // 查询消息配置
        return Activity.queryMsgConfig({_id: _id})
    },
    queryStudyConfig(context, _id) {                            // 普通裂变学习 配置信息 
        return Activity.queryStudyConfig({_id: _id}) 
    },
    createTask(context, payload) {                            // 创建定时器任务
        return Activity.createTask(payload) 
    },
    queryTimerTask(context, _id) {                            // 查询定时器任务
        return Activity.queryTimerTask({_id: _id}) 
    },
    deleteTimerTask(context, payload) {                        // 删除定时器任务
        return Activity.deleteTimerTask(payload) 
    },
    queryRenuwalConfig(context, _id) {                         // 查询定续期任务
        return Activity.queryRenuwalConfig({_id: _id}) 
    },
    queryUnlockConfig(context, _id) {                          // 查询基本解锁信息
        return Activity.queryUnlockConfig({_id: _id}) 
    },
    deleteRenuwalTask(context, payload) {                       // 删除续期任务
        return Activity.deleteRenuwalTask(payload) 
    },
    onlineActivity(context, payload) {                         // 活动上线下线
        return Activity.onlineActivity(payload) 
    },
    deleteActivity(context, _id) {                         // 删除活动
        return Activity.deleteActivity({_id: _id}) 
    },

    

    

}
const getters = {

}
const moduleActivity = {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}
export default moduleActivity