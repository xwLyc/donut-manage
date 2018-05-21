import Vue from 'vue'
import Vuex from 'vuex'
import Collection from '../Api/collection'

Vue.use(Vuex)

const state = {
  collectionEdit: false,  //false 新建集合, true 编辑集合
  collectionList: [],  //集合列表，将展示在集合管理页面表格中
  totalCount: 0,  //总条数
  pageCount: 10,  //每页条数
  editCollectionId: '',  //正在编辑的_id
  Load: false,  //loading,加载中为true
}

const mutations = {
  collectionEdit: (state, collectionEdit) => state.collectionEdit = collectionEdit,
  collectionList: (state, collectionList) => state.collectionList = collectionList,
  totalCount: (state, totalCount) => state.totalCount = totalCount,
  editCollectionId: (state, editCollectionId) => state.editCollectionId = editCollectionId,
  Load: (state, Load) => state.Load = Load,
}

const actions = {  
  // 保存成功，清除缓存的_id
  clearId({commit}){
    commit('editCollectionId','');
    commit('collectionEdit', false);
  },

  //查询集合列表
  queryCollection(context,payload){
    context.commit('Load', true);

    let datas = {
      page: payload.page,
    }

    Collection.queryCollection(datas).then( res => {
      context.commit('collectionList', res.data.data)
      context.commit('totalCount', res.data.count)
      context.commit('Load', false);
    })
  },

  //查询当前编辑的集合 
  queryOneCollection(context, _id){
    return new Promise((resolve, reject) => {
      Collection.queryOneCollection({_id: _id})
        .then(res => resolve(res))
        .catch(err => reject(err))

    })
  },

  //新建或编辑集合
  createCollection(context, payload){
    let datas = {
      name: data.name,
      section: data.section,
      type1: data.type1,
      type2: data.type2,
      type3: data.type3,
      section: data.number,
      name: data.article,
      section: data.entry,
      section: data.tag,
    }
    // payload.items.forEach((e, i) => {  //e代表当前元素，i表示当前元素的索引值
    //     datas['keyword'+(i+1)] = e.value;
    // })

    if(payload._id){
        datas._id = payload._id;
    }

    return new Promise((resolve, reject) => {
        Collection.createCollection(datas)
                .then(res=> resolve(res))
                .catch(err=> reject(err))
    })
  },

  // 删除集合
  removeCollection(context, _id){
    return new Promise((resolve, reject) => {
        Template.removeCollection({_id: _id})
        .then(res => resolve(res))
        .catch(err => reject(err))

    })
  },
  
}

const getters = {

}
const moduleCollection = {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
export default moduleCollection