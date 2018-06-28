
<template>
    <div class="layout" :class="{'layout-hide-text': spanLeft < 4}">
        <Row type="flex">
            <Col :span="spanLeft" class="layout-menu-left">
            <Menu :active-name="activeName" theme="dark" width="auto">
                <div class="layout-logo-left">{{title}}</div>
                <router-link :to="{path:'/lesson'}">
                    <MenuItem name="lesson">
                    <Icon type="ios-navigate" :size="iconSize"></Icon>
                    <span class="layout-text">课程管理</span>
                    </MenuItem>
                </router-link>
                <router-link :to="{path:'/resources'}">
                    <MenuItem name="resources">
                    <Icon type="ios-keypad" :size="iconSize"></Icon>
                    <span class="layout-text">资源管理</span>
                    </MenuItem>
                </router-link>
                <router-link :to="{path:'/activity'}">
                    <MenuItem name="activity">
                    <Icon type="ios-analytics" :size="iconSize"></Icon>
                    <span class="layout-text">活动管理</span>
                    </MenuItem>
                </router-link>
                <router-link :to="{path:'/template'}">
                    <MenuItem name="template">
                    <Icon type="ios-color-filter" :size="iconSize"></Icon>
                    <span class="layout-text">模板管理</span>
                    </MenuItem>
                </router-link>
                <router-link :to="{path:'/statistics'}">
                    <MenuItem name="statistics">
                    <Icon type="pie-graph" :size="iconSize"></Icon>
                    <span class="layout-text">数据统计</span>
                    </MenuItem>
                </router-link>
                <router-link :to="{path:'/collection'}">
                    <MenuItem name="collection">
                    <Icon type="funnel" :size="iconSize"></Icon>
                    <span class="layout-text">集合页管理</span>
                    </MenuItem>
                </router-link>
            </Menu>
            </Col>
            <Col :span="spanRight">
            <div class="layout-header">
                <Button type="text" @click="toggleClick">
                            <Icon type="navicon" size="32"></Icon>
                        </Button>
                <div class="layout-title">
                    <!-- {{curTitle}} -->
                </div>
                <div class="layout-exit">
                    <a href="javascript:;" class="logout fr" @click="logout">
                        <!--<Icon type="log-out" size="24" color="#FFF"></Icon>-->
                        <Icon type="android-exit" size="20" color="#888"></Icon>
                    </a>
    
                    <Dropdown class="fr" style="margin: 0 20px;">
                        <a href="javascript:void(0)">
                            {{curGzhName}}
                            <Icon type="arrow-down-b"></Icon>
                        </a>
                        <DropdownMenu slot="list">
                            <DropdownItem v-for="item in gzhList" :key="item._id" v-html="item.name" @click.native="selectGzh(item._id, item.name)"></DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
    
                    <p class="user fr">{{user}} 您好! 💕</p>
                </div>
            </div>
    
    
            <router-view></router-view>
            <div class="layout-copy">
                2011-2018 &copy; koolearn
            </div>
            </Col>
        </Row>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex';
    // import { createNamespacedHelpers } from 'vuex'
    // const {mapState, mapActions} = createNamespacedHelpers('moduleLogin')
    import { USER_SIGNOUT } from '@/store/login'
    
    export default {
        data() {
            return {
                curGzhName: '',
                curGzhId: '',
                title: '微信课',
                curTitle: '对对对',
                activeName: 'lesson',
                spanLeft: 2,
                spanRight: 22
            }
        },
        created() {
            //绑定路由选中当前菜左侧单
            let lessonReg = /^\/lesson.*$/;
            let resourcesReg = /^\/resources.*$/;
            let activityReg = /^\/activity.*$/;
            let templateReg = /^\/template.*$/;
            let statisticsReg = /^\/statistics.*$/;
            let collectionReg = /^\/collection.*$/;
            let curRouter = this.$router.history.current.fullPath;
            // console.log(curRouter)
            // console.log(templateReg.test(curRouter))
            if (lessonReg.test(curRouter)) { //lesson
                this.activeName = 'lesson';
            }
            if (resourcesReg.test(curRouter)) { //resources
                this.activeName = 'resources';
            }
            if (activityReg.test(curRouter)) { //activity
                this.activeName = 'activity';
            }
            if (templateReg.test(curRouter)) { //template
                this.activeName = 'template';
            }
            if (statisticsReg.test(curRouter)) { //statistics
                this.activeName = 'statistics';
            }
            if (collectionReg.test(curRouter)) { //collection
                this.activeName = 'collection';
            }
    
    
            if (!this.user) {
                this.$router.push({
                    path: 'login'
                })
            }

            this.queryGzhList();
            this.curr_Gzh().then(res => {
                if(res.data.code == 0){
                    this.curGzhName = res.data.data.name
                    this.curGzhId = res.data.data._id
                    this.$store.commit('curGzhName', res.data.data.name)
                    this.$store.commit('curGzhId', res.data.data._id)
                }else{
                    this.$Message.error(res.data.msg)
                }
            })
        },
        mounted() {
        },
        computed: {
            ...mapState('moduleLogin', ['user']),
            ...mapState('moduleAppConfig', ['gzhList']),
            iconSize() {
                return this.spanLeft === 4 ? 14 : 24;
            }
        },
        methods: {
            ...mapActions('moduleLogin', [USER_SIGNOUT]),
            ...mapActions('moduleAppConfig', ['queryGzhList', 'select_Gzh', 'curr_Gzh']),
            logout() {
                this.USER_SIGNOUT();
            },
            toggleClick() {
                if (this.spanLeft === 4) {
                    this.spanLeft = 2;
                    this.spanRight = 22;
                    this.title = "微信课"
                } else {
                    this.spanLeft = 4;
                    this.spanRight = 20;
                    setTimeout(() => {
                        this.title = "微信课后台管理"
                    }, 200)
                }
            },
            selectGzh(gzhId, gzhName){
                if(gzhId != this.curGzhId){
                    this.select_Gzh({gzhId: gzhId}).then(res => {
                        if(res.data.code == 0){
                            this.curGzhName = gzhName
                            this.curGzhId = gzhId
                            this.$store.commit('curGzhName', gzhName)
                            this.$store.commit('curGzhId', gzhId)
                            // console.log(this.$router.history)
                            let curPath = this.$router.history.current.fullPath;    //切换公号后，子页面返回父路由
                            this.$router.replace({path: '/' + curPath.split('/')[1]})

                            this.$Message.success('切换成功');                            
                        }else{
                            this.$Message.error(res.data.msg)
                        }
                    })
                }
            }
        },
        watch: {

        }
    }
</script>

<style lang="scss">
    .fl {
        float: left;
        ;
    }
    
    .fr {
        float: right;
        ;
    }
    
    .tac {
        text-align: center;
    }
    
    .pos_r {
        position: relative;
    }
    
    .layout {
        min-width: 1000px;
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
        .ivu-input[disabled],
        fieldset[disabled] .ivu-input {
            color: #555;
            background: #f5f5f5;
        }
        .ivu-select-disabled {
            .ivu-select-selection {
                color: #555;
                background: #f5f5f5;
            }
        }
    }
    
    .layout-exit {
        width: 300px;
        height: 100%;
        line-height: 60px;
        float: right;
        color: #333;
        margin-right: 5px;
        .user {
            margin-right: 10px;
        }
    }
    
    .logout {
        width: 60px;
        height: 100%;
        float: right;
        text-align: center;
        padding-top: 3px;
        &:hover {
            background: #f1f1f1;
        }
    }
    
    .layout-content-main {
        padding: 10px;
    }
    
    .layout-copy {
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }
    
    .layout-menu-left {
        background: #464c5b;
    }
    
    .layout-header {
        height: 60px;
        background: #fff;
        box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
        .ivu-btn {
            padding: 13px 15px;
        }
    }
    
    .layout-title {
        display: inline-block;
        font-size: 16px;
    }
    
    .layout-logo-left {
        width: 90%;
        height: 30px;
        // background: #5b6270;
        border-radius: 3px;
        margin: 15px auto;
        font-size: 18px;
        color: #ffffff;
        text-align: center;
        line-height: 30px;
    }
    
    .layout-ceiling-main a {
        color: #9ba7b5;
    }
    
    .layout-hide-text .layout-text {
        display: none;
    }
    
    .ivu-col {
        transition: width .2s ease-in-out;
    }
    
    .layout-breadcrumb {
        padding: 10px 15px 0;
    }
    
    .layout-content {
        min-height: calc(100vh - 170px);
        margin: 15px;
        overflow: hidden;
        background: #fff;
        border-radius: 4px;
    }
    
    .queryTop {
        height: 46px;
        padding-bottom: 10px;
        border-bottom: 1px solid #efefef;
        .fbox {
            float: left;
            margin-right: 20px;
        }
    }
    
    .createBox {
        margin: 10px 0px;
    }
    
    .List {
        position: relative;
        .pageBox {
            // float: right;
            text-align: right;
            margin: 15px;
        }
    }
    
    .ivu-table-cell {
        button {
            margin: 3px 2px;
        }
    }
</style>