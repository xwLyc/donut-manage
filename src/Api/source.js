/*
 * @Author: lyc 
 * @Date: 2017-11-30 17:23:33 
 * @Last Modified by: liyuancheng
 * @Last Modified time: 2018-01-10 11:17:26
 */

import utils from '../utils'

export default {
    //查询文件夹以及文件
    queryAll: (obj)=>{
        return utils.httpPost(utils.API+'/query_dir', obj) 
    },
    //新建文件夹
    createFolder: (obj)=>{
        return utils.httpPost(utils.API+'/create_dir', obj) 
    },
    //重命名文件夹
    updateFolderDir: (obj)=>{
        return utils.httpPost(utils.API+'/update_dir', obj) 
    },
    //重命名文件
    updateFolderFile: (obj)=>{
        return utils.httpPost(utils.API+'/update_file', obj) 
    },
    //删除文件 以及空文件夹  支持多选
    deleteTopFolder: (obj)=>{
        return utils.httpPost(utils.API+'/delete_dir_file', obj) 
    },

}