<template>
    <div class="">
        <div class="layout-breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem href="#">集合页管理</BreadcrumbItem>
                <!-- <BreadcrumbItem href="#">应用中心</BreadcrumbItem>
                    <BreadcrumbItem>某应用</BreadcrumbItem> -->
            </Breadcrumb>
        </div>
        <div class="layout-content">
            <div class="layout-content-main">
                <h1 class="tac top">集合页信息</h1>
                <Form  ref="formValidate" :model="collectInfo" :rules="ruleValidate" :label-width="135" style="width: 600px;margin: 0 auto;">
                    <FormItem label="课程包前台展示名称" prop="name">
                        <Input v-model="collectInfo.name" placeholder="请输入，不超过20字"></Input>
                    </FormItem>

                    <!-- <FormItem label="关联课程" prop="relevance" >
                        <Select class="select1" v-model="collectInfo.relevance">
                            <Option value="0">自然拼读初级2018</Option>
                            <Option value="1">自然拼读中级2018</Option>
                            <Option value="2">自然拼读高级2018</Option>
                        </Select>
                    </FormItem> -->

                    <FormItem label="课节" prop="section">
                        <Input v-model="collectInfo.section" placeholder="请输入，不超过20字"></Input>
                    </FormItem>

                    <FormItem class="small" label="课程类型" prop="type1">
                        <Input v-model="collectInfo.type1" placeholder="请输入，不超过5字"></Input>
                    </FormItem>
                    <FormItem class="small" label="" prop="type2">
                        <Input v-model="collectInfo.type2" placeholder="请输入，不超过5字"></Input>
                    </FormItem>
                    <FormItem class="small" label="" prop="type3">
                        <Input v-model="collectInfo.type3" placeholder="请输入，不超过5字"></Input>
                    </FormItem>

                    <FormItem class="small" label="已学习人数" prop="number">
                        <Input v-model="collectInfo.number" placeholder="请输入数字"></Input>
                        <div style="display: inline-block; margin-left: 8px;">倍</div>
                    </FormItem>

                    <FormItem label="报名文章" prop="article">
                        <Input v-model="collectInfo.article" placeholder="请输入链接地址"></Input>
                    </FormItem>

                    <FormItem label="课程入口" prop="entry">
                        <Input v-model="collectInfo.entry" placeholder="请输入链接地址"></Input>
                    </FormItem>

                    <FormItem label="标签" prop="tag">
                        <RadioGroup v-model="collectInfo.tag">
                            <Radio label="热门"></Radio>
                            <Radio label="最新"></Radio>
                        </RadioGroup>
                    </FormItem>

                    <FormItem>
                        <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                        <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
                    </FormItem>
                </Form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                collectInfo: {

                },
                ruleValidate: {
                    name: [
                        { required: true, message: '课程名称不能为空', trigger: 'blur' },
                        { type: 'string', max: 20, message: '课程名称不能超过20个字', trigger: 'blur' }
                    ],
                    // relevance: [
                    //     { required: true, message: '请选择您的关联课程', trigger: 'change' }
                    // ],
                    section: [
                        { required: true, message: '课节不能为空', trigger: 'blur' },
                        { type: 'string', max: 20, message: '课节不能超过20个字', trigger: 'blur' }
                    ],
                    type1: [
                        // { required: true, message: '课程类型不能为空', trigger: 'blur' },
                        { type: 'string', max: 5, message: '课程类型不能超过5个字', trigger: 'blur' }
                    ],
                    type2: [
                        { type: 'string', max: 5, message: '课程类型不能超过5个字', trigger: 'blur' }
                    ],
                    type3: [
                        { type: 'string', max: 5, message: '课程类型不能超过5个字', trigger: 'blur' }
                    ],
                    number: [
                        // { required: true, message: '已学习人数不能为空', trigger: 'blur' },
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

        methods: {
            handleSubmit (name) {
                console.log(this.collectInfo);
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        // this.$store.dispatch('moduleLesson/createLesson',this.lessonInfo);
                        this.$Message.success('提交成功!');
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
        }
    }
</script>

<style lang="scss" scoped>
    .top{
        margin: 20px 0px;
    }
    .small .ivu-input-wrapper {
        width: 50%;
    }
</style>
