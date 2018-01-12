/*
 * @Author: lyc 
 * @Date: 2017-12-18 14:33:46 
 * @Last Modified by: liyuancheng
 * @Last Modified time: 2018-01-11 16:14:35
 */

import utils from '../utils'

export default {
    //创建活动或者讲座
    createActivity: (obj)=>{
        return utils.httpPost(utils.API+'/spell/create_qrcode_segment', obj) 
    },
    //查询活动（码段）
    queryActivity: (obj)=>{
        return utils.httpPost(utils.API+'/spell/query_qrcode_segment', obj)
    },
    //查询单个 码段
    queryActivityDetail: (obj)=>{
        return utils.httpPost(utils.API+'/spell/query_one_qrcode_segment', obj) 
    },
    //编辑单个 码段
    editActivityDetail: (obj)=>{
        return utils.httpPost(utils.API+'/spell/edit_qrcode_segment', obj) 
    },
    // 解锁消息配置
    lockConfig: (obj)=>{
        return utils.httpPost(utils.API+'/spell/set_course_act', obj) 
    },
    // 查询消息配置
    queryMsgConfig: (obj)=>{
        return utils.httpPost(utils.API+'/spell/query_config_info', obj) 
    },
    // 创建编辑消息体 
    createMsgBody: (obj)=>{
        return utils.httpPost(utils.API+'/spell/create_msg_body', obj) 
    },
    // 查询消息体 信息
    queryMsgBody: (obj)=>{
        return utils.httpGet(utils.API+'/spell/query_msg_body', obj) 
    },

    // 创建定时器任务
    createTask: (obj)=>{
        return utils.httpPost(utils.API+'/spell/create_timer_task', obj) 
    },
    // 查询 查询定时任务
    queryTimerTask: (obj)=>{
        return utils.httpGet(utils.API+'/spell/query_timer_task', obj) 
    },
    // 删除学习当中定时任务
    deleteTimerTask: (obj)=>{
        return utils.httpPost(utils.API+'/spell/delete_timer_task', obj) 
    },

    // 查询 普通裂变学习 配置信息  
    queryStudyConfig: (obj)=>{
        return utils.httpGet(utils.API+'/spell/query_act_study_timer', obj)
    },
    // 查询 续期任务 配置信息  
    queryRenuwalConfig: (obj)=>{
        return utils.httpGet(utils.API+'/spell/query_continue_task', obj)
    },
    // 查询 基本解锁 配置信息  
    queryUnlockConfig: (obj)=>{
        return utils.httpGet(utils.API+'/spell/query_base_unlock_config_info', obj)
    },
    // 删除 续期任务的 提醒通知
    deleteRenuwalTask: (obj)=>{
        return utils.httpPost(utils.API+'/spell/delete_continue_task', obj)
    },
    // 活动上线下线
    onlineActivity: (obj)=>{
        return utils.httpPost(utils.API+'/spell/set_online_segment', obj)
    },
    // 删除活动
    deleteActivity: (obj)=>{
        return utils.httpPost(utils.API+'/spell/delete_qrcode_segment', obj)
    },

}