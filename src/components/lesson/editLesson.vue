<template>
    <div class="editLesson">
        <div class="layout-breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem href="/lesson">课程管理</BreadcrumbItem>
                <BreadcrumbItem href="#">{{lessonEdit?'编辑课程':'新建课程'}}</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="layout-content">
            <div class="layout-content-main" style="position:relative;">
                <h1 class="tac top">课程信息</h1>
                <Form ref="formValidate" :model="lessonInfo" :rules="ruleValidate" :label-width="100" style="width: 600px;margin: 0 auto;">
                    <FormItem label="课程类型" prop="type" >
                        <!-- <Input v-model="lessonInfo.type" placeholder="请输入课程名称"></Input> -->

                        <Select class="select1" v-model="lessonInfo.type" :disabled="lessonEdit?true:false">
                            <Option value="0">续期类</Option>
                            <Option value="1">兑换类</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="课程名称" prop="name">
                        <Input v-model="lessonInfo.name" placeholder="请输入课程名称，不超过20字"></Input>
                    </FormItem>
                    <FormItem label="课程介绍" prop="desc">
                        <Input v-model="lessonInfo.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
                    </FormItem>
                    <FormItem label="课程配图" prop="picName">
                        <p>图片尺寸限制：682*384</p>
                        <Button type="primary" @click="sourceClick('picName')">资源库</Button>
                        <Input v-model="lessonInfo.picName" placeholder="请选择课程配图" style="width: 240px;margin:0px 5px;" disabled></Input>
                        <Button type="primary" @click="picPriew = true">预览</Button>
                    </FormItem>
                    <template v-if="lessonInfo.type == '1'">
                        <FormItem label="兑换封面" prop="bookName">
                            <p>图片尺寸限制：682*384</p>
                            <Button type="primary" @click="sourceClick('bookName')">资源库</Button>
                            <Input v-model="lessonInfo.bookName" placeholder="请选择兑换封面配图" style="width: 240px;margin:0px 5px;" disabled></Input>
                            <Button type="primary" @click="bookPriew = true">预览</Button>
                        </FormItem>
                        <FormItem label="了解更多" prop="moreInfo">
                            <Input v-model="lessonInfo.moreInfo" placeholder="请输入了解更多连接"></Input>
                        </FormItem>
                    </template>


                    <FormItem>
                        <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                        <!-- <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button> -->
                        <Button type="ghost" @click="handleBack" style="margin-left: 8px">取消</Button>
                    </FormItem>
                </Form>
                <Spin fix size="large" v-show="spin"></Spin>

            </div>
        </div>

        <!-- model -->
        <Modal v-model="modal1" title="" width="90%" :styles="{top: '5px'}" :transfer="false" :mask-closable="false" class-name="modal1" @on-ok="ok">
            <v-source></v-source>
            <div slot="footer">
                <Button type="dashed" size="large" @click="cancel">取消</Button>
                <Button :type="typeBtn?'primary':'dashed'" size="large" @click="ok" >确定</Button>
            </div>
        </Modal>
        <!-- 查看图片预览  -->
        <Modal title="课程配图" v-model="picPriew" style="text-align:center;" :transfer="false" :mask-closable="false" width="600">
            <img :src="lessonInfo.picUrl?URL_WEBSITE+lessonInfo.picUrl:''" style="max-width: 100%;max-height:540px;">
        </Modal>
        <!-- 查看图片预览  -->
        <Modal title="兑换封面" v-model="bookPriew" style="text-align:center;" :transfer="false" :mask-closable="false" width="600">
            <img :src="lessonInfo.bookUrl?URL_WEBSITE+lessonInfo.bookUrl:''" style="max-width: 100%;max-height:540px;">
        </Modal>
    </div>
</template>
<script>
    import vSource from '../resources'
    import { mapState, mapActions } from 'vuex'
    export default {
        data () {
            return {
                modal1: false,
                spin:true,
                typeBtn: false,
                sourceType:'',
                picId: '',
                picUrl: '',
                picName: '',
                bookId: '',
                bookUrl: '',
                bookName: '',
                picPriew:false,
                bookPriew:false,
                lessonInfo: {                               //课程信息
                    type: '0',
                    name: '',
                    desc: '',
                    picName: '',
                    picUrl: '',
                    picId: '',
                    bookId: '',
                    bookUrl: '',
                    bookName: '',
                    moreInfo: ''
                },
                ruleValidate: {
                    // type: [
                    //     { required: this.lessonEdit?false:true, message: '课节类型不能为空', trigger: 'change' }
                    // ],
                    name: [
                        { required: true, message: '课程名称不能为空', trigger: 'blur' },
                        { type: 'string', max: 20, message: '课程名称不能超过20个字', trigger: 'blur' }
                    ],
                    desc: [
                        { required: false, message: '请输入课程介绍', trigger: 'blur' }
                    ],
                    picName: [
                        { required: true, message: '请选择您的课程配图', trigger: 'change' }
                    ],
                    bookName: [
                        { required: true, message: '请选择您的兑换封面配图', trigger: 'change' }
                    ],
                    moreInfo: [
                        { required: true, message: '了解更多链接不能为空', trigger: 'blur' }
                    ],
                }
            }
        },
        mounted(){
            // this.$store.dispatch('moduleLesson/queryLessonDetail',this.lessonCurId);
            let timer = setInterval(()=>{
                if(this.lessonCourse.name  && this.lessonCourse.image ){
                    this.lessonInfo = {
                        type: this.lessonCourse.type,
                        name: this.lessonCourse.name,
                        desc: this.lessonCourse.info,
                        picUrl: this.lessonCourse.image.url,
                        picId: this.lessonCourse.image._id,
                        picName: this.lessonCourse.image.name,
                        lessonCurId: this.lessonCurId,
                    }
                    if(this.lessonCourse.type==1){     //兑换类,多余属性
                        this.lessonInfo.bookUrl = this.lessonCourse.book_image.url;
                        this.lessonInfo.bookId = this.lessonCourse.book_image._id;
                        this.lessonInfo.bookName = this.lessonCourse.book_image.name;
                        this.lessonInfo.moreInfo = this.lessonCourse.book_more_info;
                    }
                    this.spin = false;
                    clearInterval(timer);
                }
            },10);
            if(!this.lessonEdit){
                this.spin = false;
            }
   
        },
        methods: {
            sourceClick(type){
                this.modal1 = true;
                this.sourceType = type;

            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {

                        console.log(this.lessonInfo)
                        this.$store.dispatch('moduleLesson/createLesson',this.lessonInfo);
                        this.$Message.success('提交成功!');
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            handleBack(){
                this.$router.push({path:'/lesson'});
            },
            ok(){
                if(this.typeBtn){
                    this.modal1 = false;
                    this.$root.$emit('initActive');
                }else{
                    this.$Message.warning('请选择一张图片');
                }
            },
            cancel(){
                this.modal1 = false;
                this.$root.$emit('initActive');
            }
        },
        components: {
            vSource
        },
        computed: {
            ...mapState('moduleSource',['topFolder','selectedFolder']),
            ...mapState('moduleLesson',['lessonEdit','lessonCourse','lessonCurId']),

        },
        watch: {
            selectedFolder(){
                if(this.selectedFolder.length < 1){

                }
                if(this.selectedFolder.length == 1){
                    let curId = this.selectedFolder[0];
                    console.log(curId)
                    this.topFolder.map((e)=>{
                        if(e._id == curId && e.type == 'image'){
                            console.log(e)
                            if(this.sourceType == 'picName'){//课程配图
                                this.typeBtn = true;
                                this.lessonInfo.picName = e.name;
                                this.lessonInfo.picUrl = e.url;
                                this.lessonInfo.picId = e._id;
                                return false;
                            }
                            if(this.sourceType == 'bookName'){//兑换封面
                                this.typeBtn = true;
                                this.lessonInfo.bookName = e.name;
                                this.lessonInfo.bookUrl = e.url;
                                this.lessonInfo.bookId = e._id;
                                return false;
                            }
                        }
                    })
                }else{
                    this.typeBtn = false;
                }
            },
            lessonInfo(){
                console.log(this.lessonInfo)
            }
            
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
