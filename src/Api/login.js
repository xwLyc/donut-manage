/*
 * @Author: lyc 
 * @Date: 2017-11-30 17:23:30 
 * @Last Modified by: liyuancheng
 * @Last Modified time: 2017-12-04 16:22:44
 */
import utils from '../utils'

export default {
    //新建以及更新课程请求
    login: (obj)=>{
        return new Promise((resolve, reject) => {
            utils.httpPost(utils.API+'/login', obj)
            .then(res=> resolve(res))
            .catch(err=> reject(err))
        })
    },

}