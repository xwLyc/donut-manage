<template>
    <div class="">
        <div class="layout-breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem href="/collection">集合页信息</BreadcrumbItem>
                <BreadcrumbItem href="#">{{collectionEdit?'编辑集合页信息':'新建集合页信息'}}</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="layout-content">
            <div class="layout-content-main">
                <h1 class="tac top">集合页信息</h1>
                <Form  ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="135" style="width: 600px;margin: 0 auto;">
                    <FormItem label="课程包前台展示名称" prop="name">
                        <Input v-model="formValidate.name" placeholder="请输入，不超过20字"></Input>
                    </FormItem>

                    <FormItem label="课节" prop="section">
                        <Input v-model="formValidate.section" placeholder="请输入，不超过20字"></Input>
                    </FormItem>

                    <FormItem class="small" label="课程类型" prop="type1">
                        <Input v-model="formValidate.type1" placeholder="请输入，不超过5字"></Input>
                    </FormItem>
                    <FormItem class="small" label="" prop="type2">
                        <Input v-model="formValidate.type2" placeholder="请输入，不超过5字"></Input>
                    </FormItem>
                    <FormItem class="small" label="" prop="type3">
                        <Input v-model="formValidate.type3" placeholder="请输入，不超过5字"></Input>
                    </FormItem>

                    <FormItem class="small" label="已学习人数" prop="number">
                        <Input v-model="formValidate.number" placeholder="请输入数字"></Input>
                        <div style="display: inline-block; margin-left: 8px;">倍</div>
                    </FormItem>

                    <FormItem label="报名文章" prop="article">
                        <Input v-model="formValidate.article" placeholder="请输入链接地址"></Input>
                    </FormItem>

                    <FormItem label="课程入口" prop="entry">
                        <Input v-model="formValidate.entry" placeholder="请输入链接地址"></Input>
                    </FormItem>

                    <FormItem label="标签" prop="tag">
                        <RadioGroup v-model="formValidate.tag">
                            <Radio label="热门"></Radio>
                            <Radio label="最新"></Radio>
                        </RadioGroup>
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
                spin: false,
                formValidate: {

                },
                ruleValidate: {
                    name: [
                        { required: true, message: '课程名称不能为空', trigger: 'blur' },
                        { type: 'string', max: 20, message: '课程名称不能超过20个字', trigger: 'blur' }
                    ],
                    section: [
                        { required: true, message: '课节不能为空', trigger: 'blur' },
                        { type: 'string', max: 20, message: '课节不能超过20个字', trigger: 'blur' }
                    ],
                    type1: [
                        { type: 'string', max: 5, message: '课程类型不能超过5个字', trigger: 'blur' }
                    ],
                    type2: [
                        { type: 'string', max: 5, message: '课程类型不能超过5个字', trigger: 'blur' }
                    ],
                    type3: [
                        { type: 'string', max: 5, message: '课程类型不能超过5个字', trigger: 'blur' }
                    ],
                    number: [
                        { type: 'string', max: 15, message: '已学习人数不能超过15位数', trigger: 'blur' }
                    ],
                    article: [
                        { required: true, message: '报名文章不能为空', trigger: 'blur' },
                    ],
                    entry: [
                        { required: true, message: '课程入口不能为空', trigger: 'blur' },
                    ],
                }
            }
        },

        mounted(){
            // 编辑状态
            if(this.collectionEdit){
                // this.spin = true;
                this.queryOneCollection(this.editCollectionId).then(res => {
                    console.log(res)
                    let data = res.data.data;
                    this.formValidate.name = data.name;
                    this.formValidate.section = data.section;
                    this.formValidate.type1 = data.type1;
                    this.formValidate.type2 = data.type2;
                    this.formValidate.type3 = data.type3;

                    // this.formValidate.items = [];
                    // data.keyword.forEach((e, i)=>{
                    //     let temp = {};
                    //     temp.value = e['keyword'+(i+1)];
                    //     this.formValidate.items.push(temp);
                    // })

                    this.formValidate.section = data.number;
                    this.formValidate.name = data.article;
                    this.formValidate.section = data.entry;
                    this.formValidate.section = data.tag;
                    
                    this.spin = false;
                })
            }else{
                this.spin = false;
            }
        },

        methods: {
            ...mapActions('moduleCollection', ['createCollection','queryOneCollection']),

            handleSubmit(name){
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        if(this.collectionEdit){
                            this.formValidate._id = this.editCollectionId;
                        }

                        // 新建集合
                        this.createCollection(this.formValidate).then((res)=>{
                            if(res.data.code == 0){
                                this.$Message.success(res.data.msg);
                                this.$router.push({ name: 'collection'});
                                
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
                this.$router.push({name: 'collection'})
            }
        },

        computed: {
            ...mapState('moduleCollection',['collectionEdit','editCollectionId']),
        

        },
    }
</script>

<style lang="scss" scoped>
    .top{
        margin: 20px 0px;
    }
    .small .ivu-input-wrapper {
        width: 50%;
    }
    .ivu-modal-wrap{
        &.modal1{
            z-index: 999;
        }
    } 
</style>
