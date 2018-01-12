<template>
    <div class="msgStudy pos_r">

        <template v-for="(item, index) in timeList">

            <Row type="flex" justify="center" class="code-row-bg" :key="index">
                <Col span="4" class="textA">日常提醒通知：</Col>
                <Col span="12">
                    <v-edit-task :taskType="activityType" :activityCurId="activityCurId" :taskId.sync="item.timeTask"></v-edit-task>
                </Col>
                <Col span="4" class=""></Col>
                
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
            <Button type="primary" size="large" style="width: 200px;margin-right: 10px;" @click="timeSubmit(timeList[timeList.length-1].timeTask, timeList[timeList.length-1].timeMsg)">保存</Button>
            <Button type="ghost" size="large" style="width: 200px;" @click="toBack">返回</Button>
        </Row>

        <Spin fix size="large" v-show="spin"></Spin>

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
                timeList: [            
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
                // 续期课程类类
                if(!this.activityType){
                    // 续期课程类学习配置
                    this.queryStudyConfig(this.activityCurId).then(res => {
                        console.log(res)
                        let data = res.data.data;
                        if(data.timer_task && data.message_body){
                            this.timeList[0].timeTask =data.timer_task._id;
                            this.timeList[0].timeMsg =data.message_body._id;
                        }
                        this.spin = false;
    
                    });

                }else{

                }
            }
            // this.queryTemplate({
            //     pageCount: 50
            // })
        },
        methods: {
            ...mapActions('moduleActivity',['lockConfig','queryStudyConfig','']),
            // ...mapActions('moduleTemplate',['queryTemplate']),
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
                            
                        }
                    })
                }else{
                    this.$Message.error('日常学习提醒通知填写不全！');

                }
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
