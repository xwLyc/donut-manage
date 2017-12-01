/*
 * @Author: lyc 
 * @Date: 2017-11-30 17:23:33 
 * @Last Modified by: liyuancheng
 * @Last Modified time: 2017-11-30 18:50:11
 */

import utils from '../utils'

export default {
    //查询文件夹以及文件
    queryAll: (obj)=>{
        return new Promise((resolve, reject) => {
            utils.httpPost(utils.API+'/query_dir', obj)
            .then(res=> resolve(res))
            .catch(err=> reject(err))
        })
    },
    //新建文件夹
    createFolder: (obj)=>{
        return new Promise((resolve, reject) => {
            utils.httpPost(utils.API+'/create_dir', obj)
            .then(res=> resolve(res))
            .catch(err=> reject(err))
        })
    },
    //重命名文件夹
    updateFolderDir: (obj)=>{
        return new Promise((resolve, reject) => {
            utils.httpPost(utils.API+'/update_dir', obj)
            .then(res=> resolve(res))
            .catch(err=> reject(err))
        })
    },
    //重命名文件
    updateFolderFile: (obj)=>{
        return new Promise((resolve, reject) => {
            utils.httpPost(utils.API+'/update_file', obj)
            .then(res=> resolve(res))
            .catch(err=> reject(err))
        })
    },
    //删除文件 以及空文件夹  支持多选
    deleteTopFolder: (obj)=>{
        return new Promise((resolve, reject) => {
            utils.httpPost(utils.API+'/delete_dir_file', obj)
            .then(res=> resolve(res))
            .catch(err=> reject(err))
        })
    },

}