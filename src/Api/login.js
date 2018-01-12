/*
 * @Author: lyc 
 * @Date: 2017-11-30 17:23:30 
 * @Last Modified by: liyuancheng
 * @Last Modified time: 2018-01-10 11:12:28
 */
import utils from '../utils'

export default {
    //新建以及更新课程请求
    login: (obj)=>{
        return utils.httpPost(utils.API+'/login', obj)
    },
    exist: (obj)=>{
        return utils.httpGet(utils.API+'/exist_login', obj) 
    },

}