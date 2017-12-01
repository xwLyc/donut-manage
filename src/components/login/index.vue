<template>
    <div class="login">
        <div class="box">
            <section class="main">
                <div class="top">
                    <img class="logo" src="../../assets/images/logo.png" />
                    <p class="title">自然拼读后台管理系统</p>
                </div>
                <Form ref="formInline" :model="formInline" :rules="ruleInline">
                    <Form-item prop="user">
                        <Input type="text" v-model="formInline.user" placeholder="Username">
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                        </Input>
                    </Form-item>
                    <Form-item prop="password" @keydown.enter.native="handleSubmit('formInline')">
                        <Input type="password" v-model="formInline.password" placeholder="Password">
                        <Icon type="ios-locked-outline" slot="prepend"></Icon>
                        </Input>
                    </Form-item>
                    <Form-item>
                        <Button type="primary" @click="handleSubmit('formInline')" long>登录</Button>
                    </Form-item>
                </Form>
            </section>
    
        </div>
    </div>
</template>

<script>
    import { createNamespacedHelpers } from 'vuex'
    const {mapState, mapActions} = createNamespacedHelpers('moduleLogin')
    // import { mapActions,mapState } from 'vuex'
    import { USER_SIGNIN} from "@/store/login"
    export default {
        data() {
            return {
                formInline: {
                    user: '',
                    password: ''
                },
                ruleInline: {
                    user: [{
                        required: true,
                        message: '请填写用户名',
                        trigger: 'blur'
                    }],
                    password: [{
                            required: true,
                            message: '请填写密码',
                            trigger: 'blur'
                        },
                        {
                            type: 'string',
                            min: 6,
                            message: '密码长度不能小于6位',
                            trigger: 'blur'
                        }
                    ]
                }
            }
        },
        methods: {
            ...mapActions([USER_SIGNIN]),
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        // this.$http.post(API + "/login", {
                        //     username: this.formInline.user,
                        //     password: this.formInline.password
                        // }).then((res) => {
                        //     if(res.data.code == 0){
                        //         this.USER_SIGNIN(this.formInline.user);
                        //         this.$router.replace({path:'/bookClassify'})
                        //     }else{
                        //         this.$Message.error('用户名或密码错误!');
                        //     }
                        // })
                        this.USER_SIGNIN(this.formInline.user);
                        this.$router.replace({path:'/lesson'})
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            }
        },
        mounted(){
            if(this.user){
                this.$router.replace({path:'/lesson'})
            }
        },
        computed:mapState({ user: state => state.user})

    }
</script>

<style lang="scss">
    .login {
        width: 100%;
        height: 100%;
        background: #2c3a4a;
        background: url('../../assets/images/bg8.png');
        // filter: blur(4px);

        background-size: 10px 10px;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        .box {
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            margin: auto;
            z-index: 9;
            width: 400px;
            height: 300px;
            border: 1px solid #ebebeb;
            background: #FFF;
            border-radius: 4px;
            section.main {
                width: 330px;
                margin: 0px auto;
                .top {
                    width: 100%;
                    height: 50px;
                    margin: 20px auto;
                    margin-bottom: 30px;
                    .logo {
                        height: 100%;
                        max-height: 100%;
                        float: left;
                    }
                    .title {
                        line-height: 50px;
                        float: right;
                        font-size: 24px;
                        font-weight: bold;
                        color: #4a6487;
                    }
                }
            }
        }
    }
</style>
