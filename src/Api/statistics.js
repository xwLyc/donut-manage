/*
 * @Author: lyc 
 * @Date: 2018-01-30 16:10:11 
 * @Last Modified by: liyuancheng
 * @Last Modified time: 2018-05-21 15:09:55
 */
import utils from '../utils'

export default {
    //查询数据信息
    queryCourseActInfo: (obj)=>{
        return utils.httpGet(utils.API+'/spell/query_course_act_info', obj)
    },
    //活动统计（累计）
    actStatistics: (obj)=>{
        return utils.httpGet(utils.API+'/spell/course_act_statistic', obj)
    },
    //课节统计
    lessonStatistics: (obj)=>{
        return utils.httpGet(utils.API+'/spell/lesson_statistic', obj)
    },
    //课程统计
    courseStatistics: (obj)=>{
        return utils.httpGet(utils.API+'/spell/course_statistic', obj)
    },
    //课程学习天数统计
    courseStudyDays: (obj)=>{
        return utils.httpGet(utils.API+'/spell/course_study_day_statistic', obj)
    },
    //累计有效天数统计
    vipAllDays: (obj)=>{
        return utils.httpGet(utils.API+'/spell/query_vip_all_day_statistic', obj)
    },



}