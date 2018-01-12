<template>
    <div class="editLesson">
        <div class="layout-breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem href="/template">消息模板管理</BreadcrumbItem>
                <BreadcrumbItem href="#">{{templateEdit?'编辑消息模板':'新建消息模板'}}</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="layout-content">
            <div class="layout-content-main" style="position:relative;">
                <h1 class="tac top">消息模板信息</h1>
                <Form ref="formValidate" :model="formValidate" :label-width="100" style="width: 600px;margin: 0 auto;">
                    <FormItem label="id" prop="wx_id" :rules="{required: true, message: '消息模板id不能为空', trigger: 'blur'}">
                        <Input v-model="formValidate.wx_id" placeholder="请输入消息模板id"></Input>
                    </FormItem>
                    <FormItem label="标题" prop="title" :rules="{required: true, message: '消息模板标题不能为空', trigger: 'blur'}">
                        <Input v-model="formValidate.title" placeholder="请输入消息模板标题"></Input>
                    </FormItem>

                    <FormItem label="内容" prop="title">
                        <!-- <Input v-model="formValidate.title" placeholder="请输入消息模板标题"></Input> -->
                        <p class="msgDefault">{ { first.DATA } }</p>
                    </FormItem>
                    <FormItem
                        label=" "
                        v-for="(item, index) in formValidate.items"
                        :key="index"
                        :prop="'items.' + index + '.value'"
                        :rules="{required: true, message: ' keyword' + (index+1) +'不能为空', trigger: 'blur'}">
                        <Row>
                            <Col span="18">
                                <Input type="text" class="inpRnoBorder" v-model="item.value" placeholder="请填写关键字">
                                    <span slot="append" style="width: 150px" v-text="'{ { keyword'+(index+1)+'.DATA } }'">  </span>
                                </Input>
                            </Col>
                            <Col span="2" offset="1" v-if="index > 1">
                                <Button type="ghost" @click="handleRemove(index)">Delete</Button>
                            </Col>

                        </Row>
                    </FormItem>

                    <FormItem v-if="formValidate.items.length < 5">
                        <Row>
                            <Col span="12">
                                <Button type="dashed" long @click="handleAdd" icon="plus-round">Add keyword</Button>
                            </Col>
                        </Row>
                    </FormItem>

                    <FormItem>
                        <Row>
                                <p class="msgDefault">{ { remark.DATA } }</p>
                        </Row>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                        <Button type="ghost" @click="handleToBack()" style="margin-left: 8px">取消</Button>
                    </FormItem>
                </Form>



                <Spin fix size="large" v-show="spin"></Spin>

            </div>
        </div>

    
    </div>
</template>
<script>
    import { mapState, mapActions } from 'vuex'
    export default {
        data () {
            return {
                modal1: false,
                spin:true,
                // index: 2,
                formValidate: {
                    wx_id: '',
                    title: '',
                    items: [
                        {
                            value: '',
                        },
                        {
                            value: '',
                        }
                    ]
                },
               
            }
        },
        mounted(){
            // 编辑状态
            if(this.templateEdit){
                // this.formValidate.wx_id = this.editTemplateId;
                this.queryOneTemplate(this.editTemplateId).then(res => {
                    console.log(res)
                    let data = res.data.data;
                    this.formValidate.wx_id = data.wx_id;
                    this.formValidate.title = data.title;
                    this.formValidate.items = [];
                    data.keyword.forEach((e, i)=>{
                        let temp = {};
                        temp.value = e['keyword'+(i+1)];
                        this.formValidate.items.push(temp);
                    })
                    this.spin = false;
                })
            }else{
                this.spin = false;
            }
        },
        methods: {
            ...mapActions('moduleTemplate', ['createTemplate','queryOneTemplate','']),
            handleAdd () {
                // this.index++;
                let i = this.formValidate.items.length+1;
                this.formValidate.items.push({
                    value: ''
                });
            },
            handleRemove (index) {
                this.formValidate.items.splice(index, 1);
            },
            handleSubmit(name){
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        if(this.templateEdit){
                            this.formValidate._id = this.editTemplateId;
                        }

                        // 新建消息模板
                        this.createTemplate(this.formValidate).then((res)=>{
                            // console.log(res)
                            if(res.data.code == 0){
                                this.$Message.success(res.data.msg);
                                this.$router.push({ name: 'template'});
                                
                            }else{
                                this.$Message.error( res.data.msg);
                            }
                        });
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            },
            handleToBack(){
                this.$router.push({name: 'template'})
            }
        },
        components: {
        
        },
        computed: {
            ...mapState('moduleTemplate',['templateEdit','editTemplateId','editTemplateId']),
        

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

    .msgDefault{
        width: 140px;
        height: 32px;
        background: #eeeeee;
        text-align: center;
        color: #495060;
        border-radius: 4px;
    }

    .inpRnoBorder{
        .ivu-input{
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
        }
    }
    
</style>
