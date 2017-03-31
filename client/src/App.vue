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
        <Form-item prop="user">
            <Input type="text" v-model="formInline.user" placeholder="Username">
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
            ...mapActions([
                'checkLogin'
            ]),
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.checkLogin(true);
                        this.$Message.success('提交成功!');
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