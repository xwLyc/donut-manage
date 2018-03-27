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
                <h1 class="tac top">集合页管理</h1>
                <div class="createBox">
                    <!-- <router-link :to="{path:'/collection/createCollection'}"> -->
                        <Button type="primary" @click="createCollection">新建集合页</Button>
                    <!-- </router-link> -->    
                </div>
                <div class="List">
                    <Table border :columns="columns" :data="collectionList"></Table>
                    <!-- <Page class-name="pageBox" :total="totalCount" :current="page+1" :page-size="pageCount" show-elevator  @on-change="lessonPage"></Page> -->
                    <!-- <Spin fix size="large" v-show="lessonLoad"></Spin> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
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
                                        marginRight: '5px'
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
                                            this.remove(params.index)
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

        methods: {
            createCollection(){
                // this.$store.dispatch('moduleLesson/initLessonInfo');
                this.$router.push({path:'/collection/createCollection'});
            },
            editCollection (_id) {
                this.$store.commit('moduleLesson/lessonCurId',_id);
                this.$store.commit('moduleLesson/lessonEdit',true);
                let timerEdit = setInterval(()=>{
                    if(this.lessonCurId){
                        this.$store.dispatch('moduleLesson/queryLessonDetail',_id);
                        this.$router.push({path: '/collection/createCollection'});
                        clearInterval(timerEdit);
                    }
                },10)
            },
            remove (index) {
                this.collectionList.splice(index, 1);
            },
        }
    }
</script>

<style lang="scss" scoped>
    
</style>
