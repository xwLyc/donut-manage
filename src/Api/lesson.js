/*
 * @Author: lyc 
 * @Date: 2017-11-30 17:23:30 
 * @Last Modified by: liyuancheng
 * @Last Modified time: 2017-12-12 18:54:26
 */
import utils from '../utils'

export default {
    //新建以及更新课程请求
    createLesson: (obj)=>{
        return new Promise((resolve, reject) => {
            utils.httpPost(utils.API+'/spell/create_course', obj)
            .then(res=> resolve(res))
            .catch(err=> reject(err))
        })
    },
    //查询课程
    queryLesson: (obj)=>{
        return new Promise((resolve, reject) => {
            utils.httpPost(utils.API+'/spell/query_course_list', obj)
            .then(res=> resolve(res))
            .catch(err=> reject(err))
        })
    },
    //课程上线
    publishLesson: (obj)=>{
        return new Promise((resolve, reject) => {
            utils.httpPost(utils.API+'/spell/publish_course', obj)
            .then(res=> resolve(res))
            .catch(err=> reject(err))
        })
    },
    //课程下线
    unpublishLesson: (obj)=>{
        return new Promise((resolve, reject) => {
            utils.httpPost(utils.API+'/spell/un_publish_course', obj)
            .then(res=> resolve(res))
            .catch(err=> reject(err))
        })
    },
    //删除未上线的课程
    deleteLesson: (obj)=>{
        return new Promise((resolve, reject) => {
            utils.httpPost(utils.API+'/spell/delete_course', obj)
            .then(res=> resolve(res))
            .catch(err=> reject(err))
        })
    },
    //查询课程下 的课节
    queryLessonDetail: (obj)=>{
        return new Promise((resolve, reject) => {
            utils.httpPost(utils.API+'/spell/query_course_lesson', obj)
            .then(res=> resolve(res))
            .catch(err=> reject(err))
        })
    },
    //编辑课节
    updatedLessonDetail: (obj)=>{
        return new Promise((resolve, reject) => {
            utils.httpPost(utils.API+'/spell/update_lesson', obj)
            .then(res=> resolve(res))
            .catch(err=> reject(err))
        })
    },
    // 生成客户端地址
    createWebsite: (obj)=>{
        return new Promise((resolve, reject) => {
            utils.httpPost(utils.API+'/spell/wx/index/get_home_page', obj)
            .then(res=> resolve(res))
            .catch(err=> reject(err))
        })
    },

}