/*
 * @Author: lyc 
 * @Date: 2017-12-21 14:37:24 
 * @Last Modified by: liyuancheng
 * @Last Modified time: 2018-01-10 11:17:54
 */

import utils from '../utils'

export default {
    //新建以及更新消息模板
    createTemplate: (obj)=>{
        return utils.httpPost(utils.API+'/spell/create_msg_template', obj) 
    },
    //查询模板列表
    queryTemplate: (obj)=>{
        return utils.httpGet(utils.API+'/spell/query_msg_template', obj) 
    },
    //删除模板
    removeTemplate: (obj)=>{
        return utils.httpPost(utils.API+'/spell/remove_msg_template', obj) 
    },
    // 查询单个消息模板 
    queryOneTemplate: (obj)=>{
        return utils.httpGet(utils.API+'/spell/query_one_msg_template', obj) 
    },


}