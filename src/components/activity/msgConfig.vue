<template>
    <div class="msgConfig">
        <div class="layout-breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem href="/activity">活动管理</BreadcrumbItem>
                <BreadcrumbItem href="/activity/msgConfig">消息配置</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="layout-content">
            <div class="layout-content-main" style="position:relative;">
                <h1 class="tac top">消息配置 - {{activityType ? '普通裂变类':'续期课程类'}}</h1>
                <Tabs @on-click="tolink">
                    <!-- 普通裂变类 -->
                    <template v-if="activityType">
                        <TabPane label="解锁" name="lb_msgUnLock"></TabPane>
                        <TabPane label="学习" name="lb_msgStudy"></TabPane>
                    </template>
                    <!-- 续期课程类 -->
                    <template v-else>
                        <TabPane label="解锁" name="xq_msgUnLock"></TabPane>
                        <TabPane label="学习" name="xq_msgStudy"></TabPane>
                        <TabPane label="续期" name="xq_msgRenewal"></TabPane>

                    </template>
                </Tabs>

                <router-view></router-view>
            </div>
        </div>

  
       
    </div>
</template>
<script>
    // import vLbUnlock from './liebian/msgUnLock'
    // import vLbStudy from './liebian/msgStudy'

    import { mapState, mapActions } from 'vuex'
    export default {
        data () {
            return {
            }
        },
        mounted(){
            this.queryTemplate({
                pageCount: 50
            })
            if(this.activityType){
                this.$router.push({name: 'lb_msgUnLock'})
            }else{
                this.$router.push({name: 'xq_msgUnLock'})
            }
        },
        methods: {
            ...mapActions('moduleTemplate',['queryTemplate']),
            tolink(name){
                this.$router.push({name: name})
            },
          
        },
        components: {
            // vLbUnlock, vLbStudy
        },
        computed: {
            ...mapState('moduleActivity',['activityType','activityCurId']),
            ...mapState('moduleTemplate',['templateList']),

        },
        watch: {
            
        }

    }
</script>
<style lang="scss" >
    .top{
        margin: 20px 0px;
    }
    .ivu-tabs{
        overflow: initial;
    }
    .textA{
        text-align: center;
        line-height: 68px;
    }

    .code-row-bg{
        margin-top: 20px;
    }
</style>
