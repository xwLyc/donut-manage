/*
 * @Author: lyc 
 * @Date: 2017-11-03 18:01:04 
 * @Last Modified by: liyuancheng
 * @Last Modified time: 2018-03-19 10:18:29
 */
import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import { mapActions } from 'vuex';
Vue.use(Router)

const router =  new Router({
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
      children:[
        // 课程管理
        {
          path: '/lesson',
          name: 'lesson',
          component: resolve => require(['@/components/lesson'], resolve),
        },
        {
          path: '/lesson/editLesson',
          name: 'editLesson',
          component: resolve => require(['@/components/lesson/editLesson'], resolve)
        },
        {
          path: '/lesson/excelLesson',
          name: 'excelLesson',
          component: resolve => require(['@/components/lesson/excelLesson'], resolve)
        },
        {
          path: '/lesson/excelLesson/excelEdit',
          name: 'excelEdit',
          component: resolve => require(['@/components/lesson/excelEdit'], resolve)
        },
        // 资源管理
        {
          path: '/resources',
          name: 'resources',
          component: resolve => require(['@/components/resources'], resolve)
        },
        // 数据统计
        {
          path: '/statistics',
          name: 'statistics',
          component: resolve => require(['@/components/statistics'], resolve)
        },
        // 活动管理
        {
          path: '/activity',
          name: 'activity',
          component: resolve => require(['@/components/activity'], resolve)
        },
        {
          path: '/activity/editActivity',
          name: 'editActivity',
          component: resolve => require(['@/components/activity/editActivity'], resolve)
        },
        {
          path: '/activity/lockConfig',
          name: 'lockConfig',
          component: resolve => require(['@/components/activity/lockConfig'], resolve)
        },
        {
          path: '/activity/msgConfig',
          name: 'msgConfig',
          component: resolve => require(['@/components/activity/msgConfig'], resolve),
          children: [
            {
              path: '/activity/liebian/msgUnLock',
              name: 'lb_msgUnLock',
              component: resolve => require(['@/components/activity/liebian/msgUnLock'], resolve)
            },
            {
              path: '/activity/liebian/msgStudy',
              name: 'lb_msgStudy',
              component: resolve => require(['@/components/activity/liebian/msgStudy'], resolve)
            },
            {
              path: '/activity/xuqi/msgUnLock',
              name: 'xq_msgUnLock',
              component: resolve => require(['@/components/activity/xuqi/msgUnLock'], resolve)
            },
            {
              path: '/activity/xuqi/msgStudy',
              name: 'xq_msgStudy',
              component: resolve => require(['@/components/activity/xuqi/msgStudy'], resolve)
            },
            {
              path: '/activity/xuqi/msgRenewal',
              name: 'xq_msgRenewal',
              component: resolve => require(['@/components/activity/xuqi/msgRenewal'], resolve)
            },
          ]
        },
        // 消息模板管理
        {
          path: '/template',
          name: 'template',
          component: resolve => require(['@/components/template'], resolve)
        },
        {
          path: '/template/editTemplate',
          name: 'editTemplate',
          component: resolve => require(['@/components/template/editTemplate'], resolve)
        },
        // 集合页管理
        {
          path: '/collection',
          name: 'collection',
          component: resolve => require(['@/components/collection'], resolve)
        },
        {
          path: '/collection/createCollection',
          name: 'createCollection',
          component: resolve => require(['@/components/collection/createCollection'], resolve)
        },

      ]
    },{
      path:'*',
      redirect:'/login'
    }
  ]
})
router.beforeEach((to, from, next)=>{
  if(to.fullPath=='/lesson'){
    store.dispatch('moduleLesson/clearLesson');
    next();
  }else{
    next();
  }
})
export default router