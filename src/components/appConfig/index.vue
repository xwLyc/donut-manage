<template>
    <div class="appConfig pos_r">
        <canvas></canvas>
        <!-- <p>Click &amp; drag to rotate</p> -->
        <p><button class="reset-button">Reset</button></p>
        <div class="container pos_r">
            <Button type="primary" size="large" @click="modal1 = !modal1">添加公号</Button>
    
            <Table border :columns="columns1" :data="gzhList" class="mgt30 tac"></Table>
            <Spin fix size="large" v-show="spin"></Spin>
        </div>
        <Modal v-model="modal1" title="添加公号">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
                <FormItem label="公号名" prop="name">
                    <Input v-model="formValidate.name" placeholder="请输入公众号名字"></Input>
                </FormItem>
                <FormItem label="AppId" prop="appID">
                    <Input v-model="formValidate.appID" placeholder="请输入公众号appId"></Input>
                </FormItem>
                <FormItem label="KEY" prop="KEY">
                    <Input v-model="formValidate.KEY" placeholder="请输入公众号Key"></Input>
                </FormItem>
                <FormItem label="公号原始Id" prop="oid">
                    <Input v-model="formValidate.KEY" placeholder="请输入公众号oid"></Input>
                </FormItem>
            </Form>

            <div slot="footer">
                <Button @click="cancel" type="dashed">取消</Button>
                <Button @click="addGzh(formValidate.name, formValidate.appID, formValidate.KEY)" type="primary">确定</Button>
            </div>
        </Modal>
        
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'
    import houseCanvas from '@/utils/houseCanvas'
    export default {
        data() {
            return {
                editIndex: -1,
                editValue: '',
                spin: false,
                columns1: [{
                        title: '公号名',
                        align: 'center',
                        key: 'name',
                        render: (h, params) => {
                            
                            if(params.index == this.editIndex){
                                return h('Input', {
                                    props: {
                                        value: params.row.name,
                                        autofocus: true
                                    },
                                    on: {
                                        input: (val) =>{  //可获取当前value值
                                            this.editValue = val
                                        },
                                        "on-focus": (e) => {
                                            e.srcElement.select();
                                        },
                                        "on-blur": (e) => {
                                            if(params.row.name != e.target.value){
                                                this.editGzh(params.row._id, e.target.value)
                                            }else{
                                                this.editIndex = -1;
                                            }

                                        },
                                        "on-enter": (e) => {
                                            this.editIndex = -1;
                                            // console.log(e)
                                            // if(params.row.name != e.target.value){
                                            //     this.editGzh(params.row._id, e.target.value)
                                            // }else{
                                            //     this.editIndex = -1;
                                            // }
                                        }
                                    }
                                }, params.row.name)
                            }else{
                                return h('p', params.row.name)
                            }
                        }
                    },
                    {
                        title: 'appID',
                        align: 'center',
                        key: 'appId'
                    },
                    {
                        title: 'KEY',
                        align: 'center',
                        key: 'appSecret'
                    },
                    {
                        title: '公号原始id',
                        align: 'center',
                        key: 'oid'
                    },
                    {
                        title: '状态',
                        align: 'center',
                        key: 'status',
                        width: 90,
                        render: (h, params) => {
                            return h('p', params.row.status ? '配置成功' : '')
                        }
                    },
                    {
                        title: '操作',
                        align: 'center',
                        key: 'actions',
                        width: 150,
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'warning',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px',
                                        display: params.row.status ? 'none' : ''
                                    },
                                    on: {
                                        click: () => {
                                            this.initGzh(params.row._id)
                                        }
                                    }
                                }, '初始化'),
                                h('Button', {
                                    props: {
                                        type: 'success',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.editIndex = params.index
                                            console.log('index' + this.editIndex)
                                        }
                                    }
                                }, '修改')
                            ]);
                        }
                    },
                    {
                        title: '入口',
                        align: 'center',
                        key: 'enter',
                        width: 100,
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        display: params.row.status ? '' : 'none'
                                    },
                                    on: {
                                        click: () => {
                                            this.selectGzh(params.row._id)
                                        }
                                    }
                                }, '进入')
                            ]);
                        }
                    }
                ],
                data1: [{
                    name: '',
                    appID: '',
                    key: '',
                    status: '',
    
                }],
                modal1: false,

                formValidate: {
                    name: '',
                    appID: '',
                    key: '',
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '公号名不能为空！', trigger: 'blur' }
                    ],
                    appID: [
                        { required: true, message: 'appID不能为空！', trigger: 'blur' }
                    ],
                    KEY: [
                        { required: true, message: 'KEY不能为空！', trigger: 'blur' }
                    ],
                    oid: [
                        { required: true, message: '公号原始Id不能为空！', trigger: 'blur' }
                    ],
                }
            }
        },
        mounted() {
            console.log(this)
            houseCanvas();
            this.queryGzhList()
        },
        methods: {
            ...mapActions('moduleAppConfig', ['queryGzhList', 'createGzh', 'init_Gzh', 'select_Gzh']),
        
            cancel() {
                this.modal1 = false;
                this.$refs['formValidate'].resetFields();
            },
            addGzh(name, appId, key){
                this.$refs['formValidate'].validate((valid) => {
                    if (valid) {
                        let datas = {
                            name: name,
                            appId: appId,
                            appSecret: key
                        }
                        this.createGzh(datas).then(res => {
                            this.$Message.success('创建成功!');
                            this.queryGzhList().then(() => {
                                this.$refs['formValidate'].resetFields();
                                this.modal1 = false
                            })
                        })
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
                
            },
            editGzh(gzhId, name){
                this.createGzh({gzhId: gzhId, name: name}).then(res => {
                    // this.spin = true
                    this.queryGzhList().then(() => {
                        // this.spin = false
                    })
                    this.$Message.success('修改成功!');
                    this.editIndex = -1
                })
            },
            initGzh(gzhId){
                this.init_Gzh({gzhId: gzhId}).then(res => {
                    // console.log(res)
                    if(res.data.code == -1){
                        // this.$Message.error(res.data.msg, 5000);
                        this.$Message.error({
                            content: '我滴乖乖，公众号id是随便设置的么，请带上你的脑子上班~~~  <br/> 然后联系后台删除此条数据',
                            duration: 5
                        });
                    }else{
                        this.$Message.success('初始化成功');
                        this.queryGzhList()
                    }
                })
            },
            selectGzh(gzhId){
                this.select_Gzh({gzhId: gzhId}).then(res => {
                    if(res.data.code == 0){
                        this.$Message.success('进入成功');
                        this.$router.push({path: '/lesson'});
                    }else{
                        this.$Message.error(res.data.msg)
                    }
                })
            }
        },
        computed: {
            ...mapState('moduleAppConfig', ['gzhList'])
        },
        watch: {
            
        }
    }
</script>

<style lang="scss" scoped>
    html {
        height: 100%;
    }
    
    .pos_r {
        position: relative;
    }
    
    .mgt30 {
        margin-top: 30px;
    }
    
    .tac {
        text-align: center;
    }
    
    canvas {
        width: 18%;
        display: block;
        position: absolute;
        right: 2%;
        z-index: 2;
    }
    
    .reset-button {
        display: none;
    }
    
    a {
        color: #5AE;
    }
    
    a:hover {
        color: #247;
    }
    
    .container {
        width: 1000px;
        margin: 0 auto;
        padding: 100px;
        transform: translateX(-100px)
    }
</style>
