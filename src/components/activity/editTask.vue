<template>
    <Card :bordered="true" class="editTask">
        <Form ref="formValidate" :model="formItem" :rules="ruleValidate">
            <Row v-if="taskType">
                <Col span="4" style="line-height: 32px;font-size: 12px;">
                    推送时间：
                </Col>
                <Col span="10" >
                    <FormItem  prop="taskDate">
                        <DatePicker v-model="formItem.taskDate" type="date" placeholder="Select date" style="width: 90%" :disabled="formDisabled"></DatePicker>
                    </FormItem>
                </Col>
                <Col span="10" >
                    <FormItem  prop="taskTime">
                        <TimePicker v-model="formItem.taskTime" format="HH:mm" placeholder="Select time" style="width: 90%" :disabled="formDisabled"></TimePicker>
                    </FormItem>
                </Col>
            </Row>
            <Row v-else>
                <Col span="4" style="line-height: 32px;font-size: 12px;">
                    推送时间：
                </Col>
                <Col span="10" >
                    <FormItem  prop="dayDate">
                        <Select v-model="formItem.dayDate" style="width: 90%" :disabled="formDisabled">
                            <Option v-for="(item, index) in 7" :value="item" :key="index">{{ '每隔 ' + item +' 天' }}</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="10" >
                    <FormItem  prop="dayTime">
                        <TimePicker v-model="formItem.dayTime" format="HH:mm" placeholder="Select time" style="width: 90%" :disabled="formDisabled"></TimePicker>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="4" style="line-height: 32px;">
                </Col>
                <Col span="10" >
                    <Button type="primary" @click="saveTask('formValidate')" v-text="formDisabled?'编辑定时器':'保存定时器'"></Button>
                    <Button type="ghost" @click="handleCancel()" v-show="taskId && !formDisabled" style="margin-left: 8px">取消</Button>
                </Col>
            </Row>
        </Form>
    </Card>
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
    props: ['taskType', 'taskId', 'activityCurId'],
    data(){
        return {
            formDisabled: false,
            taskTime:'',
            formItem: {
                dayDate: 1,
                dayTime: '',
                taskDate: '',
                taskTime: '',
            },
            ruleValidate: {
                taskDate: [
                    { required: true, type: 'date', message: '请选择你的推送年月日', trigger: 'change' }
                ],
                taskTime: [
                    { required: true, type: 'string', message: '请选择你的推送时分', trigger: 'change' }
                ],
                
                dayTime: [
                    { required: true, type: 'string', message: '请选择你的推送时分', trigger: 'change' }
                ],
            }
        }
    },
    mounted(){
        if(this.taskId){
            this.formDisabled = true;
            this.queryTaskInfo();
        }else{
            this.formDisabled = false;            
        }
    },
    methods: {
        ...mapActions('moduleActivity', ['createTask','queryTimerTask']),
        initFormItem(){
            this.formDisabled= false;
            this.formItem = {
                dayDate: 1,
                dayTime: '',
                taskDate: '',
                taskTime: '',
            }
        },
        formateDate(date){  //年月日
            let year = date.getFullYear();
            let month = date.getMonth()+1;
            let day = date.getDate();
            return  [year,month,day].map(this.formateShow).join('-') 
        },
        formateTime(time){  //分秒
            let hour = time.getHours();
            let minute = time.getMinutes();
            return  [hour,minute].map(this.formateShow).join(':')
        },
        formateShow(n){
            n = n.toString();
            return n[1] ? n : '0' + n;
        },
        saveTask(name){
            // console.log(this.formItem)

            if(this.formDisabled){
                this.formDisabled = false;
            }else{
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        console.log(valid)
                        let datas = {}
                        datas.segment_id = this.activityCurId;
                        datas.type = this.taskType;
                        if(this.taskType){  // 1 普通裂变类 || 2 普通非裂变类
                            console.log(this.formItem.taskDate)
                            console.log(this.formateDate(this.formItem.taskDate))
                            datas.time = this.formateDate(this.formItem.taskDate) + ' ' + this.formItem.taskTime;
                        }else{              // 0 课程续期类
                            datas.interval = this.formItem.dayDate;
                            datas.interval_time = this.formItem.dayTime;
                        }
                        if(this.taskId){    //编辑状态
                            datas._id = this.taskId;
                        }
                        this.createTask(datas).then(res => {
                            console.log(res)
                            let taskId = res.data._id;
                            this.$emit('update:taskId', taskId);
                            this.formDisabled = true;
    
                        })
                    }else{
                        console.log('fail')
                    }
                })
            }
        },
        handleCancel () {
            this.queryTaskInfo();
            this.formDisabled = true;            
        },
        queryTaskInfo(){
            this.queryTimerTask(this.taskId).then(res => {
                console.log(res.data)
                let data = res.data.data;
                if(this.taskType){  //普通裂变类
                    this.formItem.taskDate = data.time.split(' ')[0];
                    this.formItem.taskTime = data.time.split(' ')[1];
                }else{
                    this.formItem.dayDate = data.interval;
                    this.formItem.dayTime = data.interval_time;
                }
            })
        }

    },
    computed: {
        // ...mapState('moduleActivity',['activityType','activityCurId']),

    },
    watch: {
        taskId(val, oldVal){
            if(val){
                this.queryTaskInfo();
                this.formDisabled = true;
            }else{
                this.initFormItem();        
            }
        },
        // "formItem.taskTime"(v){
        //     console.log(v)
        // }
    }
}
</script>

