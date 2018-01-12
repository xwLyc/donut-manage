/*
 * @Author: lyc 
 * @Date: 2017-11-30 17:23:30 
 * @Last Modified by: liyuancheng
 * @Last Modified time: 2018-01-10 11:16:53
 */
import utils from '../utils'

export default {
    //新建以及更新课程请求
    createLesson: (obj)=>{
        return utils.httpPost(utils.API+'/spell/create_course', obj) 
    },
    //查询课程
    queryLesson: (obj)=>{
        return utils.httpPost(utils.API+'/spell/query_course_list', obj) 
    },
    //课程上线
    publishLesson: (obj)=>{
        return utils.httpPost(utils.API+'/spell/publish_course', obj) 
    },
    //课程下线
    unpublishLesson: (obj)=>{
        return utils.httpPost(utils.API+'/spell/un_publish_course', obj) 
    },
    //删除未上线的课程
    deleteLesson: (obj)=>{
        return utils.httpPost(utils.API+'/spell/delete_course', obj) 
    },
    //查询课程下 的课节
    queryLessonDetail: (obj)=>{
        return utils.httpPost(utils.API+'/spell/query_course_lesson', obj) 
    },
    //编辑课节
    updatedLessonDetail: (obj)=>{
        return utils.httpPost(utils.API+'/spell/update_lesson', obj) 
    },
    // 生成客户端地址
    createWebsite: (obj)=>{
        return utils.httpPost(utils.API+'/spell/wx/index/get_home_page', obj)
    },

}