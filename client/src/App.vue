<template>
    <div class="layout">
        <template v-if="login">
            <headerbar></headerbar>
            <div class="layout-content">
                <Row>
                    <asidebar></asidebar>
                    <i-col span="19">
                        <div class="layout-content-main">
                        <router-view></router-view>
                        </div>
                    </i-col>
                </Row>
            </div>
            <footerbar></footerbar>
        </template>

<template v-else>
    <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
        <Form-item prop="name">
            <Input type="text" v-model="formInline.name" placeholder="Username">
            <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
        </Form-item>
        <Form-item prop="password">
            <Input type="password" v-model="formInline.password" placeholder="Password">
            <Icon type="ios-locked-outline" slot="prepend"></Icon>
            </Input>
        </Form-item>
        <Form-item>
            <Button type="primary" @click="handleSubmit('formInline')">登录</Button>
        </Form-item>
    </Form>
</template>
    </div>
</template>

<script>
    import Headerbar from './components/layout/Headerbar.vue'
    import Footerbar from './components/layout/Footerbar.vue'
    import Asidebar from './components/layout/Asidebar.vue'
    import {
        mapGetters,mapActions
    } from 'vuex'
    var CryptoJS = require('crypto-js');
    
    export default {
        data() {
            return {
                formInline: {
                    name: '1',
                    password: '111111'
                },
                ruleInline: {
                    name: [{
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
                }//end_ruleInline
            }
        },
        methods: {
            ...mapActions([
                'checkLogin'
            ]),
            handleSubmit(name) {//登录按钮事件
                let _this = this;
                this.formInline.password = CryptoJS.MD5(_this.formInline.password, { asString: true}).toString();
                // console.log(this.formInline);
                this.$refs[name].validate((valid) => {//ajax-login请求
                    if (valid) {
                        _this.$http.post('http://localhost:3000/users/login',_this.formInline).then(res=>{
                            console.log(res);
                            if(res.data){
                                this.checkLogin(true);
                            }else{
                                this.$Message.error('用户名或密码错误!');//服务器端配置user.controller--login+users.js的router
                            }
                        })

                        
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            }
        },
        components: {
            Headerbar,
            Footerbar,
            Asidebar
        },
        computed: mapGetters({
            login: 'login'
        })
    }
</script>

<style scoped>
    .layout {
        border: 1px solid #d7dde4;
        background: #f5f7f9;
    }
    
    .layout-breadcrumb {
        padding: 10px 15px 0;
    }
    
    .layout-content {
        min-height: 200px;
        margin: 15px;
        overflow: hidden;
        background: #fff;
        border-radius: 4px;
    }
    
    .layout-content-main {
        padding: 10px;
    }
</style>