<template>
    <div class="">
        <div class="layout-breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem href="#">消息模板管理</BreadcrumbItem>
                <!-- <BreadcrumbItem href="#">应用中心</BreadcrumbItem>
                <BreadcrumbItem>某应用</BreadcrumbItem> -->
            </Breadcrumb>
        </div>
        <div class="layout-content">
            <div class="layout-content-main">
                <div class="queryTop">
                    <div class="fbox">
                        <Input v-model.trim="value" style="width: 360px">
                        <Select v-model="select" slot="prepend" style="width: 120px">
                            <Option value="wx_id">消息模板id</Option>
                            <Option value="title">消息模板标题</Option>

                        </Select>
                        </Input>
                    </div>
                    <div class="fbox">
                        <Button type="primary" @click="queryTemplateList">查询</Button>
                    </div>
                </div>
                
                <div class="createBox">
                    <Button type="primary" @click="newCreateTemplate">新建消息模板</Button>
                </div>

                <div class="List">
                    <Table border :columns="columns" :data="templateList"></Table>
                    <Page class-name="pageBox" :total="totalCount" :current="page+1" :page-size="pageCount" show-elevator  @on-change="templatePage"></Page>
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
    data(){

        return {
            value: '',
            select: 'wx_id',
            modal1: false,
            page: 0,
            // totalCount: 1,
            templateId: '',
            paramsIndex: 0,
            // Load: false,
            columns: [
                    {
                        title: '模板id',
                        key: 'wx_id',
                    },
                    {
                        title: '模板标题',
                        key: 'title',
                        // width: 100
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 160,
                        // fixed: 'right',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'info',
                                        size: 'small'
                                    },
                                    style: {
                                        // marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.editTemplate(params.row._id);
                                        }
                                    }
                                }, '修改'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    style: {
                                        
                                    },
                                    on: {
                                        click: () => {
                                            this.paramsIndex = params.index;
                                            this.templateId = params.row._id;
                                            this.modal1 = true;
                                        }
                                    }
                                }, '删除'),
                                
                            ]);
                        }
                    }
                ],
            
        }
    },
    created(){
        // 查询
        this.queryTemplate('');                                
        // 清除正在编辑状态以及编辑_id
        this.clearId();
    },
    methods: {
        ...mapActions('moduleTemplate',['queryTemplate','removeTemplate','clearId']),
        newCreateTemplate(){
            this.$router.push({name: 'editTemplate'})
        },
        queryTemplateList(){
            let data = {}
            data[this.select] = this.value;
            this.queryTemplate(data);
        },
        editTemplate(_id){
            this.$store.commit('moduleTemplate/templateEdit', true);
            this.$store.commit('moduleTemplate/editTemplateId', _id);
            this.$router.push({ name: 'editTemplate'});
        },
        ok(){
            this.remove(this.paramsIndex, this.templateId);
        },
        cancel(){
            this.modal1 = false;
        },
        remove (index, _id) {
            this.removeTemplate(_id).then(res => {
                if(res.data.code == 0){
                    this.templateList.splice(index, 1);
                    this.$Message.success('删除成功！');
                }else{
                    this.$Message.error({
                        content: res.data.msg + '(此模板已被使用！)',
                        duration: 3
                    });

                }
            })
        },
        templatePage(page){
            let data = {}
            data[this.select] = this.value;
            data.page = page-1;
            this.queryTemplate(data);
        }
    },
    computed: {
        ...mapState('moduleTemplate', ['templateList','totalCount','pageCount','templateEdit','Load'])
    },
    watch: {

    }
}
</script>
<style lang="scss">
</style>

