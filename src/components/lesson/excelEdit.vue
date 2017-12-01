<template>
    <div>
        <div class="layout-breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem href="/lesson">课程管理</BreadcrumbItem>
                <BreadcrumbItem href="/lesson/excelLesson">资源匹配</BreadcrumbItem>
                <BreadcrumbItem href="#">课节编辑</BreadcrumbItem>
                                        <!-- <BreadcrumbItem>某应用</BreadcrumbItem> -->
            </Breadcrumb>
        </div>
        <div class="layout-content">
            <div class="layout-content-main" style="position:relative;">
                <h1 class="tac top">课节编辑</h1>
                <Form ref="formValidate" :model="excelInfo" :rules="ruleValidate" :label-width="100" style="width: 600px;margin: 0 auto;">
                    <FormItem label="课节序列" prop="order">
                        <Input v-model="excelInfo.order" number placeholder="请输入课节序列"></Input>
                    </FormItem>
                    <FormItem label="课节名称" prop="name">
                        <Input v-model="excelInfo.name" placeholder="请输入课节名称"></Input>
                    </FormItem>
                    <FormItem label="课节配图" prop="imageName">
                        <Button type="primary" @click="selectImage">资源库</Button>
                        <Input v-model="excelInfo.imageName" placeholder="请选择课程配图" style="width: 240px;margin:0px 5px;" disabled></Input>
                        <Button type="primary" @click="imagePriew = true">预览</Button>
                    </FormItem>
                    <FormItem label="视频" prop="videoName">
                        <Button type="primary" @click="selectVideo">资源库</Button>
                        <Input v-model="excelInfo.videoName" placeholder="请选择课程配图" style="width: 240px;margin:0px 5px;" disabled></Input>
                        <Button type="primary" @click="videoPriew = true">预览</Button>
                    </FormItem>
                    <FormItem label="互动问题" prop="question">
                        <Input v-model="excelInfo.question" placeholder="请输入互动问题"></Input>
                    </FormItem>
                    <FormItem label="互动答案" prop="answer">
                        <Input v-model="excelInfo.answer" placeholder="请输入互动答案"></Input>
                    </FormItem>
                    
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
        <Modal v-model="modal1" title="" width="90%" :styles="{top: '5px'}" class-name="modal1" @on-ok="ok">
            <v-source></v-source>
            <div slot="footer">
                <Button type="dashed" size="large" @click="cancel">取消</Button>
                <Button :type="typeBtn?'primary':'dashed'" size="large" @click="ok" >确定</Button>
            </div>
        </Modal>
        <!-- 查看图片预览  -->
        <Modal title="查看图片" v-model="imagePriew" style="text-align:center;z-index:99999;" width="600">
            <img :src="excelInfo.imageUrl?URL_WEBSITE+excelInfo.imageUrl:''" style="max-width: 100%;max-height:540px;">
        </Modal>
        <!-- 查看视频预览  -->
        <Modal title="查看视频" v-model="videoPriew" style="text-align:center;z-index:99999;" width="600" @on-ok="videoClose" @on-cancel="videoClose">
            <video ref="videoPriew" controls="controls"  preload="true" :src="excelInfo.videoUrl?URL_WEBSITE+excelInfo.videoUrl:''" style="max-width: 100%;max-height:540px;"></video>

        </Modal>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import vSource from '../resources'
export default {
    data() {
        const validateOrder = (rule, value, callback) => {
            if(value === ''){
                callback(new Error('请输入序列号码！'))
            }else if(!Number.isInteger(value)){
                callback(new Error('请输入数字！'))
            }else {
                callback();
            }
        }
        return {
            modal1:false,
            imagePriew:false,
            videoPriew:false,
            typeBtn: false,
            spin:false,
            excelInfo:{
               order: '',
               name: '',
               imageUrl: '',
               videoUrl: '',
               imageName: '',
               videoName: '',
               imageId: '',
               videoId:'',
               question: '',
               answer: '',
               lesson_id:''
            },
            ruleValidate: {
                order: [
                    { required: true, validator: validateOrder, trigger: 'blur' },
                    // { type: 'num', message: 'Incorrect number format', trigger: 'blur' }
                ],
                name: [
                    { required: true, message: '课节名称不能为空', trigger: 'blur' }
                ],
                question: [
                    { required: true, message: '互动问题不能为空', trigger: 'blur' }
                ],
                answer: [
                    { required: true, message: '互动答案不能为空', trigger: 'blur' }
                ],
                imageName: [
                    { required: true, message: '请选择您的课程配图', trigger: 'change' }
                ],
                videoName: [
                    { required: true, message: '请选择您的配视频', trigger: 'change' }
                ],
            }
        }
    },
    mounted(){
        if(!this.lessonCurId){
            this.$router.push({path:'/lesson'});
            return;
        }
        let timerEditExcel = setInterval(()=>{
            if(this.editExcel.order){
                this.excelInfo.order = this.editExcel.order;
            }
            if(this.editExcel.name){
                this.excelInfo.name = this.editExcel.name;
            }
            if(this.editExcel.image){
                this.excelInfo.imageUrl = this.editExcel.image.url,
                this.excelInfo.imageName = this.editExcel.image.name,
                this.excelInfo.imageId = this.editExcel.image._id
            }
            if(this.editExcel.video){
                this.excelInfo.videoUrl = this.editExcel.video.url,
                this.excelInfo.videoName = this.editExcel.video.name,
                this.excelInfo.videoId = this.editExcel.video._id
            }
            if(this.editExcel.question){
                this.excelInfo.question = this.editExcel.question;
            }
            if(this.editExcel.answer){
                this.excelInfo.answer = this.editExcel.answer;
            }
            if(this.editExcel._id){
                this.excelInfo.lesson_id = this.editExcel._id;
            }
            if(this.editExcel.order && this.editExcel.name && this.editExcel.image && this.editExcel.video && this.editExcel.question && this.editExcel.answer && this.editExcel._id){
                clearInterval(timerEditExcel);
            }
            
        },10);
        
    },
    methods:{
        handleSubmit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    console.log(this.excelInfo)
                    this.$store.dispatch('moduleLesson/updatedLessonDetail',this.excelInfo);
                    this.$Message.success('提交成功!');
                    // this.$store.dispatch('moduleLesson/queryLessonDetail',this.lessonCurId);
                    this.$router.push({path: '/lesson/excelLesson'});
                } else {
                    this.$Message.error('表单验证失败!');
                }
            })
        },
        handleBack(){
            this.$router.push({path:'/lesson/excelLesson'});
        },
        selectImage(){
            this.modal1 = true;
            this.$store.commit('moduleLesson/selectType','image');
        },
        selectVideo(){
            this.modal1 = true;
            this.$store.commit('moduleLesson/selectType','video');
        },
        ok(){
            if(this.typeBtn){
                this.modal1 = false;
                this.$root.$emit('initActive');
            }else{
                if(this.selectType=='image'){
                    this.$Message.warning('请选择一张图片');
                }
                if(this.selectType=='video'){
                    this.$Message.warning('请选择一个视频');
                }
            }
        },
        cancel(){
            this.modal1 = false;
            this.$root.$emit('initActive');
        },
        videoClose(){
            this.$refs.videoPriew.pause();  
        }
    },
    computed: {
        ...mapState('moduleSource',['topFolder','selectedFolder']),
        ...mapState('moduleLesson',['editExcel','selectType','lessonCurId']),
    },
    beforeRouteLeave(to, from, next) {
        this.$store.commit('moduleLesson/clearEditExcel');
        this.$store.commit('moduleLesson/selectType','');
        next();
    },
    components: {
        vSource
    },
    watch: {
        selectedFolder(){
            if(this.selectedFolder.length == 1){
                let curId = this.selectedFolder[0];
                console.log(curId)
                if(this.selectType=='image'){
                    this.topFolder.map((e)=>{
                        if(e._id == curId && e.type == 'image'){
                            console.log(e)
                            this.typeBtn = true;
                            this.excelInfo.imageName = e.name;
                            this.excelInfo.imageUrl = e.url;
                            this.excelInfo.imageId = e._id;
                            return false;
                        }
                    })
                }
                if(this.selectType=='video'){
                    this.topFolder.map((e)=>{
                        if(e._id == curId && e.type == 'video'){
                            console.log(e)
                            this.typeBtn = true;
                            this.excelInfo.videoName = e.name;
                            this.excelInfo.videoUrl = e.url;
                            this.excelInfo.videoId = e._id;
                            return false;
                        }
                    })
                }
            }else{
                this.typeBtn = false;
            }
        }
    }
}
</script>

<style lang="scss">
    .top{
        margin: 20px 0px;
    }
</style>
