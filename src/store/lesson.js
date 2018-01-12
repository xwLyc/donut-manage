/*
 * @Author: lyc 
 * @Date: 2017-11-03 18:02:17 
 * @Last Modified by: liyuancheng
 * @Last Modified time: 2017-12-21 18:13:21
 */
import Vue from 'vue'
import Vuex from 'vuex'
import route from '../router'
import utils from '../utils'
import Lesson from '../Api/lesson'

Vue.use(Vuex)


const state = {
    lessonEdit: false,                          // true为正在编辑， false为创建
    // lessonInfo: {                               //课程信息
    //     name: '',
    //     desc: '',
    //     picName: '',
    //     picUrl: '',
    //     picId: '',
    // },
    lessonList: [{
        name:'',
        lessonCount:'',
        uptime:'',
        downtime:'',
        finished:'',
        status:'',
    }],                                           //课程列表
    lessonLoad: false,                            //加载状态
    totalCount: 0,                                //课程总条数
    pageCount: 10,                                //每页条数
    lessonCurId:'',                               //当前课程ID
    lessonCourse: {                               //课程详情信息
        name:'',
        info:'',
        lessonCount:'',
        image:{
            url:''
        }
    },
    lessonExcel:[{                                //课程表格    
        order:'',
        name:'',
        image:{
            name:''
        },
        video:{
            name:''
        },
        question:'',
        answer:'',
        finished:''
    }],                                                         
    editExcel:'',                                  //编辑课程表格
    selectType:'',                                 //选择类型 image or video
    importExcel:false,                             //是否可以导入表格
    updatedStatus: false,                           //上线 下线更新状态
    webSite: '',                                   //客户端地址
    

    


}
const mutations = {
    lessonEdit: (state, lessonEdit) => state.lessonEdit = lessonEdit,
    // lessonInfo: (state, lessonInfo) => state.lessonInfo = lessonInfo,
    lessonList: (state, lessonList) => state.lessonList = lessonList,
    lessonLoad: (state, lessonLoad) => state.lessonLoad = lessonLoad,
    totalCount: (state, totalCount) => state.totalCount = totalCount,
    lessonCurId: (state, lessonCurId) => state.lessonCurId = lessonCurId,
    lessonCourse: (state, lessonCourse) => state.lessonCourse = lessonCourse,
    lessonExcel: (state, lessonExcel) => state.lessonExcel = lessonExcel,
    importExcel: (state, importExcel) => state.importExcel = importExcel,
    editExcel: (state, index) => {
        state.editExcel = state.lessonExcel[index];
        // state.editExcel.order = state.editExcel.order.toString();//序列转为字符串格式
    },
    clearEditExcel:(state) => state.editExcel = '',
    selectType: (state, selectType) => state.selectType = selectType,
    modifyEditExcel: (state, payload) => {
        // if()
    },
    updatedStatus: (state, updatedStatus) => state.updatedStatus = updatedStatus,
    webSite: (state, webSite) => state.webSite = webSite,

    

}
const actions = {
    initLessonInfo(context) {                               //初始化课程信息（新建）
        // let lessonInfo = {
        //     name: '',
        //     desc: '',
        //     picName: '',
        //     picUrl: '',
        //     picId: '',
        // }
        context.commit('lessonEdit', false);
        // context.commit('lessonInfo', lessonInfo);
    },
    clearLesson(context){                                   //清空课程信息
        context.commit('lessonCurId', '');
        context.commit('lessonCourse', {
            name:'',
            info:'',
            lessonCount:'',
            image:{
                url:''
            }
        });
        context.commit('lessonExcel', []);
        context.dispatch('initLessonInfo');

    },
    createLesson(context, payload) {                        //新建以及更新课程请求
        let datas = {
            type: payload.type,
            name: payload.name,
            info: payload.desc,
            image: payload.picId
        }
        if(payload.bookId && payload.moreInfo){
            datas.book_image = payload.bookId,
            datas.book_more_info = payload.moreInfo
        }
        if(payload.lessonCurId){
            datas.course_id = payload.lessonCurId;
        }
        Lesson.createLesson(datas).then(res => {
            console.log(res)
            if(res.data.code == 0){
                route.push({path:'/lesson'});
            }else{
                alert(res.data.msg)
            }
        })
    },
    queryLesson(context, payload) {                             //查询课程
        context.commit('lessonLoad',true);
        let datas = {};
        if(payload.name){
            datas.course_name = payload.name;
        }
        if(payload.date){
            datas.date = payload.date;
        }
        if(payload.page){
            datas.page = payload.page;
        }
        if(payload.pageCount){
            datas.pageCount = payload.pageCount;
        }else{
            datas.pageCount = 10;
        }
        Lesson.queryLesson(datas).then(res => {
            // console.log(res)
            if(res.data.code == 0){
                // console.log(res.data.data)
                context.commit('lessonList',res.data.data);
                context.commit('lessonLoad', false);
                context.commit('totalCount', res.data.totalCount);
            }else{
                alert(res.data.msg)
            }
        })
    },
    publishLesson(context, course_id) {                             //课程上线
        Lesson.publishLesson({course_id:course_id}).then(res => {
            // console.log(res)
            if(res.data.code == 0){
                context.commit('updatedStatus', true);
            }
        })
    },
    unpublishLesson(context, course_id) {                             //课程下线
        Lesson.unpublishLesson({course_id:course_id}).then(res => {
            // console.log(res)
            if(res.data.code == 0){
                context.commit('updatedStatus', true);
            }
        })
    },
    deleteLesson(context, course_id) {                             //删除未上线课程
        return new Promise((resolve, reject) => {
            Lesson.deleteLesson({course_id:course_id})
            .then(res => resolve(res))
            .catch(err => reject(err))
        })
        
    },

    queryLessonDetail(context, lessonCurId) {                       //查询课程下 的课节
        Lesson.queryLessonDetail({course_id:lessonCurId}).then(res=>{
            // console.log(res)
            if(res.data.code == 0){
                // console.log(res.data.data)
                let data = res.data.data;
                let lessonCourse = data.course;
                let lessonExcel = data.lesson;
                context.commit('lessonCourse',lessonCourse);
                context.commit('lessonExcel',lessonExcel);

                
            }else{
                route.push({path:'/lesson'})
                // alert(res.data.msg)
            }
        })
    },
    updatedLessonDetail(context, payload) {                           //编辑课节
        let datas = {}
        datas.lesson_id = payload.lesson_id;
        datas.order	    = payload.order	;
        datas.name      = payload.name;
        datas.image     = payload.imageId;
        datas.video     = payload.videoId;
        datas.question  = payload.question;
        datas.answer    = payload.answer;
        Lesson.updatedLessonDetail(datas).then(res=>{
            return res;
        }).then(res => {
            if(res.data.code == 0){
                context.dispatch('queryLessonDetail',state.lessonCurId);
            }
        })

    },
    createWebsite(context, course_id){                                           //生成客户端地址
        Lesson.createWebsite({course_id: course_id}).then(res => {
            context.commit('webSite', res.data.url)
        })
    }

}
const getters = {

}
const moduleLesson = {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
export default moduleLesson