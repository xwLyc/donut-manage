<template>
    <Card :bordered="true" class="editDay">
        <Form ref="formValidate" :model="formItem" :rules="ruleValidate">
            <Row v-if="dayType != '1'">
                <Col span="3" class="lh">到期前</Col>
                <Col span="8">
                    <FormItem  prop="dayNum">
                        <Input v-model="formItem.dayNum" placeholder="请输入到期前天数" :disabled="formDisabled"></Input>
                    </FormItem>
                </Col>
                <Col span="3" offset="1" class="lh">天</Col>
                <Col span="8" >
                    <Button type="primary" @click="saveTask('formValidate')" v-text="formDisabled?'编辑':'保存'"></Button>
                    <Button type="ghost" @click="handleCancel()" v-show="dayId && !formDisabled" style="margin-left: 8px">取消</Button>
                </Col>
            </Row>
            
        </Form>
    </Card>
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
    props: ['dayType', 'dayId', 'activityCurId'],
    data(){
        return {
            formDisabled: false,
            formItem: {
                dayNum: '',
            },
            ruleValidate: {
                dayNum: [
                    { validator: (rule, value, callback) => {
                            if (!value) {
                                return callback(new Error('请输入到期前天数'));
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
        if(this.dayId){
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
                dayNum: '',
            }
        },
        saveTask(name){
            // console.log(this.formItem)

            if(this.formDisabled){
                this.formDisabled = false;
            }else{
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        let datas = {}
                        datas.segment_id = this.activityCurId;
                        datas.type = this.dayType;
                        datas.distance_day = this.formItem.dayNum.trim();
                        
                        if(this.dayId){    //编辑状态
                            datas._id = this.dayId;
                        }
                        this.createTask(datas).then(res => {
                            console.log(res)
                            let dayId = res.data._id;
                            this.$emit('update:dayId', dayId);
                            this.formDisabled = true;
    
                        })
                    }
                })
            }
        },
        handleCancel () {
            this.queryTaskInfo();
            this.formDisabled = true;            
        },
        queryTaskInfo(){
            this.queryTimerTask(this.dayId).then(res => {
                console.log(res.data)
                let data = res.data.data;
                if(!this.dayType){  //续期类
                    this.formItem.dayNum = data.distance_day;
                }
            })
        }

    },
    computed: {
        // ...mapState('moduleActivity',['activityType','activityCurId']),

    },
    watch: {
        dayId(val, oldVal){
            if(val){
                this.queryTaskInfo();
                this.formDisabled = true;
            }else{
                this.initFormItem();        
            }
        }
    }
}
</script>
<style lang="scss" scoped>
    .lh{
        line-height: 32px;
        font-size: 12px;
    }
</style>

