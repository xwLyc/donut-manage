<template>
    <div class="activityBox">
        <div class="layout-breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem href="">活动管理</BreadcrumbItem>
                <!-- <BreadcrumbItem href="#">应用中心</BreadcrumbItem>
                                        <BreadcrumbItem>某应用</BreadcrumbItem> -->
            </Breadcrumb>
        </div>
        <div class="layout-content">
            <div class="layout-content-main">
                <div class="queryTop">
                    <div class="fbox">
                        <Input v-model="value1" style="width: 250px">
                        <Select v-model="select" slot="prepend" style="width: 80px">
                            <Option value="name">活动名称</Option>
                            <Option value="type">活动类型</Option>
                            <!-- <Option value="status">状态</Option> -->
                        </Select>
                        </Input>
                    </div>
                    <div class="fbox">
                        <span>上线日期：</span>
                        <DatePicker type="daterange" v-model="upTimeDate" :options="options1" placement="bottom-end" placeholder="选择日期" style="width: 200px"></DatePicker>
                    </div>
                    <div class="fbox">
                        <Button type="primary" @click="queryActivity(page = 0)">查询</Button>
                    </div>
                </div>
                
                <div class="createBox">
                    <!-- <router-link :to="{path:'/activity/editActivity'}"> -->
                        <Button type="primary" @click="newCreateActivity">新建活动</Button>
                    <!-- </router-link> -->
                    
                </div>
                <div class="List">
                    <Table border :columns="columns" :data="activityList"></Table>
                    <Page class-name="pageBox" :total="totalCount" :current="page+1" :page-size="pageCount" show-elevator  @on-change="activityPage"></Page>
                    <Spin fix size="large" v-show="activityLoad"></Spin>
                </div>
                

            </div>

        </div>

        <Modal v-model="modal1" title="确定删除么？" @on-ok="ok" @on-cancel="cancel">
            <p>删除数据将不可恢复！</p>
        </Modal>
        <Modal v-model="modal2" title="海报预览" style="text-align:center;z-index:99999;" width="600">
            <img :src="posterUrl?URL_WEBSITE+posterUrl:''" style="max-width: 100%;max-height:540px;">
        </Modal>
        </Modal>
        <Modal v-model="modal3" title="二维码预览" style="text-align:center;z-index:99999;" width="600">
            <img :src="ewmUrl?ewmUrl:''" style="max-width: 100%;max-height:540px;">
        </Modal>
        <Modal v-model="modal4" title="确定删除么？" @on-ok="ok" @on-cancel="cancel">
            <p>删除数据将不可恢复！</p>
        </Modal>
    </div>
</template>
<script>
import { mapState, mapActions  } from 'vuex'
export default {
    data() {
        return {
            value1: '',
            select: 'name',
            upTimeDate: '',
            modal1:false,
            modal2:false,
            modal3:false,
            modal4:false,
            page: 0,
            paramsIndex: 0,
            activity_id:'',
            posterUrl: '',
            ewmUrl: '',
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
                    // {
                    //     title: 'ID',
                    //     key: 'id',
                    //     width: 50,
                    // },
               
                    {
                        title: '活动名称',
                        key: 'actionName'
                    },
                    {
                        title: '活动类型',
                        key: 'type',
                        render: (h, params) => {
                            return h('div', params.row.type == 1 ? '普通裂变类': params.row.type == 2 ? '普通非裂变类' :'续期课程类')
                        }
                    },
                    {
                        title: '活动码段',
                        key: 'part',
                        render: (h, params) => {
                            if(params.row.type == 2){
                                return h('div', '无')
                            }else{
                                return h('div', '['+ params.row.minKey+ ', '+ params.row.maxKey+']')
                            }
                        }
                    },
                    {
                        title: '关联课程',
                        key: 'relation',
                        render: (h, params) => {
                            return h('div', params.row.course ? params.row.course.name:'无')
                        }
                    },
                    {
                        title: '上线时间',
                        key: 'onlineDate',
                        render: (h, params) => {
                            return h('div', params.row.onlineDate)
                        }
                    },
                    {
                        title: '下线时间',
                        key: 'offlineDate',
                        render: (h, params) => {
                            return h('div', params.row.downlineDate)
                        }
                    },
                    {
                        title: '新增关注',
                        key: 'fans',
                        render: (h, params) => {
                            return h('div', params.row.newCount)
                        }

                    },
                    {
                        title: '状态',
                        key: 'status',
                        render: (h, params) => {
                            return h('div',{
                                style:{
                                    color: params.row.state==1 ? '#19be6b':''
                                }
                            },params.row.state === 0 ? '未上线': params.row.state ==1 ?'已上线':'已下线')
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 250,
                        // fixed: 'right',
                        align: 'center',
                        render: (h, params) => {
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
                                                this.editActivity(params.row._id, params.row.type);
                                            }
                                        }
                                    }, '编辑活动 '),
                                    h('Button', {
                                        props: {
                                            type: 'warning',
                                            size: 'small'
                                        },
                                        style: {
                                            // 普通费裂变类隐藏
                                            display: params.row.type == 2 ? 'none' : ''
                                        },
                                        on: {
                                            click: () => {
                                                this.toLockConfig(params.row._id, params.row.type);
                                            }
                                        }
                                    }, '解锁配置'),
                                    h('Button', {
                                        props: {
                                            type: 'info',
                                            size: 'small'
                                        },
                                        style: {
                                            // marginRight: '5px',
                                            // display:params.row.status=='-1'? 'none':''
                                        },
                                        on: {
                                            click: () => {
                                                this.toMsgConfig( params.row._id, params.row.type);
                                            }
                                        }
                                    }, '消息配置' ),
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
                                                this.updateActivity(params.row.state, params.row._id);
                                            }
                                        }
                                    }, params.row.state > 0 ? '下线':'上线' ),
                                    h('Button', {
                                        props: {
                                            type: 'error',
                                            size: 'small'
                                        },
                                        style: {
                                            display:params.row.state == 0? '':'none'
                                        },
                                        on: {
                                            click: () => {
                                                // this.paramsIndex = params.index;
                                                this.activity_id = params.row._id;
                                                this.modal1 = true;
                                            }
                                        }
                                    }, '删除'),
                                    h('Button', {
                                        props: {
                                            // type: 'error',
                                            size: 'small'
                                        },
                                        style: {
                                            // 普通费裂变类隐藏
                                            display: params.row.type == 2 ? 'none' : ''

                                        },
                                        on: {
                                            click: () => {
                                                this.previewPosters(params.row.donut_poster);
                                            }
                                        }
                                    }, '预览海报'),
                                    h('Button', {
                                        props: {
                                            // type: 'error',
                                            size: 'small'
                                        },
                                        style: {
                                            // backgroundColor: '#f02db1',

                                        },
                                        on: {
                                            click: () => {
                                                this.previewEwm(params.row.root_url);
                                            }
                                        }
                                    }, '二维码')
                                ]);
                            
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
        this.queryActivity();
        this.clearActivity();
    },
    methods:{
        ...mapActions('moduleActivity',['clearActivity', 'onlineActivity', 'deleteActivity']),
        newCreateActivity(){
            this.$router.push({path:'/activity/editActivity'});
        },
        editActivity (_id, type) {
            this.$store.commit('moduleActivity/activityCurId',_id);
            this.$store.commit('moduleActivity/activityType',type);
            this.$store.commit('moduleActivity/activityEdit',true);
            let timerEdit = setInterval(()=>{
                if(this.activityCurId){
                    this.$router.push({path: '/activity/editActivity'});
                    clearInterval(timerEdit);
                }
            },10)
        },
        toLockConfig(_id, type){
            this.$store.commit('moduleActivity/activityCurId',_id);
            this.$store.commit('moduleActivity/activityType',type);
            this.$router.push( {name: 'lockConfig'});
        },
        toMsgConfig(_id, type){
            this.$store.commit('moduleActivity/activityCurId',_id);
            this.$store.commit('moduleActivity/activityType',type);
            this.$router.push( {name: 'msgConfig'});
        },
        remove (index) {
            this.activityList.splice(index, 1);
        },
        updateActivity(state, _id){
            if(state < 1){            // 未上线 to 上线
                this.onlineActivity({segment_id: _id, type: 1}).then(res => {
                    this.$Message.success('上线成功！');
                    this.queryActivity();
                })
            }else{                  //已上线 to 下线
                this.onlineActivity({segment_id: _id, type: -1}).then(res => {
                    this.$Message.success('下线成功！');
                    this.queryActivity();
                })
            }
        },
        queryActivity(){
            // console.log(this.select)
            // console.log(this.value1)
            let datas = {};
            if((this.value1).trim()){
                datas[this.select] = this.value1.trim();
            }
            if(this.upTimeDate[0] && this.upTimeDate[1]){
                datas['date'] = this.upTimeDate.join(',');
            }
            // console.log(datas)
            datas.pageCount = this.pageCount;
            datas.page = this.page;
            this.$store.dispatch('moduleActivity/queryActivity',datas);
        },
        previewPosters(url){
            this.posterUrl = url;
            this.modal2 = true;
        },
        previewEwm(url){
            this.ewmUrl = url;
            this.modal3 = true;
        },
        activityPage(page){
            this.page = page-1;
            this.queryActivity();
        },
        ok(){
            this.deleteActivity(this.activity_id).then(res =>{
                if(res.data.code == 0){
                    this.modal1 = false;
                    this.$Message.success('删除成功！');
                    this.activity_id = '';
                    this.queryActivity();
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
        ...mapState('moduleActivity',['activityList','activityLoad','totalCount','pageCount','activityCurId','updatedStatus','webSite'])
    },
    watch: {
        select() {
            console.log(this.select)
        },
        updatedStatus(val, oldVal){
            if(val){
                this.queryActivity();
                this.$store.commit('moduleActivity/updatedStatus',false);
            }
        }
    }

}
</script>
<style lang="scss" scope>
    .activityList{
        position: relative;

        .pageBox{
            // float: right;
            text-align: right;
            margin: 15px;
        }
    }

    .ivu-table-cell{
        button{
            margin: 3px 2px;
        }
    }

    .layout-content{
        padding-bottom: 60px;
    }

</style>

