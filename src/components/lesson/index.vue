<template>
    <div class="">
        <div class="layout-breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem href="/lesson">课程管理</BreadcrumbItem>
                <!-- <BreadcrumbItem href="#">应用中心</BreadcrumbItem>
                                        <BreadcrumbItem>某应用</BreadcrumbItem> -->
            </Breadcrumb>
        </div>
        <div class="layout-content">
            <div class="layout-content-main">
                <div class="queryTop">
                    <div class="fbox">
                        <Input v-model="value1" style="width: 250px">
                        <Select v-model="select1" slot="prepend" style="width: 80px">
                            <Option value="name">课程名称</Option>
                            <Option value="type">课程类型</Option>
                            <!-- <Option value="status">状态</Option> -->
                        </Select>
                        </Input>
                    </div>
                    <div class="fbox">
                        <span>上线日期：</span>
                        <DatePicker type="daterange" v-model="upTimeDate" :options="options1" placement="bottom-end" placeholder="选择日期" style="width: 200px"></DatePicker>
                    </div>
                    <div class="fbox">
                        <Button type="primary" @click="queryLesson(page = 0)">查询</Button>
                    </div>
                </div>
                
                <div class="createBox">
                    <!-- <router-link :to="{path:'/lesson/editLesson'}"> -->
                        <Button type="primary" @click="newCreateLesson">新建课程</Button>
                    <!-- </router-link> -->
                </div>
                <div class="List">
                    <Table border :columns="columns" :data="lessonList"></Table>
                    <Page class-name="pageBox" :total="totalCount" :current="page+1" :page-size="pageCount" show-elevator  @on-change="lessonPage"></Page>
                    <Spin fix size="large" v-show="lessonLoad"></Spin>
                </div>
                

            </div>

        </div>

        <Modal v-model="modal1" title="确定删除么？" @on-ok="ok" @on-cancel="cancel">
            <p>删除数据将不可恢复！</p>
        </Modal>
        <Modal v-model="modal2" title="生成客户端地址">
            <p>{{webSite}}</p>
        </Modal>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
// import { createNamespacedHelpers } from 'vuex'
// const { mapState, mapActions } = createNamespacedHelpers('moduleLesson')
export default {
    data() {
        return {
            value1: '',
            select1: 'name',
            upTimeDate: '',
            modal1:false,
            modal2:false,
            page: 0,
            paramsIndex: 0,
            course_id:'',
            options1: {
                shortcuts: [
                    {
                        text: '最近一周',
                        value() {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            return [start, end];
                        }
                    },
                    {
                        text: '最近一个月',
                        value() {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            return [start, end];
                        }
                    },
                    {
                        text: '最近三个月',
                        value() {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            return [start, end];
                        }
                    }
                ]
            },
            columns: [
               
                    {
                        title: '课程名称',
                        key: 'name',
                    },
                    {
                        title: '课程类型',
                        key: 'type',
                        render: (h, params) =>{
                            return h('p',params.row.type==0?'续期类':'兑换类')
                        }
                    },
                    {
                        title: '课节数量',
                        key: 'lessonCount',
                        // width: 100
                    },
                    {
                        title: '上线时间',
                        key: 'onlineDate',
                    },
                    {
                        title: '下线时间',
                        key: 'offlineDate',
                    },
                    {
                        title: '是否完成',
                        key: 'finished',
                        render: (h, params) => {
                            return h('div',{
                                style:{
                                    color: params.row.finished?'':'red'
                                }
                            },params.row.finished?'是':'否')
                        }
                    },
                    {
                        title: '状态',
                        key: 'status',
                        render: (h, params) => {
                            return h('div',{
                                style:{
                                    color: params.row.status==1?'#19be6b':''
                                }
                            },params.row.status == 0 ? '未上线':(params.row.status == 1) ? '已上线':'已下线')
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 200,
                        // fixed: 'right',
                        align: 'center',
                        render: (h, params) => {
                            // if(params.row.status == 1 || params.row.status == 0){
                                return h('div', [
                                    h('Button', {
                                        props: {
                                            type: 'primary',
                                            size: 'small'
                                        },
                                        style: {
                                            // marginRight: '5px'
                                        },
                                        on: {
                                            click: () => {
                                                this.editLesson(params.row._id);
                                            }
                                        }
                                    }, '编辑课程'),
                                    h('Button', {
                                        props: {
                                            type: 'warning',
                                            size: 'small'
                                        },
                                        style: {
                                            // marginRight: '5px'
                                        },
                                        on: {
                                            click: () => {
                                                // console.log(params.row._id)
                                                this.excelLesson(params.row._id, params.row.status);
                                            }
                                        }
                                    }, '资源匹配'),
                                    h('Button', {
                                        props: {
                                            type: 'success',
                                            size: 'small'
                                        },
                                        style: {
                                            // marginRight: '5px',
                                            // display:params.row.status=='-1'? 'none':''
                                        },
                                        on: {
                                            click: () => {
                                                this.updateLesson(params.row.status, params.row._id);
                                            }
                                        }
                                    }, params.row.status==1 ? '下线' : '上线' ),
                                    h('Button', {
                                        props: {
                                            type: 'error',
                                            size: 'small'
                                        },
                                        style: {
                                            display:params.row.status==0? '':'none'
                                        },
                                        on: {
                                            click: () => {
                                                this.paramsIndex = params.index;
                                                this.course_id = params.row._id;
                                                this.modal1 = true;
                                            }
                                        }
                                    }, '删除'),
                                    h('Button', {
                                        props: {
                                            type: 'info',
                                            size: 'small'
                                        },
                                        style: {
                                            
                                        },
                                        on: {
                                            click: () => {
                                                this.createWebsite(params.row._id);
                                                this.modal2 = true;
                                            }
                                        }
                                    }, '生成地址')
                                ]);
                            // }
                            
                        }
                    }
                ],
                data6: [
                    {
                        name:'',
                        num:'',
                        uptime:'',
                        downtime:'',
                        finished:'',
                        status:'',
                    },
                ]

        }
    },
    created() {
        this.queryLesson();

    },
    methods:{
        newCreateLesson(){
            this.$store.dispatch('moduleLesson/initLessonInfo');
            this.$router.push({path:'/lesson/editLesson'});
        },
        editLesson (_id) {
            this.$store.commit('moduleLesson/lessonCurId',_id);
            this.$store.commit('moduleLesson/lessonEdit',true);
            let timerEdit = setInterval(()=>{
                if(this.lessonCurId){
                    this.$store.dispatch('moduleLesson/queryLessonDetail',_id);
                    this.$router.push({path: '/lesson/editLesson'});
                    clearInterval(timerEdit);
                }
            },10)
        },
        excelLesson(_id, status){
            this.$store.commit('moduleLesson/lessonCurId',_id);
            if(status==0){
                this.$store.commit('moduleLesson/importExcel',true);
            }else{
                this.$store.commit('moduleLesson/importExcel',false);
            }
            let timerExcel = setInterval(()=>{
                if(this.lessonCurId){
                    this.$store.dispatch('moduleLesson/queryLessonDetail',_id);
                    this.$router.push({path: '/lesson/excelLesson'});
                    clearInterval(timerExcel);
                }
            },10)
        },
        remove (index) {
            this.lessonList.splice(index, 1);
        },
        updateLesson(status, _id){
            if(status==0 || status == -1){            //上线
                this.$store.dispatch('moduleLesson/publishLesson',_id);
            }else{                  //下线
                this.$store.dispatch('moduleLesson/unpublishLesson',_id);
            }
        },
        queryLesson(){
            // console.log(this.select1)
            // console.log(this.value1)
            let datas = {};
            if((this.value1).trim()){
                datas[this.select1] = this.value1.trim();
            }
            if(this.upTimeDate[0] && this.upTimeDate[1]){
                datas['date'] = this.upTimeDate.join(',');
            }
            datas.pageCount = this.pageCount;
            datas.page = this.page;
            this.$store.dispatch('moduleLesson/queryLesson',datas);
        },
        createWebsite(course_id){
            this.$store.dispatch('moduleLesson/createWebsite',course_id);
        },
        lessonPage(page){
            this.page = page-1;
            this.queryLesson();
        },
        ok(){
            this.$store.dispatch('moduleLesson/deleteLesson',this.course_id).then(res =>{
                if(res.data.code == 0){
                    this.modal1 = false;
                    this.$Message.success('删除成功！');
                    this.remove(this.paramsIndex);
                    this.course_id = '';
                }else{
                    this.$Message.error(res.data.msg);                    
                }
            });
            
        },
        cancel(){
            this.modal1 = false;
        }
    },
    computed:{
        ...mapState(['curGzhId']),
        ...mapState('moduleLesson', ['lessonList','lessonLoad','totalCount','pageCount','lessonCurId','updatedStatus','webSite'])
    },
    watch: {
        curGzhId(val){
            this.queryLesson();
        },
        select1() {
            console.log(this.select1)
        },
        updatedStatus(val, oldVal){
            if(val){
                this.queryLesson();
                this.$store.commit('moduleLesson/updatedStatus',false);
            }
        },

    }

}
</script>
<style lang="scss" scope>
</style>

