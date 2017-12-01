
<template>
    <div class="layout" :class="{'layout-hide-text': spanLeft < 5}">
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
                    <router-link :to="{path:'/statistics'}">
                        <MenuItem name="statistics">
                            <Icon type="ios-analytics" :size="iconSize"></Icon>
                            <span class="layout-text">数据统计</span>
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
    // import { mapState,mapActions } from 'vuex';
    import { createNamespacedHelpers } from 'vuex'
    const {mapState, mapActions} = createNamespacedHelpers('moduleLogin')
    import { USER_SIGNOUT } from '@/store/login'
    export default {
        data () {
            return {
                title: '多纳自然拼读后台管理',
                curTitle: '对对对',
                activeName: 'lesson',
                spanLeft: 5,
                spanRight: 19
            }
        },
        created(){
            //绑定路由选中当前菜左侧单
            let lessonReg = /^\/lesson(?:\/(?=$))?$/;
            let resourcesReg = /^\/resources(?:\/(?=$))?$/;
            let statisticsReg = /^\/statistics(?:\/(?=$))?$/;
            let curRouter = this.$router.history.current.fullPath;
            // console.log(statisticsReg.test(curRouter))
            if(lessonReg.test(curRouter)){  //lesson
                this.activeName = 'lesson';
            }
            if(resourcesReg.test(curRouter)){  //resources
                this.activeName = 'resources';
            }
            if(statisticsReg.test(curRouter)){  //statistics
                this.activeName = 'statistics';
            }


            if(!this.user){
                this.$router.push({path:'login'})
            }
        },
        computed: {
            ...mapState({ 
                user: state => state.user
            }),
            iconSize () {
                return this.spanLeft === 5 ? 14 : 24;
            }
        },
        methods: {
            ...mapActions([USER_SIGNOUT]),
            logout(){
                this.USER_SIGNOUT();
                this.$router.push({ path: '/login' })
            },
            toggleClick () {
                if (this.spanLeft === 5) {
                    this.spanLeft = 2;
                    this.spanRight = 22;
                    this.title = "自然拼读"
                } else {
                    this.spanLeft = 5;
                    this.spanRight = 19;
                    setTimeout(()=>{
                        this.title = "多纳自然拼读后台管理"
                    },200)
                }
            }
        },
        watch:{
            
        }
    }
</script>
<style lang="scss">
    .fl{
        float: left;;
    }
    .fr{
        float: right;;
    }
    .tac{
        text-align: center;
    }
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
        .ivu-input[disabled], fieldset[disabled] .ivu-input{
            color: #555;
            background: #f5f5f5;
        }
        .ivu-select-disabled {
            .ivu-select-selection{
                color: #555;
                background: #f5f5f5;
            }
        }

    }
    .layout-exit{
        width: 240px;
        height: 100%;
        line-height: 60px;
        float: right;
        color: #333;
        margin-right: 5px;
        .user{
            margin-right: 10px;
        }
    }
    .logout{
        width: 60px;
        height: 100%;
        float: right;
        text-align: center;
        padding-top: 3px;
        &:hover{
            background: #f1f1f1;
        }
        
    }
    .layout-content-main{
        padding: 10px;
    }
    .layout-copy{
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }
    .layout-menu-left{
        background: #464c5b;
    }
    .layout-header{
        height: 60px;
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
        .ivu-btn{
            padding: 13px 15px;
        }
    }
    .layout-title{
        display: inline-block;
        font-size: 16px;
    }
    .layout-logo-left{
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
    .layout-ceiling-main a{
        color: #9ba7b5;
    }
    .layout-hide-text .layout-text{
        display: none;
    }
    .ivu-col{
        transition: width .2s ease-in-out;
    }

    .layout-breadcrumb{
        padding: 10px 15px 0;
    }
    .layout-content{
        min-height: calc(100vh - 170px);
        margin: 15px;
        overflow: hidden;
        background: #fff;
        border-radius: 4px;
    }
</style>