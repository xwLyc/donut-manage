/*
 * @Author: lyc 
 * @Date: 2017-11-30 17:23:33 
 * @Last Modified by: liyuancheng
 * @Last Modified time: 2018-06-04 17:32:44
 */

import utils from '../utils'

export default {
    //创建或者编辑微信公众号
    createGzh: (obj)=>{
        return utils.httpPost(utils.API+'/library/create_gzh', obj) 
    },
    //查询公众号列表
    queryGzhList: (obj)=>{
        return utils.httpGet(utils.API+'/library/query_gzh_list', obj) 
    },
    //切换公众号
    selectGzh: (obj)=>{
        return utils.httpGet(utils.API+'/library/select_gzh', obj) 
    },
    //初始化公众号
    initGzh: (obj)=>{
        return utils.httpGet(utils.API+'/library/init_gzh', obj) 
    },
    // 查询当前公众号
    currGzh: (obj)=>{
        return utils.httpGet(utils.API+'/library/curr_gzh', obj) 
    },

}