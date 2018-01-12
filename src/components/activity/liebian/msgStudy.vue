<template>
    <div class="msgStudy pos_r">

        <template v-for="(item, index) in timeList">

            <Row type="flex" justify="center" class="code-row-bg" :key="index">
                <Col span="4" class="textA">日常提醒通知：</Col>
                <Col span="12">
                    <v-edit-task :taskType="activityType" :activityCurId="activityCurId" :taskId.sync="item.timeTask"></v-edit-task>
                </Col>
                <Col span="4" class="">
                    <Button type="error"  @click="deleteTimeTask(index, item.timeTask, item.timeMsg)" style="margin: 20px" v-show="index < timeList.length-1">删除</Button>
                </Col>
                
            </Row>
            <Row type="flex" justify="center" class="code-row-bg" :key="index">
                <Col span="4" class="textA"></Col>
                <Col span="12">
                    <v-edit-notice :templateList="templateList" :msgId.sync="item.timeMsg"></v-edit-notice>
                </Col>
                <Col span="4" class=""></Col>
            </Row>
        </template>

        <Row type="flex" justify="center" class="code-row-bg" style="margin: 30px 50px;">
            <Button type="primary" size="large" icon="plus-round" style="width: 200px;margin-right: 10px;" @click="timeSubmit(timeList[timeList.length-1].timeTask, timeList[timeList.length-1].timeMsg)">保存并新增</Button>
            <Button type="ghost" size="large" style="width: 200px;" @click="toBack">返回</Button>
        </Row>

        <Spin fix size="large" v-show="spin"></Spin>

 
        <!-- 模态框  -->
        <Modal v-model="modal1" title="确定要删除此条通知么" @on-ok="deleteTimeTaskOk">
            <p>删除后数据不可恢复！</p>
        </Modal>
       
    </div>
</template>
<script>
    import vEditNotice from '../editNotice'
    import vEditTask from '../editTask'
    import { mapState, mapActions } from 'vuex'
    export default {
        data () {
            return {
                modal1: false,
                spin:true,
                curIndex: 0,
                curTimeTask: '',
                curTimeMsg: '',
                timeList: [            //普通裂变学习配置
                    {
                        timeTask: '',
                        timeMsg: '',
                    }
                ]
            }
        },
        mounted(){
            if(!this.activityCurId){
                this.toBack();
            }else{
                // 普通裂变类
                if(this.activityType){
                    // 查询普通裂变学习配置
                    this.queryStudy();
                }else{
                    alert('非普通裂变类')
                }
            }
            // this.queryTemplate({
            //     pageCount: 50
            // })
        },
        methods: {
            ...mapActions('moduleActivity',['lockConfig','queryMsgConfig','queryStudyConfig','deleteTimerTask']),
            // ...mapActions('moduleTemplate',['queryTemplate']),
            queryStudy(){
                this.queryStudyConfig(this.activityCurId).then(res => {
                    // console.log(res)
                    let data = res.data.data;
                    let arr = [];
                    data.forEach((e,i) => {
                        arr.push({
                            timeTask: e[0]._id,
                            timeMsg: e[1]._id
                        })
                    })
                    arr.push({
                        timeTask: '',
                        timeMsg: '',
                    })
                    this.timeList = arr;
                    // console.log(this.timeList)
                    this.spin = false;

                });

            },
            timeSubmit(timeTask, timeMsg){
                if(timeTask && timeMsg){
                    let datas = {
                        _id: this.activityCurId,
                        timer_task_id: timeTask,
                        time_message_body_id: timeMsg
                    }
                    this.lockConfig(datas).then(res => {
                        if(res.data.code == 0){
                            this.$Message.success('日常学习提醒通知配置成功 ^_^');
                            this.timeList.push({
                                timeTask: '',
                                timeMsg: '',
                            })
                    console.log(this.timeList)
                        }
                    })
                }else{
                    this.$Message.error('日常学习提醒通知填写不全！');

                }
            },
            deleteTimeTask(index, timeTask, timeMsg){
                this.curIndex = index;
                this.curTimeTask = timeTask;
                this.curTimeMsg = timeMsg;
                this.modal1 = true;
            },
            deleteTimeTaskOk(){
                let datas = {
                    _id : this.activityCurId,
                    timer_id: this.curTimeTask,
                    message_body_id: this.curTimeMsg
                }

                this.deleteTimerTask(datas).then(res => {
                    let data = res.data;
                    if(data.code == 0 ){
                        this.timeList.splice(this.curIndex, 1);
                        this.$Message.success('删除成功！')
                    }else{
                        this.$Message.error(data.msg);
                        
                    }
                })
            },
            toBack(){
                this.$router.push({ name: 'activity'});
            }

          
        },
        components: {
            vEditNotice, vEditTask
        },
        computed: {
            ...mapState('moduleActivity',['activityType','activityCurId']),
            ...mapState('moduleTemplate',['templateList']),

        },
        watch: {
            
        }

    }
</script>
