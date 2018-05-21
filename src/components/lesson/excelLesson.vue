<template>
    <div>
        <div class="layout-breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem href="/lesson">课程管理</BreadcrumbItem>
                <BreadcrumbItem href="#">资源匹配</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="layout-content">
            <div class="layout-content-main exLessonInfo ">
                <div class="info">
                    <p><span>课程名称：</span>{{lessonCourse.name}}</p>
                    <p><span>课节数量：</span>{{lessonCourse.lessonCount}}</p>
                    <p><span>课程介绍：</span>{{lessonCourse.info}}</p>
                    <p><span>课程配图：</span>
                        <template v-if="lessonCourse.image">
                            <img :src="lessonCourse.image.url?lessonCourse.image.url:''" alt="">
                        </template>
                    </p>
                </div>
                <Upload 
                    ref="upload"
                    :action="API+'/spell/input_lesson_excel'"
                    :data="{course_id:lessonCurId}"
                    :on-success="handleSuccess"
                    :before-upload="handleBefore"
                    :show-upload-list="uploadList"
                    class="uploadExcel"
                    v-show="importExcel"
                    >
                    <Button type="primary" icon="ios-cloud-upload-outline">上传表格</Button>
                </Upload>
                <Table :columns="columns1" :data="lessonExcel"></Table>
                <Spin fix size="large" v-show="spin"></Spin>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
    data() {
        return {
            uploadList:true,
            spin:true,
            columns1: [
                    {
                        // title: '课节序列',
                        key: 'order',
                        width: '100',
                        renderHeader: (h, obj) => {
                            return h('div', [
                                h('span', '课节序列'),
                                h('span', {
                                    style: {
                                        color: 'red',
                                        marginLeft: '2px'
                                    }
                                }, '*')
                            ])
                        }
                    },
                    {
                        // title: '课节名称',
                        key: 'name',
                        renderHeader: (h, obj) => {
                            return h('div', [
                                h('span', '课节名称'),
                                h('span', {
                                    style: {
                                        color: 'red',
                                        marginLeft: '2px'
                                    }
                                }, '*')
                            ])
                        },
                        render: (h, params)=> {
                            if(params.row.name){
                                return h('div',params.row.name)
                            }else{
                                return h('div',{
                                    style: {
                                        color: 'red'
                                    }
                                }, '未匹配')
                            }
                        }
                    },
                    {
                        // title: '课节配图',
                        key: 'image',
                        renderHeader: (h, obj) => {
                            return h('div', [
                                h('span', '课节配图'),
                                h('span', {
                                    style: {
                                        color: 'red',
                                        marginLeft: '2px'
                                    }
                                }, '*')
                            ])
                        },
                        render: (h, params)=> {
                            // console.log(params)
                            if(params.row.image){
                                return h('div',params.row.image.name)
                            }else{
                                return h('div',{
                                    style: {
                                        color: 'red'
                                    }
                                }, '未匹配')
                            }
                        }
                    },
                    {
                        // title: '视频',
                        key: 'video',
                        renderHeader: (h, obj) => {
                            return h('div', [
                                h('span', '视频'),
                                h('span', {
                                    style: {
                                        color: 'red',
                                        marginLeft: '2px'
                                    }
                                }, '*')
                            ])
                        },
                        render: (h, params) =>{
                            if(params.row.video){
                                return h('div',params.row.video.name)
                            }else{
                                return h('div',{
                                    style: {
                                        color: 'red'
                                    }
                                }, '未匹配')
                            }
                        }
                    },
                    {
                        title: '视频配图',
                        key: 'preview',
                        render: (h, params)=> {
                            // console.log(params)
                            if(params.row.preview){
                                return h('div',params.row.preview.name)
                            }else{
                                return h('div',{
                                    style: {
                                        color: 'red'
                                    }
                                }, '未匹配')
                            }
                        }
                    },
                    {
                        title: '互动问题',
                        key: 'question',
                        render: (h, params)=> {
                            if(params.row.question){
                                return h('div',params.row.question)
                            }else{
                                return h('div',{
                                    style: {
                                        color: 'red'
                                    }
                                }, '未匹配')
                            }
                        }
                    },
                    {
                        title: '互动答案',
                        key: 'answer',
                        render: (h, params)=> {
                            if(params.row.answer){
                                return h('div',params.row.answer)
                            }else{
                                return h('div',{
                                    style: {
                                        color: 'red'
                                    }
                                }, '未匹配')
                            }
                        }
                    },
                    {
                        title: '操作',
                        key: 'edit',
                        width: '80',
                        render: (h, params) =>{
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.excelEdit(params.index);
                                        }
                                    }
                                }, '编辑')
                            ]);
                        }
                    }
                ],
                data1: [{
                    order:'',
                    name:'',
                    image:{
                        name:''
                    },
                    video:{
                        name:''
                    },
                    preview:{
                        name:''
                    },
                    question:'',
                    answer:'',
                    finished:''
                }]
        }
    },
    mounted(){
        if(!this.lessonCurId){
            this.$router.push({path:'/lesson'});
        }
        setTimeout(()=>{
            this.spin = false;
        },500)
    },
    methods: {
        handleSuccess(response, file, fileList){
            // console.log(response)
            this.excelData();
            setTimeout(()=> {
                this.uploadList = false;
                this.$refs.upload.fileList.length = 0; //清空已上传列表
            }, 5000);

        },
        handleBefore(){
            this.uploadList = true;
        },
        excelData(){
            this.$store.dispatch('moduleLesson/queryLessonDetail',this.lessonCurId);
        },
        excelEdit(index){
            this.$store.commit('moduleLesson/editExcel',index);
            this.$router.push({name:'excelEdit'})
        }
    },
    computed: {
        ...mapState('moduleLesson',['lessonCurId','lessonCourse','lessonExcel','importExcel']),

    }
};
</script>
<style lang="scss">
    .exLessonInfo{
        position: relative;
        padding: 14px;
        .info{
            font-size: 14px;
            margin-bottom: 8px;
            p{
                overflow: hidden;
                vertical-align: top;
                span{
                    float: left;
                    font-weight: bold;
                }
                img{
                    float: left;
                    max-height: 100px;
                    // border: 1px solid #eee;
                }
            }

        }
        .uploadExcel{
            position: relative;
            margin-bottom: 16px;
            .ivu-upload-list{
                width: 200px;
                position: absolute;
                top: 0px;
                right: 10px;
                z-index: 1;
                background: #FFF;


            }

        }
    }
</style>

