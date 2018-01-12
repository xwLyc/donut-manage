<template>
    <div class="folderBox">
        <div :class="['folder',{'active':isAcitve}]" @click="enterFolder(info._id, info.type, info.url)">
            <!-- 加载文件类型 -->
            <div class="folderIcon">
                <Icon class="" v-if="info.type=='folder'" type="ios-folder" size="40" color="#fed563"></Icon>
                <div class="folderImg" v-else-if="info.type=='image'">
                    <Icon v-show="imgLoading" type="images" size="40" color="#2dcc9f"></Icon>
                    <div class="imgPriew" v-show="!imgLoading">
                        <img :src="info.url?info.url:''" alt="">
                    </div>
                </div>
                <div class="folderImg" v-else-if="info.type=='video'">
                    <img src="https://donutlive.leanapp.cn/images/paper/play.png" class="playIcon" alt="">
                    <Icon type="ios-videocam" size="40" color="#418ffc"></Icon>
                </div>
                <div class="folderImg" v-else-if="info.type=='audio'">
                    <img src="https://donutlive.leanapp.cn/images/paper/play.png" class="playIcon" alt="">
                    <Icon type="music-note" size="40" color="#418ffc"></Icon>
                    <audio ref="audioPlay" :src="info.url?info.url:''"></audio>
                </div>
                <Icon class="" v-else type="document-text" size="40" color="#2dcc9f"></Icon>
            </div>
            

            <p class="floderName" v-show="isAcitve?!renaming:true">{{info.name}}</p>
            <div class="checkBox" @click.stop="toggleCheck">
                <Icon type="checkmark-circled" size="20"></Icon>
            </div>
        </div>
        <!-- 新建或者重命名时显示文件 -->
        <div class="inputFolderName" v-show="!info.name||(isAcitve?renaming:false)">
            <Input ref="inp" v-model="inputFolderName" size="small" placeholder="please input folder name..." style="width:150px;" :autofocus="autofocus" @keyup.native.enter.stop="saveFolderName(infoIndex)"></Input>
            <Button type="ghost" icon="checkmark-round" size="small" @click.native.stop="saveFolderName(infoIndex)"></Button>
            <Button type="ghost" icon="close-round" size="small" @click.native.stop="closeFolderName(infoIndex)"></Button>
        </div>
        <div class="mark" v-show="creating"></div>
        <!-- 查看图片  -->
        <!-- <Modal title="查看图片" v-model="visibleImg" :styles="{'text-align':'center'}" width="600">
            <img :src="info.url?info.url:''" style="max-width: 100%;max-height:540px;">
        </Modal> -->
        <!-- 查看视频  -->
        <!-- <Modal title="查看视频" v-model="visibleVideo" style="text-align:center;" width="600" @on-ok="videoClose" @on-cancel="videoClose">
            <video ref="videoPriew" controls="controls" autoplay="autoplay" preload="none" :src="info.url?info.url:''" style="max-width: 100%;max-height:540px;"></video>
        </Modal> -->
    </div>
    
</template>
<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('moduleSource')
export default {
    props:['info','infoIndex'],
    data(){
        return{
            isAcitve:false,
            visibleImg:false,
            visibleVideo:false,
            autofocus:true,
            imgLoading:true,
            // floderName:'',
            inputFolderName: '新建文件夹',
        }
    },
    mounted(){
        //新建文件默认选中 input
        this.$root.$on('selectInp',()=>{
            // if(!this.info.name){
                if(this.$refs.inp){
                    this.$refs.inp.$refs.input.select();
                }
            // }
        })
        //组件初始化状态
        this.$root.$on('initActive',()=>{
            this.isAcitve = false;

            if(this.selectedFolder.length>0){
                this.$store.commit('moduleSource/clearSelectedId');
                this.$store.commit('moduleSource/renameable',false);
                this.$store.commit('moduleSource/deleteable',false);
            }
        })
        
        if(this.info.type=='image'){
            this.preloadImg((this.info.url),()=>{
                this.imgLoading = false;
            })
        }

        
    },
    methods:{
        toggleCheck(){
            this.isAcitve = !this.isAcitve;
        },
        enterFolder(_id,type,url){
            if(type=='folder'){
                this.$store.dispatch('moduleSource/queryAll',_id);
                this.$store.commit('moduleSource/enterBread',{
                    _id:_id,
                    name:this.info.name
                });

            }
            if(type=='image'){
                // this.visibleImg = true;
                this.$store.commit('moduleSource/visibleImg',{
                    status: true,
                    url: url
                });
            }
            if(type=='audio'){
                this.$refs.audioPlay.play();
            }
            if(type=='video'){
                // this.visibleVideo = true;
                this.$store.commit('moduleSource/visibleVideo',{
                    status: true,
                    url: url
                });
            }
        },
        setFolderName(){
            console.log(this.inputFolderName)
        },
        videoClose(){
            this.$refs.videoPriew.pause();
        },
        saveFolderName(index){
            // alert(index)
            if(this.creating){      //新建文件夹                                    
                this.$store.dispatch('moduleSource/createFolder',{
                    index: index,
                    dir_id: this.dir_id, //父文件夹id
                    name: this.inputFolderName
                })

            }else{                  //重命名
                this.$store.dispatch('moduleSource/updateFolderName',{
                    index: index,
                    type: this.info.type,
                    dir_id: this.info._id,
                    file_id: this.info._id,
                    name: this.inputFolderName
                })

            }
            
            this.isAcitve = false;
            

        },
        closeFolderName(index){
            if(this.renaming){  //重命名只隐藏input
                this.$store.dispatch('moduleSource/clearReNaming');
            }else{
                let curId = this.topFolder[index]._id;
                this.$store.commit('moduleSource/deleteTopFolder',curId);
                this.$store.commit('moduleSource/creating',false);
            }
            
        },
        preloadImg(url,callback){
            let img = new Image();
            img.src = url;
            if(img.complete) {//如果有缓存
                //接下来可以使用图片了
                callback();
            }
            else {
                img.onload = function() {
                    img.onload = null;
                    //接下来可以使用图片了
                    callback();
                };
            }
        }
    },
    computed:{
        ...mapState(['creating','topFolder','selectedFolder','renaming','dir_id'])
    },
    watch:{
        isAcitve(){
            if(this.isAcitve){
                this.$store.commit('moduleSource/pushSelectedId',this.info._id);
            }else{
                this.$store.commit('moduleSource/removeSelectedId',this.info._id);
            }
        },
        creating(){
            if(this.creating){
                this.isAcitve = false;
                this.$store.commit('moduleSource/clearSelectedId');
            }
        },
        renaming(){
            if(this.renaming){
                this.inputFolderName = this.info.name;
            }
        }
        // selectedFolder(){
        //     if(this.selectedFolder.length>0){
        //         this.$store.commit('moduleSource/deleteable',true)
        //     }else{
                
        //         alert(this.isAcitve)
        //         this.$store.commit('moduleSource/deleteable',false)
        //     }
        // }
    }
};
</script>
<style lang="scss">
.folderBox{
    width: 400px;
    height: 60px;
    margin: 2px;
    float: left;
    position: relative;
    .folder{
        width: 100%;
        height: 100%;
        padding: 10px;
        border-radius: 4px;

        cursor: pointer;
        text-align: center;
        position: relative;
        .folderIcon{
            width: 40px;
            height: 40px;
            margin: 0px 14px;
            // background:red;
            float: left;
            .folderImg{
                position: relative;
                width: 100%;
                height: 100%;
                overflow: hidden;
                .imgPriew{
                    width: 60px;
                    height: 60px;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    z-index: 1;
                    margin-left: -30px;
                    margin-top: -30px;
                    display: flex;
                    display: -webkit-flex; /* Safari */
                    justify-content: center center;
                    align-items: center;
                    img{
                        max-width: 100%;
                        max-height: 100%;
                    }
                }
                .playIcon{
                    width: 16px;
                    height: 16px;
                    position: absolute;
                    top: 12px;
                    left: 12px;

                    z-index: 9;
                    display: none;
                    // background: rgba(0, 0, 0, 0.1);
                }
            }
        }
        .floderName{
            width: 300px;
            text-align: left;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            height: 40px;
            line-height: 40px;
            float: left;
            &:hover{
                color: #418ffb;
            }
        }
        .checkBox{
            width: 20px;
            height: 20px;
            position: absolute;
            top: 5px;
            left: 5px;
            z-index: 1;
            display: none;

        }
        &:hover{
            background: #f1f5fa;
            .checkBox{
                display: block;
                .ivu-icon{
                    color: #b2d1fd;
                    &:hover{
                        color: #a0c7fd;
                    }
                }
            }
            .folderIcon{
                .folderImg{
                    .playIcon{
                        display: block;
                    }

                }
            }
        }
        &.active{
            box-shadow: 0px 0px 1px #0075fc;
            background: #f1f5fa;
            .checkBox{
                display: block;
                .ivu-icon{
                    color: #418ffc;
                    &:hover{
                        color: #418ffc;
                    }
                }
            }
        }
    }
    .inputFolderName{
        width: 240px;
        height: 40px;
        // background: #ffffff;
        position: absolute;
        bottom: 0;
        left: 74px;
        // margin-left: -70px;
        z-index: 9;
        .inp{
            width: 180px;
            padding: 2px 4px;
            border-radius: 2px;
            border: none;
            border: 1px solid #efefef;
            float: left;
        }
        .ivu-btn-ghost{
            background: #FFF;
        }

    }
    .mark{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 8;
    }
}

</style>



