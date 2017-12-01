/*
 * @Author: lyc 
 * @Date: 2017-11-03 18:01:04 
 * @Last Modified by: liyuancheng
 * @Last Modified time: 2017-11-09 10:54:06
 */
import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
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
        {
          path: '/lesson',
          name: 'lesson',
          component: resolve => require(['@/components/lesson'], resolve)
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
        {
          path: '/resources',
          name: 'resources',
          component: resolve => require(['@/components/resources'], resolve)
        },
        {
          path: '/statistics',
          name: 'statistics',
          component: resolve => require(['@/components/statistics'], resolve)
        }

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