<template>
    <div class="editActivity">
        <div class="layout-breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem href="/activity">活动管理</BreadcrumbItem>
                <BreadcrumbItem href="#">{{activityEdit?'编辑活动':'新建活动'}}</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="layout-content">
            <div class="layout-content-main" style="position:relative;">
                <h1 class="tac top" v-if="activityEdit">{{activityType?'普通裂变类':'续期课程类'}}-活动信息</h1>
                <h1 class="tac top" v-else>新建活动信息</h1>
                <Form ref="formValidate" :model="activityInfo" :rules="ruleValidate" :label-width="100" style="width: 600px;margin: 0 auto;">
                    <FormItem label="活动类型" prop="type" >
                        <Select class="select1" v-model="activityInfo.type" :disabled="activityEdit">
                            <Option value="2">普通非裂变类</Option>
                            <Option value="1">普通裂变类</Option>
                            <Option value="0">续期课程类</Option>
                        </Select>
                    </FormItem> 
                    <FormItem label="活动名称" prop="name">
                        <Input v-model="activityInfo.name" placeholder="请输入活动名称，不超过20字"></Input>
                    </FormItem>
                    <FormItem label="活动码段" prop="part" v-if="activityInfo.type != '2'">
                        <Input v-model="activityInfo.part"  placeholder="请输入活动码段"  :disabled="activityEdit"></Input>
                    </FormItem>
                    <template v-if="activityInfo.type == '0'">
                        <FormItem label="关联课程" prop="lesson" >
                            <Select class="" v-model="activityInfo.lesson" :disabled="activityEdit?true:false">
                                <Option v-for="(item, index) in courseList" :key="item._id" :value="item._id">{{item.name}}</Option>
                            </Select>
                        </FormItem>
                    </template>
                    <FormItem label="活动海报" prop="picName"  v-if="activityInfo.type != '2'">
                        <p>图片尺寸限制：750*1334</p>
                        <Upload 
                            ref="upload"
                            multiple 
                            :action="API+'/upload_local'"
                            :data="{path: '/poster'}"
                            :show-upload-list="false"

                            :on-success="handleSuccess"
                            :format="['jpg','jpeg','png','gif']"
                            :on-format-error="handleFormatError"
                            style="display:inline-block" >
                            <Button type="primary" icon="ios-cloud-upload-outline">官方海报上传</Button>
                        </Upload>
                        <Input v-model="activityInfo.picName" placeholder="请上传官方海报" style="width: 240px;margin:0px 5px;" disabled></Input>
                        <Button type="primary" @click="picPriew = true">预览</Button>
                    </FormItem>

                    <FormItem label="官方二维码坐标" prop="site"  v-if="activityInfo.type != '2'">
                        <Input v-model="activityInfo.site" placeholder="请输入二维码坐标"></Input>
                    </FormItem>

                    
                    <FormItem label="专属海报" prop="picNameSelf"  v-if="activityInfo.type != '2'">
                        <p>图片尺寸限制：750*1334</p>
                        <Upload 
                            ref="upload"
                            multiple 
                            :action="API+'/upload_local'"
                            :data="{path: '/poster_self'}"
                            :show-upload-list="false"
                            :on-success="handleSuccessSelf"
                            :format="['jpg','jpeg','png','gif']"
                            :on-format-error="handleFormatError"
                            style="display:inline-block" >
                            <Button type="primary" icon="ios-cloud-upload-outline">专属海报上传</Button>
                        </Upload>
                        <Input v-model="activityInfo.picNameSelf" placeholder="请上传专属海报" style="width: 240px;margin:0px 5px;" disabled></Input>
                        <Button type="primary" @click="picPriewSelf = true">预览</Button>
                    </FormItem>
                    
                    <FormItem label="报名文字消息" prop="content">
                        <Input v-model="activityInfo.content" type="textarea" :rows="5" placeholder="请输入报名文字消息"></Input>
                    </FormItem>




                    <FormItem>
                        <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                        <Button type="ghost" @click="handleBack" style="margin-left: 8px">取消</Button>
                    </FormItem>
                </Form>
                <Spin fix size="large" v-show="spin"></Spin>

            </div>
        </div>

       
        <!-- 查看官方海报图片预览  -->
        <Modal title="活动配图" v-model="picPriew" style="text-align:center;" :transfer="false" :mask-closable="false" width="600">
            <img :src="activityInfo.picUrl?URL_WEBSITE+activityInfo.picUrl:''" style="max-width: 100%;max-height:540px;">
        </Modal>
        <!-- 查看专属海报图片预览  -->
        <Modal title="活动配图" v-model="picPriewSelf" style="text-align:center;" :transfer="false" :mask-closable="false" width="600">
            <img :src="activityInfo.picUrlSelf?URL_WEBSITE+activityInfo.picUrlSelf:''" style="max-width: 100%;max-height:540px;">
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
                picPriew: false,
                picPriewSelf: false,
                spin:true,
                sourceType:'',
                courseList: [],
                activityInfo: {                               //活动信息
                    type: '1',
                    name: '',
                    part: '',
                    picName: '',
                    picUrl: '',
                    picId: '',
                    picNameSelf: '',
                    picUrlSelf: '',
                    picIdSelf: '',
                    lesson: '',
                    site: '',
                    content: ''
                },
                ruleValidate: {
                    type: [
                        { required: true, message: '请选择您的活动类型', trigger: 'change' }
                    ],
                    name: [
                        { required: true, message: '活动名称不能为空', trigger: 'blur' },
                        { type: 'string', max: 20, message: '活动名称不能超过20个字', trigger: 'blur' }
                    ],
                    part: [
                        { required: true, message: '请输入活动码段', trigger: 'blur'},
                        { type: 'number',  message: '请输入数字', trigger: 'blur' ,
                            transform(value) {
                                return Number(value);
                            }
                        },

                    ],
                    picName: [
                        { required: true, message: '请选择您的官方海报配图', trigger: 'change' }
                    ],
                    picNameSelf: [
                        { required: true, message: '请选择您的专属海报配图', trigger: 'change' }
                    ],
                    lesson: [
                        { required: true, message: '请选择您关联的课程', trigger: 'change' }
                    ],
                    content: [
                        { required: true, message: '请填写你的报名文字消息', trigger: 'blur' }
                    ],
                }
            }
        },
        mounted(){
            
            this.queryLesson().then(res => {
                let data = res.data.data;
                data.forEach(e => {
                    if(e.type == 0){    //续期课程类
                        this.courseList.push({_id: e._id, name: e.name});
                    }
                })
            });
            if(!this.activityEdit){ 
                // 新建
                this.spin = false;
            }else{
                // 正在编辑
                this.spin = false;
                this.ruleValidate.part = [{ required: true, message: '请输入活动码段', trigger: 'blur'}];
                this.queryActivityDetail(this.activityCurId).then(res => {
                    if(res.data.code == 0){
                        // console.log(res.data.data)
                        let data = res.data.data;
                        this.activityInfo.type = data.type.toString();
                        this.activityInfo.name = data.actionName;
                        this.activityInfo.part = '['+ data.minKey +', '+ data.maxKey +']';
                        this.activityInfo.picName = '点击右侧预览官方海报';
                        this.activityInfo.picNameSelf = '点击右侧预览专属海报';
                        this.activityInfo.picUrl = data.base_donut_poster;
                        this.activityInfo.picUrlSelf = data.base_self_poster;
                        this.activityInfo.content = data.poster_content;
                        if(!data.type){
                            this.activityInfo.lesson = data.course._id;
                        }


                        
                    }else{
                        route.push({path:'/activity'})
                        alert(res.data.msg)
                    }
                });
            }
   
        },
        methods: {
            ...mapActions('moduleActivity',['queryLesson','createActivity','queryActivityDetail','editActivityDetail']),
           
            handleSuccess(response,file,fileList){
                this.activityInfo.picName = response.name;
                this.activityInfo.picUrl = response.url;
            },
            handleSuccessSelf(response,file,fileList){
                console.log(response)
                this.activityInfo.picNameSelf = response.name;
                this.activityInfo.picUrlSelf = response.url;
                
            },
            handleFormatError (file) {
                this.$Notice.warning({
                    title: '图片或视频格式错误！',
                    desc: "图片请选择 'jpg','jpeg','png','gif'格式，视频选请择'mp3','mp4','npeg','flv','mov','avi'格式"
                });
            },




            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {   
                        console.log(this.activityInfo)
                        if(!this.activityEdit){                     //新建
                            this.createActivity(this.activityInfo).then(res => {
                                // console.log(res)
                                if(res.data.code == 0){
                                    this.$Message.success('创建成功!');
                                    this.$router.push({path:'/activity'});
                                }else{
                                    alert(res.data.msg)
                                }
                            });
                        }else{                                     //编辑
                            let datas = {
                                segment_id: this.activityCurId,
                                actionName: this.activityInfo.name,
                                poster_url: this.activityInfo.picUrl,
                                self_poster: this.activityInfo.picUrlSelf,
                                poster_content: this.activityInfo.content,
                                rect_xywh: this.activityInfo.site,
                            }
                            this.editActivityDetail(datas).then(res => {
                                // console.log(res)
                                if(res.data.code == 0){
                                    this.$Message.success('编辑成功!');
                                    this.$router.push({path:'/activity'});
                                }else{
                                    alert(res.data.msg)
                                }
                            })
                        }   

                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            },
            handleBack(){
                this.$router.push({path:'/activity'});
            },
          
        },
        components: {
            vSource
        },
        computed: {
            ...mapState('moduleActivity',['activityEdit','activityCourse','activityCurId','activityType']),
            
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
