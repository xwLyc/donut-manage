/*
 * @Author: lyc 
 * @Date: 2017-12-15 14:15:08 
 * @Last Modified by: liyuancheng
 * @Last Modified time: 2018-01-05 11:06:04
 */

import Vue from 'vue'
import Vuex from 'vuex'
import Template from '../Api/template'
import { resolve } from 'url';
Vue.use(Vuex)


const state = {
    templateEdit: false,        //false 新建模板, true 编辑模板
    templateList: [],           //消息模板列表
    totalCount: 0,              //总条数
    pageCount: 10,              //每页条数
    editTemplateId: '',         //正在编辑的_id
    Load: true,                //加载


}
const mutations = {
    templateEdit: (state, templateEdit) => state.templateEdit = templateEdit,
    templateList: (state, templateList) => state.templateList = templateList,
    totalCount: (state, totalCount) => state.totalCount = totalCount,
    editTemplateId: (state, editTemplateId) => state.editTemplateId = editTemplateId,
    Load: (state, Load) => state.Load = Load,

}
const actions = {
    // 保存成功，清除缓存的_id
    clearId({commit}){
        commit('editTemplateId','');
        commit('templateEdit', false);
    },
    // 查询消息模板列表
    queryTemplate(context, payload){
        // console.log(payload.id)
        context.commit('Load', true);
        
        let datas = {
            wx_id: payload.wx_id,
            title: payload.title,
            page: payload.page,

        }
        if(payload.pageCount){
            datas.page_count = payload.pageCount;
        }
        Template.queryTemplate(datas).then(res =>{
            // console.log(res)
            context.commit('templateList', res.data.data)
            context.commit('totalCount', res.data.count)
            context.commit('Load', false);
        })
    },
    // 新建消息模板或编辑消息模板
    createTemplate(context, payload){
        let datas = {
            wx_id: payload.wx_id,
            title: payload.title
        }
        payload.items.forEach((e, i) => {
            datas['keyword'+(i+1)] = e.value;
        })
        if(payload._id){
            datas._id = payload._id;
        }
        // console.log(datas)
        return new Promise((resolve, reject) => {
            Template.createTemplate(datas)
                    .then(res=> resolve(res))
                    .catch(err=> reject(err))
        })
    },
    // 删除模板
    removeTemplate(context, _id){
        return new Promise((resolve, reject) => {
            Template.removeTemplate({_id: _id})
            .then(res => resolve(res))
            .catch(err => reject(err))

        })
    },
    //  查询单个消息模板 
    queryOneTemplate(context, _id){
        return new Promise((resolve, reject) => {
            Template.queryOneTemplate({_id: _id})
            .then(res => resolve(res))
            .catch(err => reject(err))

        })
    },

}
const getters = {

}
const moduleTemplate = {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
export default moduleTemplate