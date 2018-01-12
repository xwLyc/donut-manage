<template>
    <div class="lockConfig">
        <div class="layout-breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem href="/activity">活动管理</BreadcrumbItem>
                <BreadcrumbItem href="/activity/lockConfig">解锁配置</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="layout-content">
            <div class="layout-content-main" style="position:relative;">
                <h1 class="tac top">解锁配置 - {{activityType ? '普通裂变类':'续期课程类'}}</h1>
                <Form ref="formValidate" :model="lockConfigInfo" :rules="ruleValidate" :label-width="150" style="width: 600px;margin: 0 auto;">
                    <FormItem label="扫码解锁人数" prop="people">
                        <Input v-model="lockConfigInfo.people" placeholder="请输入扫码解锁人数" :disabled="formDisabled"></Input>
                    </FormItem>
                    <template v-if="!activityType">
                        <FormItem label="初始解锁天数" prop="initDays">
                            <Input v-model="lockConfigInfo.initDays"  placeholder="请输入初始解锁天数"  :disabled="formDisabled"></Input>
                        </FormItem>
                        <FormItem label="扫码续期天数/人次" prop="scavenging">
                            <Input v-model="lockConfigInfo.scavenging" placeholder="请输入扫码续期天数/人次" :disabled="formDisabled"></Input>
                        </FormItem>
                        <FormItem label="领课续期天数" prop="renewal">
                            <Input v-model="lockConfigInfo.renewal"  placeholder="请输入领课续期天数"  :disabled="formDisabled"></Input>
                        </FormItem>
                    </template>

                    <FormItem>
                        <Button type="primary" @click="handleSubmit('formValidate')" v-text="formDisabled? '编辑':'提交'"></Button>
                        <Button type="ghost" @click="handleBack" style="margin-left: 8px" v-text="lockConfigInfo.people ? formDisabled? '返回':'取消' : '返回'"></Button>
                    </FormItem>
                </Form>
                <Spin fix size="large" v-show="spin"></Spin>

            </div>
        </div>

       
    </div>
</template>
<script>
    import vSource from '../resources'
    import { mapState, mapActions } from 'vuex'
    export default {
        data () {
            return {
                spin:true,
                formDisabled: false,
                unLockId: '',
                lockConfigInfo: {                               //活动信息
                    people: '',
                    initDays: '',
                    scavenging: '',
                    renewal: '',
                },
                ruleValidate: {
                    people: [
                        { validator: (rule, value, callback) => {
                                if (!value) {
                                    return callback(new Error('请输入扫码解锁人数'));
                                }else if(!Number(value)){
                                    return callback(new Error('请输入数字格式！'));
                                }else{
                                    callback();
                                }
                            }, trigger: 'blur' }
                    ],
                    initDays: [
                        { validator: (rule, value, callback) => {
                                if (!value) {
                                    return callback(new Error('请输入初始解锁天数'));
                                }else if(!Number(value)){
                                    return callback(new Error('请输入数字格式！'));
                                }else{
                                    callback();
                                }
                            }, trigger: 'blur' }
                    ],
                    scavenging: [
                        { validator: (rule, value, callback) => {
                                if (!value) {
                                    return callback(new Error('请输入扫码续期天数/人次'));
                                }else if(!Number(value)){
                                    return callback(new Error('请输入数字格式！'));
                                }else{
                                    callback();
                                }
                            }, trigger: 'blur' }
                    ],
                    renewal: [
                        { validator: (rule, value, callback) => {
                                if (!value) {
                                    return callback(new Error('请输入领课续期天数'));
                                }else if(!Number(value)){
                                    return callback(new Error('请输入数字格式！'));
                                }else{
                                    callback();
                                }
                            }, trigger: 'blur' }
                    ],
                }
            }
        },
        mounted(){
            if(!this.activityCurId){
                this.toBack();
            }else{
                this.queryUnlockConfig(this.activityCurId).then(res => {
                    console.log(res.data)
                    let data = res.data.data;
                    if(data.startPeople){
                        // this.unLockId = data._id;
                        this.lockConfigInfo.people = data.startPeople;
                        if(!this.activityType){
                            this.lockConfigInfo.initDays = data.startDay;
                            this.lockConfigInfo.scavenging = data.moreDay;
                            this.lockConfigInfo.renewal = data.courseDay;
                        }
                        this.formDisabled = true;
                    }
                })
                this.spin = false;
            }

        },
        methods: {
            ...mapActions('moduleActivity',['lockConfig','queryUnlockConfig']),


            handleSubmit (name) {
                if(this.formDisabled){
                    this.formDisabled = false;
                }else{

                    this.$refs[name].validate((valid) => {
                        if (valid) {   
                            let datas = {};
                            datas._id = this.activityCurId;
                            datas.startPeople = this.lockConfigInfo.people;
                            if(!this.activityType){
                                datas.startDay = this.lockConfigInfo.initDays;
                                datas.moreDay =this.lockConfigInfo.scavenging;
                                datas.courseDay = this.lockConfigInfo.renewal;  
                            }
                            this.lockConfig(datas).then(res => {
                                console.log(res)
                                if(res.data.code == 0){
                                    this.$Message.success('创建成功!');
                                    this.formDisabled = true;
                                    // this.$router.push({path:'/activity'});
                                }else{
                                    alert(res.data.msg)
                                }
                            });
    
                        } else {
                            this.$Message.error('表单验证失败!');
                        }
                    })
                }
            },
            handleBack(){
                if(!this.formDisabled && this.lockConfigInfo.people){
                    this.formDisabled = true;
                }else{
                    this.$router.push({path:'/activity'});
                }
            },
            toBack(){
                this.$router.push({ name: 'activity'});
            }
          
        },
        components: {
            vSource
        },
        computed: {
            ...mapState('moduleActivity',['activityType','activityCurId']),

        },
        watch: {

        }

    }
</script>
<style lang="scss" scoped>
    .top{
        margin: 20px 0px;
    }
    .ivu-modal-wrap{
        &.modal1{
            z-index: 999;
        }
    } 

    
    
</style>
