<template>
    <div class="msgUnlock pos_r">
        <Row type="flex" justify="center" class="code-row-bg">
            <Col span="4" class="textA">解锁进度通知：</Col>
            <Col span="12">
                <v-edit-notice :templateList="templateList" :msgId.sync="progressMsg"></v-edit-notice>
            </Col>
            <Col span="4" class=""></Col>
        </Row>
        <Row type="flex" justify="center" class="code-row-bg">
            <Col span="4" class="textA">解锁成功通知：</Col>
            <Col span="12">
                <v-edit-notice :templateList="templateList" :msgId.sync="successMsg"></v-edit-notice>
            </Col>
            <Col span="4" class=""></Col>
        </Row>

        <Row type="flex" justify="center" class="code-row-bg" style="margin: 30px 50px;">
            <Button type="primary" size="large" style="width: 200px;margin-right: 10px;" @click="msgSubmit(progressMsg, successMsg)">提交</Button>
            <Button type="ghost" size="large" style="width: 200px;" @click="toBack">返回</Button>
        </Row>
    
        <Spin fix size="large" v-show="spin"></Spin>
     
    </div>
</template>
<script>
    import vEditNotice from '../editNotice'

    import { mapState, mapActions } from 'vuex'
    export default {
        data () {
            return {
                spin:true,
                progressMsg: '',
                successMsg: '',
            }
        },
        mounted(){
            if(!this.activityCurId){
                this.toBack();
            }else{
                // 普通裂变类
                if(this.activityType){
                    // 查询消息配置
                    this.queryMsgConfig(this.activityCurId).then(res => {
                        // console.log(res)
                        let data = res.data.data;
                        if(data.enterProgress){
                            this.progressMsg = data.enterProgress._id;
                        }
                        if(data.enterSuccess){
                            this.successMsg = data.enterSuccess._id;
                        }
                        this.spin = false;
                    });
                }else{
                    alert('非普通裂变类')
                }
            }
            // this.queryTemplate({
            //     pageCount: 50
            // })
        },
        methods: {
            ...mapActions('moduleActivity',['lockConfig','queryMsgConfig']),
            // ...mapActions('moduleTemplate',['queryTemplate']),
            msgSubmit(progressMsg, successMsg){
                if(progressMsg && successMsg){
                    let datas = {
                        _id: this.activityCurId,
                        progress_msg_id: progressMsg,
                        success_msg_id: successMsg
                    }
                    this.lockConfig(datas).then(res => {
                        if(res.data.code == 0){
                            this.$Message.success('解锁通知配置成功 ^_^');
                        }
                    })
                }else{
                    this.$Message.error('解锁通知填写不全！');

                }
            },
            toBack(){
                this.$router.push({ name: 'activity'});
            }

          
        },
        components: {
            vEditNotice, 
        },
        computed: {
            ...mapState('moduleActivity',['activityType','activityCurId']),
            ...mapState('moduleTemplate',['templateList']),

        },
        watch: {
            
        }

    }
</script>
