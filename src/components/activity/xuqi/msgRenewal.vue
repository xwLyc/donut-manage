<template>
    <div class="msgRenewal pos_r">
        <div style="background:#eee;padding: 20px">
            <Card :bordered="false">
                <Row type="flex" justify="center" class="code-row-bg">
                    <Col span="4" class="textA">扫码续期成功通知：</Col>
                    <Col span="12">
                        <v-edit-notice :templateList="templateList" :msgId.sync="xqSuccessMsg1"></v-edit-notice>
                    </Col>
                    <Col span="4" class=""></Col>
                </Row>
                <Row type="flex" justify="center" class="code-row-bg">
                    <Col span="4" class="textA">外教课续期成功通知：</Col>
                    <Col span="12">
                        <v-edit-notice :templateList="templateList" :msgId.sync="xqSuccessMsg2"></v-edit-notice>
                    </Col>
                    <Col span="4" class=""></Col>
                </Row>
                <Row type="flex" justify="center" class="code-row-bg" style="margin: 30px 50px;">
                    <Button type="primary" size="large" style="width: 200px;margin-right: 10px;" @click="overdueSubmit()">续期成功提交</Button>
                    <Button type="ghost" size="large" style="width: 200px;" @click="toBack">返回</Button>
                </Row>
            </Card>
        </div>


        <div style="background:#eee;padding: 20px;margin-top: 2px;">
            <Card :bordered="false">
                <template v-for="(item, index) in timeList">
                    <Row type="flex" justify="center" class="code-row-bg" :key="index">
                        <Col span="4" class="textA" style="line-height: 106px;">到期提醒通知：</Col>
                        <Col span="12" type="flex" justify="left" class="code-row-bg">
                            <v-edit-day :dayType="activityType" :activityCurId="activityCurId" :dayId.sync="item.timeDay"></v-edit-day>

                        </Col>
                        <Col span="4" class="">
                            <Button type="error"  @click="deleteTimeTask(index, item.timeDay, item.timeMsg)" style="margin:34px 20px" v-show="index < timeList.length-1">删除</Button>
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
                    <Button type="primary" size="large" icon="plus-round" style="width: 200px;margin-right: 10px;" @click="timeSubmit(timeList[timeList.length-1].timeDay, timeList[timeList.length-1].timeMsg)">保存并新增</Button>
                    <Button type="ghost" size="large" style="width: 200px;" @click="toBack">返回</Button>
                </Row>
            </Card>
        </div>

        <Spin fix size="large" v-show="spin"></Spin>

 
        <!-- 模态框  -->
        <Modal v-model="modal1" title="确定要删除此条通知么" @on-ok="deleteTimeTaskOk">
            <p>删除后数据不可恢复！</p>
        </Modal>
       
    </div>
</template>
<script>
    import vEditNotice from '../editNotice'
    import vEditDay from '../editDay'
    import { mapState, mapActions } from 'vuex'
    export default {
        data () {
            return {
                modal1: false,
                spin:true,
                curIndex: 0,
                curTimeDay: '',
                curTimeMsg: '',
                xqSuccessMsg1: '',
                xqSuccessMsg2: '',
                timeList: [            //续期配置
                    {
                        timeDay: '',
                        timeMsg: '',
                    }
                ]
            }
        },
        mounted(){
            if(!this.activityCurId){
                this.toBack();
            }else{
                // 续期课程类
                if(!this.activityType){
                    this.queryRenuwalConfig(this.activityCurId).then(res => {
                        console.log(res)
                        let data = res.data.data;
                        if(Object.keys(data.continueSuccess).length>0 && data.continueTask.length>0){
                            this.xqSuccessMsg1 = data.continueSuccess.scan._id;
                            this.xqSuccessMsg2 = data.continueSuccess.get_course._id;
                            let arr = [];
                            data.continueTask.forEach((e,i) => {
                                arr.push({
                                    timeDay: e[0]._id,
                                    timeMsg: e[1]._id
                                })
                            })
                            arr.push({
                                timeDay: '',
                                timeMsg: '',
                            })
                            this.timeList = arr;
                        }
                        this.spin = false;
    
                    });

                }
            }
        },
        methods: {
            ...mapActions('moduleActivity',['queryRenuwalConfig','deleteRenuwalTask','lockConfig']),
            timeSubmit(timeDay, timeMsg){
                if(timeDay && timeMsg){
                    let datas = {
                        _id: this.activityCurId,
                        continue_task_distance_day: timeDay,
                        continue_task_message: timeMsg
                    }
                    this.lockConfig(datas).then(res => {
                        if(res.data.code == 0){
                            this.$Message.success('到期提醒通知配置成功 ^_^');
                            this.timeList.push({
                                timeDay: '',
                                timeMsg: '',
                            })
                        }
                    })
                }else{
                    this.$Message.error('到期提醒通知填写不全！');
                }
            },
            deleteTimeTask(index){
                this.modal1 = true;
            },
            deleteTimeTask(index, timeDay, timeMsg){
                this.curIndex = index;
                this.curTimeDay = timeDay;
                this.curTimeMsg = timeMsg;
                this.modal1 = true;
            },
            deleteTimeTaskOk(){
                let datas = {
                    _id : this.activityCurId,
                    distance_day: this.curTimeDay,
                    message_body: this.curTimeMsg
                }

                this.deleteRenuwalTask(datas).then(res => {
                    let data = res.data;
                    if(data.code == 0 ){
                        this.timeList.splice(this.curIndex, 1);
                        this.$Message.success('删除成功！')
                    }else{
                        this.$Message.error(data.msg);
                        
                    }
                })
            },
            overdueSubmit(){
                if(!this.xqSuccessMsg1 || !this.xqSuccessMsg2){
                    this.$Message.error('续期通知填写不全！');
                }else{
                    let datas = {
                        _id: this.activityCurId,
                        continue_scan_message: this.xqSuccessMsg1,
                        continue_get_course_message: this.xqSuccessMsg2
                    }
                    this.lockConfig(datas).then(res => {
                        if(res.data.code == 0){
                            this.$Message.success('续期通知配置成功 ^_^');
                        }
                    })
                }
            },
            toBack(){
                this.$router.push({ name: 'activity'});
            }

          
        },
        components: {
            vEditNotice, vEditDay
        },
        computed: {
            ...mapState('moduleActivity',['activityType','activityCurId']),
            ...mapState('moduleTemplate',['templateList']),

        },
        watch: {
            
        }

    }
</script>
<style lang="scss" scoped>
    .textA{
        font-size: 12px;
        
    }
</style>
