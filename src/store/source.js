/*
 * @Author: lyc 
 * @Date: 2017-11-03 18:02:27 
 * @Last Modified by: liyuancheng
 * @Last Modified time: 2017-11-30 18:50:08
 */
import Vue from 'vue'
import Vuex from 'vuex'
import utils from '../utils'
import Source from '../Api/source'
Vue.use(Vuex)

const state = {
    creating: false,    //正在创建文件夹
    topFolder: [         //顶级文件夹
        // {
        //     _id: 0,
        //     type:'folder',
        //     name: '绘本资源'
        // },
        // {
        //     _id: 1,
        //     type:'folder',
        //     name: '嘿哈建安街'
        // },
        // {
        //     _id: 12,
        //     type:'image',
        //     name: 'IMG001',
        //     url: 'http://img-arch.pconline.com.cn/images/photoblog/4/9/0/7/4907526/20104/11/1270991553580.jpg'

        // },
        // {
        //     _id: 13,
        //     type:'image',
        //     name: 'IMG002',
        //     url: 'http://pic.weather.com.cn/images/cn/photo/2015/09/21/AB6AED9ABAB77AFD2D00102A95AECA3D.jpg'

        // },
        // {
        //     _id: 14,
        //     type:'image',
        //     name: 'IMG003',
        //     url: 'http://h.hiphotos.baidu.com/image/pic/item/d000baa1cd11728bd8aaa57dc3fcc3cec2fd2ced.jpg'
        // },
        // {
        //     _id: 15,
        //     type:'image',
        //     name: 'IMG004',
        //     url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1509358035504&di=15caf315e47ed328fed16da1098774ff&imgtype=0&src=http%3A%2F%2Fh.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F562c11dfa9ec8a1364467bd6fd03918fa0ecc0a3.jpg'
        // },
        // {
        //     _id: 16,
        //     type:'image',
        //     name: 'IMG005',
        //     url: 'http://e.hiphotos.baidu.com/image/pic/item/08f790529822720e10eccecc71cb0a46f21fabe1.jpg'
        // },
        // {
        //     _id: 17,
        //     type:'video',
        //     name: 'video1',
        //     url: 'http://pic.ibaotu.com/00/23/13/85I888piC8ui.mp4'
        // },
        // {
        //     _id: 18,
        //     type:'audio',
        //     name: 'lkjlkjk2j3l.mp3',
        //     url: 'https://test.donut.cn/upload/Yu8-d5xH4Xz-RmS0JaBpSVAq.mp3'
        // },
        // {
        //     _id: 18,
        //     type:'doc',
        //     name: 'a.doc'
        // }
    ],

    deleteable: false,  //是否可删除,
    renameable: false,  //是否可重命名
    renaming: false,    //正在重命名
    selectedFolder: [],  //选中的文件夹，保存文件夹id
    BreadcrumbItem: [   //面包屑集合
        {
            _id:'',
            name:'全部文件'
        }
    ],              
    dir_id: '',            //当前文件夹id,根目录为空
    spinShow: true,          //loading状态
    message: false,          //消息处理
    visibleImg: {            //模态框 图片
        status: false,
        url: ''
    },        
    visibleVideo: {          //模态框 视频
        status: false,
        url: ''
    }   


}
const mutations = {
    creating: (state, creating) => state.creating = creating,
    deleteable: (state, deleteable) => state.deleteable = deleteable,
    renameable: (state, renameable) => state.renameable = renameable,
    renaming: (state, renaming) => state.renaming = renaming,
    dir_id: (state, dir_id) => state.dir_id = dir_id,
    spinShow: (state, spinShow) => state.spinShow = spinShow,
    message: (state, message) => state.message = message,

    initTopFolder: (state, topFolder) => state.topFolder = topFolder,   //初始化文件信息
    addTopFolder: (state, newfolder) => {                           //新建文件夹
        state.topFolder.unshift(newfolder)
    },
    uploadTopFile: (state, arr) => {                                //更新topFolder
        state.topFolder = arr;
        state.topFolder.push(file)
    },
    setNewFolder: (state, setFolder) => {                               //修改文件夹id或者名字
        if (setFolder._id) {
            state.topFolder[setFolder.index]._id = setFolder._id;
        }
        if (setFolder.name) {
            state.topFolder[setFolder.index].name = setFolder.name;
        }
        if (setFolder.type) {
            state.topFolder[setFolder.index].type = setFolder.type;
        }

    },
    pushSelectedId: (state, _id) => {                                //添加选中文件夹id
        state.selectedFolder.push(_id)
    },
    removeSelectedId: (state, _id) => {                              //移除选中文件夹id
        let arr = state.selectedFolder;
        if (arr.indexOf(_id) > -1) {
            arr.map((e, i) => {
                if (e == _id) {
                    arr.splice(i, 1)
                }
            })
        }
    },
    clearSelectedId: (state) => {                                  //清空选中文件夹id
        state.selectedFolder = []
    },
    deleteTopFolder: (state, _id) => {                               //删除顶级文件夹(id)
        let arr = state.topFolder;
        arr.map((e, i) => {
            if (e._id == _id) {
                arr.splice(i, 1)
            }

        })
    },
    initBread: (state)=>{                                           //初始化Bread
        state.BreadcrumbItem = [{
            _id:'',
            name:'全部文件'
        }]
    },
    enterBread: (state, folderInfo) => {                            //进入文件夹，push 文件夹id以及名字
        state.BreadcrumbItem.push(folderInfo);
        state.selectedFolder = []; //清空选中id
    },
    onClickBread: (state, _id) => {                                 //点击当前文件夹
        state.BreadcrumbItem.map((e,i)=>{
            if(e._id==_id){
                state.BreadcrumbItem.splice(i+1);
                return;
            }
        })
        state.selectedFolder = []; //清空选中id
    },
    visibleImg: (state, payload) => {
        state.visibleImg.status = payload.status;
        state.visibleImg.url = payload.url;
        
    },
    visibleVideo: (state, payload) => {
        state.visibleVideo.status = payload.status;
        state.visibleVideo.url = payload.url;
        
    }

}
const actions = {
    setTopFolder(context, payload) {                            //设置顶级文件夹名字，id等
        context.commit('setNewFolder', payload);
        context.commit('creating', false);
    },
    clearReNaming(context) {                                       //清除正在命名状态
        context.commit('renaming', false);
    },
    queryAll(context, dir_id) {                                     //查询文件夹以及文件
        context.commit('spinShow', true);
        let datas = {}
        if (dir_id) {
            datas.dir_id = dir_id;
        }
        Source.queryAll(datas).then((res) => {
            // console.log(res.data.data)
            let folderInfo = res.data.data.map((e) => {
                let obj = e;
                // if (e.url) {
                //     obj.url = utils.URL_WEBSITE + e.url;
                // }
                return obj;
            })
            context.commit('initTopFolder', folderInfo);
            context.commit('dir_id', dir_id ? dir_id : '');
            context.commit('spinShow', false);
        })
    },
    createFolder(context, newFolder) {                                 //新建文件夹
        let datas = {}
        datas.name = newFolder.name;
        if (newFolder.dir_id) {
            datas.dir_id = newFolder.dir_id;
        }
        Source.createFolder(datas).then((res) => {
            let setFolder = {
                index: newFolder.index,
                name: newFolder.name,
                _id: res.data._id,
                type: 'folder'
            }
            context.dispatch('setTopFolder',setFolder);
            context.dispatch('clearReNaming');
        })
    },
    updateFolderName(context, payload) {                                //重命名
        let datas = payload;
        if(payload.type == 'folder'){   //重命名文件夹
            Source.updateFolderDir(datas).then((res) => {
                console.log(res)
                if(res.data.code==0){
                    let setFolder = {
                        index: payload.index,
                        name: payload.name,
                    }
                    context.dispatch('setTopFolder',setFolder);
                    context.commit('renaming', false);
                }
            })
        }else{                          //重命名文件
            Source.updateFolderFile(datas).then((res) => {
                console.log(res)
                if(res.data.code==0){
                    let setFolder = {
                        index: payload.index,
                        name: payload.name,
                    }
                    context.dispatch('setTopFolder',setFolder);
                    context.commit('renaming', false);
                }
            })

        }
    },
    deleteTopFolder(context, payload) {                             //删除文件 以及空文件夹  支持多选
        // context.commit('spinShow', true);
        let folderArr = [];
        let fileArr = [];
        // console.log(state.selectedFolder)
        state.selectedFolder.map((e,i)=>{
            state.topFolder.map((el,j)=>{
                if(e==el._id){
                    if(el.type=='folder'){
                        folderArr.push(e)
                    }else{
                        fileArr.push(e)
                    }
                }
            })
        })
        let folderString = folderArr.join(',');
        let fileString = fileArr.join(',');
        let datas = {};
        datas.dir_id = folderString;
        datas.file_id = fileString;
        context.commit('spinShow', true);
        Source.deleteTopFolder(datas).then((res)=>{
            console.log(res)
            if(!res.data.code==0){
                context.commit('message',true);
                setTimeout(()=> {
                    context.commit('message',false);
                }, 500);
            }

            context.commit('clearSelectedId');
            context.dispatch('queryAll', state.dir_id);
            setTimeout(()=> {
                context.commit('spinShow', false);
            }, 500);
            
        })
    }


}
const getters = {

}
const moduleSource = {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
export default moduleSource