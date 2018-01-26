<template>
    <div class="editNotice">
        <Card :bordered="true">
            <Form ref="formValidate" :model="formItem" :rules="ruleValidate">
                <Row>
                    <Col span="19">
                        <FormItem prop="tplList">
                            <Select v-model="formItem.tplList" :disabled="formDisabled">
                                <Option v-for="item in templateList" :value="item._id" :key="item._id">{{ item.title }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <!-- <Col span="4" style="float:right;">
                        <ColorPicker v-model="formItem.tplListColor" />
                    </Col> -->
                </Row>
                <Row>
                    <Col span="19">
                        <FormItem  prop="first">
                            <Input v-model="formItem.first" placeholder="{ { first.DATA } }" :disabled="formDisabled"></Input>
                        </FormItem>
                    </Col>
                    <Col span="4" style="float:right;" v-show="!formDisabled">
                        <ColorPicker v-model="formItem.firstColor" disabled recommend/>
                    </Col>
                </Row>
                <Row v-for="(item, index) in formItem.keyword" :key="index">
                    <Col span="19">
                        <FormItem
                            :prop="'keyword.' + index + '.value'"
                            :rules="{required: true, message: 'keyword'+(index+1) +' 不能为空', trigger: 'blur'}">                
                            <Input v-model="item.value" :placeholder="'{ { keyword'+(index+1)+'.DATA } }'" :disabled="formDisabled">
                                <span slot="prepend" v-text="item['keyword'+(index+1)]+'：'"></span>
                            </Input>
                        </FormItem>
                    </Col>
                    <Col span="4" style="float:right;" v-show="!formDisabled">
                        <ColorPicker v-model="item['keyword'+(index+1)+'_color']" recommend/>
                    </Col>
                </Row>
   
                <Row>
                    <Col span="19">
                        <FormItem prop="remark">
                            <Input v-model="formItem.remark" placeholder="{ { remark.DATA } }" :disabled="formDisabled"></Input>
                        </FormItem>
                    </Col>
                    <Col span="4" style="float:right;" v-show="!formDisabled">
                        <ColorPicker v-model="formItem.remarkColor" recommend />
                    </Col>
                </Row>
                <Row>
                    <Col span="19">
                        <FormItem prop="url">
                            <Input v-model="formItem.url" placeholder="请输入链接地址" :disabled="formDisabled">
                                <span slot="prepend" v-text="'链接：'"></span>
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('formValidate')" v-text="formDisabled?'编辑':'保存'"></Button>
                    <Button type="ghost" @click="handleCancel()" v-show="msgId && !formDisabled" style="margin-left: 8px">取消</Button>
                </FormItem>

                    
                    
            </Form>
        </Card>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
    props: ['templateList','msgId'],
    data(){
        return {
            // model: '',
            formDisabled: false,
            formItem: {
                tplList:'',
                first: '',
                firstColor: '',
                remark: '',  
                remarkColor: '',
                url: '',
                keyword: [
                    {
                        keyword1: 'keyword1',
                        keyword1_color: '',
                        value: ''
                    },
                    {
                        keyword2: 'keyword2',
                        keyword2_color: '',
                        value: ''                        
                    }
                ],            
            },
            ruleValidate: {
                tplList: [
                    { required: true, message: '请选择你的消息模板', trigger: 'change' }
                ],
                first: [
                    { required: false, message: 'first.DATA 不能为空', trigger: 'blur' }
                ],
                remark: [
                    { required: false, message: 'remark.DATA 不能为空', trigger: 'blur' }
                ],
            } 
        }
    },
    mounted(){
        if(this.msgId){
            this.formDisabled = true;
            this.queryMsgInfo();
        }else{
            this.formDisabled = false;            
        }
    },
    methods: {
        ...mapActions('moduleTemplate', ['queryOneTemplate','']),
        ...mapActions('moduleActivity', ['createMsgBody','queryMsgBody']),
        initFormItem(){
            this.formDisabled = false;
            this.formItem = {
                tplList:'',
                first: '',
                firstColor: '',
                remark: '',  
                remarkColor: '',
                url: '',
                keyword: [
                    {
                        keyword1: 'keyword1',
                        keyword1_color: '',
                        value: ''
                    },
                    {
                        keyword2: 'keyword2',
                        keyword2_color: '',
                        value: ''                        
                    }
                ],            
            }
        },
        handleSubmit(name){
            if(this.formDisabled){
                this.formDisabled = false;
            }else{
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        // console.log(this.formItem)
                        let datas = {
                            _id: this.msgId,
                            template: this.formItem.tplList,
                            first: this.formItem.first,
                            first_color: this.formItem.firstColor,
                            remark: this.formItem.remark,
                            remark_color: this.formItem.remarkColor,
                            url: this.formItem.url,
                        }
                        this.formItem.keyword.forEach((e, i) => {
                            datas['keyword'+(i+1)] = e.value;
                            datas['keyword'+(i+1)+'_color'] = e['keyword'+(i+1)+'_color'];
    
                        })
                        // console.log(datas)
                        this.createMsgBody(datas).then(res => {
                            let msgId = res.data._id;
                            this.$emit('update:msgId', msgId);
                            this.formDisabled = true;
    
                        })
                        
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })

            }
        },
        handleCancel () {
            this.formDisabled = true;            
            this.queryMsgInfo();

        },
        queryTmpList(){
            this.queryOneTemplate(this.tplList).then(res => {
                    // console.log(res)
                    this.formItem.keyword = [];
                    let key = res.data.data.keyword;
                    key.forEach((e, i) => {
                        let temp = e;
                        temp['keyword'+(i+1)+'_color'] = '';
                        temp['value'] = '';
                        this.formItem.keyword.push(temp);
                    });
                    this.formItem.first = '';
                    this.formItem.firstColor = '';
                    this.formItem.remark = '';
                    this.formItem.remarkColor = '';
                    this.formItem.url = '';
                    // console.log(this.formItem.keyword)
            })
        },
        // 根据msgId 查询消息
        queryMsgInfo(){
            this.queryMsgBody(this.msgId).then(data => {
                console.log(data)
                let formItem = {};
                formItem.tplList = data.template._id;
                formItem.firstColor = '';
                formItem.remarkColor = '';
                if(data.first){
                    formItem.first = data.first.value ? data.first.value : '';
                    formItem.firstColor = data.first.color ? data.first.color : '';
                }
                if(data.remark){
                    formItem.remark = data.remark.value ? data.remark.value : '';
                    formItem.remarkColor = data.remark.color ? data.remark.color : '';
                }
                formItem.keyword = [];
                data.keyword.forEach((e, i) => {
                    let tmp = {};
                    tmp['value'] = e.value;
                    tmp['keyword'+(i+1)+'_color'] = e.color;
                    formItem.keyword.push(tmp)
                })
                formItem.url = data.url ? data.url : '';
                console.log(formItem)
                return formItem;
            }).then(formItem => {
                this.queryOneTemplate(formItem.tplList).then(res => {
                    let key = res.data.data.keyword;
                    key.forEach((e, i) => {
                        formItem.keyword[i]['keyword'+(i+1)] = e['keyword'+(i+1)] ;
                    });
                    this.formItem = formItem;
                    console.log(this.formItem)
                })
            })
        }

    },
    computed: {
        tplList(){
            return this.formItem.tplList
        }
    },
    watch: {
        // 选择消息模板时，更新当前数据
        tplList(val, oldVal){
            // msgId 不存在 或者 编辑状态时，才可以监听选择模板id变化, oldVal=='' 是不存在tplid的情况（区分删除组件）
            if((!this.msgId || !this.formDisabled)&& oldVal=='' || val && oldVal && !this.formDisabled){
                this.queryTmpList();
            }
            
        },
        msgId(val, oldVal){
            if(val){
                this.formDisabled = true;
                this.queryMsgInfo();
            }else{
                this.initFormItem();

            }
        }
    }
}
</script>
<style lang="scss" scoped>
    .editNotice{
        // margin-top: 14px;
    }
    .ivu-form-item{
        // margin-bottom: 14px;
    }
</style>


