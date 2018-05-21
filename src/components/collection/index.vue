<template>
    <div class="">
        <div class="layout-breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem href="#">集合页管理</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="layout-content">
            <div class="layout-content-main">
                <h1 class="tac top">集合页管理</h1>
                <div class="createBox">
                    <Button type="primary" @click="newCreateCollection">新建集合页</Button>   
                </div>
                <div class="List">
                    <!-- 集合列表 -->
                    <Table border :columns="columns" :data="collectionList"></Table>
                    <!-- 分页组件 -->
                    <Page class-name="pageBox" :total="totalCount" :current="page+1" :page-size="pageCount" show-elevator  @on-change="collectionPage"></Page>
                    <!-- loading -->
                    <Spin fix size="large" v-show="Load"></Spin>
                </div>
            </div>
        </div>

        <Modal v-model="modal1" title="确定删除么？" @on-ok="ok" @on-cancel="cancel">
            <p>删除数据将不可恢复！</p>
        </Modal>

    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'
    export default {
        data () {
            return {
                modal1: false,
                page: 0,
                templateId: '',
                paramsIndex: 0,
                columns: [
                    { title: '课程名称', key: 'name' },
                    { title: '课节', key: 'section' },
                    { title: '课程类型', key: 'type' },
                    { title: '已学习人数', key: 'number' },
                    { title: '报名文章', key: 'article' },
                    { title: '课程入口', key: 'entry' },
                    { title: '标签', key: 'tag' },
                    { 
                        title: '操作', 
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '10px'
                                    },
                                    on: {
                                        click: () => {
                                            this.editCollection(params.row._id);
                                        }
                                    }
                                }, '编辑'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.paramsIndex = params.index;
                                            this.templateId = params.row._id;
                                            //弹框是否删除
                                            this.modal1 = true;
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                     }
                ],
                collectionList: [
                    {
                        name: '自然拼读中级',
                        section: 23,
                        type: '兑换类',
                        number: 12,
                        article: 'https://wx.donut.cn/app/spell/wx/index/book_course?course=5ab4bd65a3fd2c4251154b3f',
                        entry: 'https://wx.donut.cn/app/spell/wx/index/book_course?course=5ab4bd65a3fd2c4251154b3f',
                        tag: '最新',
                    },
                    {
                        name: '多纳自然拼读外教课（中级）',
                        section: 17,
                        type: '续期类',
                        number: 62,
                        article: 'https://wx.donut.cn',
                        entry: 'https://wx.donut.cn',
                        tag: '热门',
                    },
                    {
                        name: '能唱能玩的多纳英文启蒙绘本（第二级）',
                        section: 58,
                        type: '兑换类',
                        number: 36,
                        article: 'https://wx.donut.cn/app/spell/wx/index/course?course=5a5ef41c471dd33aa5854fec',
                        entry: 'https://wx.donut.cn/app/spell/wx/index/course?course=5a5ef41c471dd33aa5854fec',
                        tag: '热门',
                    },
                ]
                
            }
        },

        created(){
            // 查询集合列表数据
            // this.queryCollection('');  //连接后台后可放开该注释                              
            // 清除正在编辑状态以及编辑_id
            this.clearId();
        },

        methods: {
            ...mapActions('moduleCollection',['clearId','queryCollection']),
            newCreateCollection () {
                this.$router.push({name: 'editCollection'});
            },

            editCollection(_id){
                this.$store.commit('moduleCollection/collectionEdit', true);
                this.$store.commit('moduleCollection/editCollectionId', _id);
                this.$router.push({ name: 'editCollection'});
            },

            ok(){   //确认删除
                this.remove(this.paramsIndex, this.templateId);
            },

            cancel(){   //取消删除
                this.modal1 = false;
            },

            remove (index, _id) {
                this.removeCollection(_id).then(res => {
                    if(res.data.code == 0){
                        this.collectionList.splice(index, 1);   //在前端表格中删除
                        this.$Message.success('删除成功！');
                    }else{
                        this.$Message.error({
                            content: res.data.msg + '(此集合已被使用！)',
                            duration: 3    //3秒后消失
                        });

                    }
                })
            },

            collectionPage (page) {   //翻页查询
                let data = {};
                data.page = page-1;
                this.queryCollection(data);
            }
        },

        computed: {
            ...mapState('moduleCollection', ['totalCount','pageCount','collectionEdit','Load'])
            //删除data中定义的collectionList模拟数据后，需在此处定义collectionList
            // ...mapState('moduleCollection', ['collectionList','totalCount','pageCount','collectionEdit','Load'])
        },
    }
</script>

<style lang="scss" scoped>
    
</style>
