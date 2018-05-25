/*
 * @Author: lyc 
 * @Date: 2017-11-03 18:01:04 
 * @Last Modified by: liyuancheng
 * @Last Modified time: 2018-05-22 10:29:07
 */
import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

// 按模块引入路由
import lesson from './lesson'
import resources from './resources'
import statistics from './statistics'
import activity from './activity'
import template from './template'
import collection from './collection'

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/login',
            name: 'login',
            component: resolve => require(['@/components/login'], resolve)
        },
        {
            path: '/index',
            name: 'index',
            component: resolve => require(['@/components/index'], resolve),
            children: [
                // 课程管理
                ...lesson, 
                // 资源管理
                ...resources,
                // 数据统计
                ...statistics,
                // 活动管理
                ...activity,
                // 消息模板管理
                ...template,
                // 集合页管理
                ...collection,

            ]
        }, {
            path: '*',
            redirect: '/login'
        }
    ]
})
router.beforeEach((to, from, next) => {
    if (to.fullPath == '/lesson') {
        store.dispatch('moduleLesson/clearLesson');
        next();
    } else {
        next();
    }
})
export default router