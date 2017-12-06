<template>
    <div class="sourceModule">
        <div class="topfix">
            <div class="optionBox">
                <Upload 
                    ref="upload"
                    multiple 
                    :action="API+'/upload_file'"
                    :data="{dir_id:dir_id}"
                    :show-upload-list="uploadList"
                    :before-upload="handleBefore"
                    :on-success="handleSuccess"
                    :format="['jpg','jpeg','png','gif','mp3','mp4','npeg','flv','mov','avi']"
                    :on-format-error="handleFormatError"
                    style="display:inline-block" >
                    <Button type="primary" icon="ios-cloud-upload-outline">上传文件</Button>
                </Upload>
                <Button type="ghost" icon="ios-medkit-outline" @click="createFolder">新建文件夹</Button>
                <Button type="ghost" icon="ios-trash-outline" v-show="deleteable" @click="deleteFolder">删除</Button>
                <Button type="ghost" icon="ios-nutrition-outline" v-show="renameable" @click="renameFolder">重命名</Button>
            </div>
            <div class="breadBox">
                <!-- <a href="">上一级</a>
                <span style="margin:0px 4px;">|</span> -->
                <Breadcrumb separator=">">
                    <BreadcrumbItem v-for="(item, index) in BreadcrumbItem" :key="item._id" @click.native="onClickBread(item._id)">{{item.name}}</BreadcrumbItem>
                </Breadcrumb>
            </div>
        </div>
        
        <div class="fileBox">
            <v-folder v-for="(item, index) in topFolder" :key="item._id" :info="item" :infoIndex="index"></v-folder>
            <Spin fix size="large" v-show="spinShow"></Spin>

            <!-- 查看图片  -->
            <Modal title="查看图片" v-model="visibleImg.status" :styles="{'text-align':'center'}" :transfer="false" :mask-closable="false" width="600">
                <img :src="visibleImg.url?URL_WEBSITE+visibleImg.url:''" style="max-width: 100%;max-height:540px;">
            </Modal>
            <!-- 查看视频  -->
            <Modal title="查看视频" v-model="visibleVideo.status" style="text-align:center;" width="600" :transfer="false" :mask-closable="false" @on-ok="videoClose" @on-cancel="videoClose">
                <video ref="videoPriew" controls="controls"  preload="true" :src="visibleVideo.url?URL_WEBSITE+visibleVideo.url:''" style="max-width: 100%;max-height:540px;"></video>
            </Modal>
        </div>
       
        
    </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('moduleSource')
import vFolder from './folder'
export default {
    data(){
        return {
            uploadList: true,
        }
    },
    mounted(){
        this.$store.dispatch('moduleSource/queryAll');
        this.$store.commit('moduleSource/initBread');
    },
    methods:{
        createFolder(){
            if(!this.creating){
                let l = this.topFolder.length;
                this.$store.commit('moduleSource/creating',true);
                this.$store.commit('moduleSource/addTopFolder',{
                    _id:l,
                    type:'folder',
                    name:''
                });
                this.$nextTick(()=>{
                    this.$root.$emit('selectInp');
                })
                
            }
        },
        deleteFolder(){
            if(this.selectedFolder.length>0){
                this.$store.dispatch('moduleSource/deleteTopFolder');
            }
        },
        renameFolder(){
            if(!this.renaming){
                this.$store.commit('moduleSource/renaming',true);
                this.$nextTick(()=>{
                    this.$root.$emit('selectInp');
                })
            }
        },
        handleSuccess(response,file,fileList){
            // console.log(fileList)
            this.$store.dispatch('moduleSource/queryAll',this.dir_id);
            setTimeout(()=> {
                this.uploadList = false;
                this.$refs.upload.fileList.length = 0; //清空已上传列表
            }, 5000);
        },
        handleBefore(){
            this.uploadList = true;
        },
        onClickBread(_id){
            this.$store.dispatch('moduleSource/queryAll',_id);
            this.$store.commit('moduleSource/onClickBread',_id);
        },
        videoClose(){
            this.$refs.videoPriew.pause();
        },
        handleFormatError (file) {
            this.$Notice.warning({
                title: '图片或视频格式错误！',
                desc: "图片请选择 'jpg','jpeg','png','gif'格式，视频选请择'mp3','mp4','npeg','flv','mov','avi'格式"
            });
        },
    },
    components:{
        vFolder
    },
    computed:{
        ...mapState(['creating','topFolder','deleteable','renameable','selectedFolder','renaming','dir_id','BreadcrumbItem','spinShow','message','visibleImg','visibleVideo']),
        // ...mapActions(['createFolder'])
    },
    watch:{
        selectedFolder(){
            if(this.selectedFolder.length>0){
                this.$store.commit('moduleSource/deleteable',true)
            }else{
                this.$store.commit('moduleSource/deleteable',false);
                this.$store.commit('moduleSource/renameable',false);
                this.$store.dispatch('moduleSource/clearReNaming');
            }
            if(this.selectedFolder.length==1){
                this.$store.commit('moduleSource/renameable',true)
            }else{
                this.$store.commit('moduleSource/renameable',false)
            }
        },
        message(){
            if(this.message){
                this.$Message.error('亲，当前选中含有非空文件夹，非空文件夹不可删除哦~');
            }
        }
    }
};
</script>
<style lang="scss">
.ivu-breadcrumb-item-link{
    cursor: pointer;
}
    .sourceModule{
        position: relative;
        .topfix{
            width: 100%;
            height: 64px;
            position: absolute;;
            top: 0;
            left: 0px;
            z-index: 99;
            background: #FFF;
        }
    }
    .breadBox{
        margin: 5px 0px;
        a,span,.ivu-breadcrumb{
            display: inline-block;
            font-size: 14px;
        }
        
        .ivu-breadcrumb-item-separator{
            color: #333;
            padding: 0;
        }

    }
    .fileBox{
        position: relative;
        overflow: hidden;
        height: calc(100vh - 190px);
        overflow-y: scroll;
        padding-top: 64px;
    }
    .demo-upload{
        width: 360px;
        height: 200px;

    }
    .ivu-upload-list{
        width: 200px;
        position: absolute;
        top: 40px;
        right: 10px;
        z-index: 1;
        background: #FFF;
        padding: 5px;

    }

</style>


