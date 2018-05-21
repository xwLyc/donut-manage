
import utils from '../utils'

export default {
    //新建以及更新集合
    createCollection: (obj)=>{
        return utils.httpPost(utils.API+'/spell/create_msg_collection', obj) 
    },
    //查询集合列表
    queryCollection: (obj)=>{
        return utils.httpGet(utils.API+'/spell/query_msg_collection', obj) 
    },
    //删除集合
    removeCollection: (obj)=>{
        return utils.httpPost(utils.API+'/spell/remove_msg_collection', obj) 
    },
    // 查询当前编辑的集合
    queryOneCollection: (obj)=>{
        return utils.httpGet(utils.API+'/spell/query_one_msg_collection', obj) 
    },
}