<template>
  <div>
    <Menu mode="horizontal" theme="dark" active-name="1">
        <div class="layout-logo"></div>
        <div class="layout-nav">
            <Menu-item name="1">
                <Icon type="ios-navigate"></Icon>
                <router-link to="/" activeClass="active" exact><span @click="selectedSubmenu = 'Submenu1'">平台首页</span></router-link>
            </Menu-item>
            <Menu-item name="2">
                <Icon type="ios-keypad"></Icon>
                <router-link to="/user" activeClass="active"><span @click="selectedSubmenu = 'Submenu2'">用户模块</span></router-link>
            </Menu-item>
            <Menu-item name="3">
                <Icon type="ios-analytics"></Icon>
                <router-link to="/upload" activeClass="active"><span @click="selectedSubmenu = 'Submenu3'">上传模块</span></router-link>
            </Menu-item>
            <Menu-item name="4">
                <Icon type="ios-paper"></Icon>
                <router-link to="/comment" activeClass="active"><span @click="selectedSubmenu = 'Submenu4'">评论模块</span></router-link>
            </Menu-item>
        </div>
    </Menu>
    <Menu mode="horizontal" active-name="1">
        <keep-alive>
            <component :is="selectedSubmenu">
                <span>default message</span>
            </component>
        </keep-alive>
    </Menu>
</div>
</template>

<script>
    import Submenu1 from '../submenu/Submenu1.vue'
    import Submenu2 from '../submenu/Submenu2.vue'
    import Submenu3 from '../submenu/Submenu3.vue'
    import Submenu4 from '../submenu/Submenu4.vue'

    export default{
        data (){
            return {
                selectedSubmenu:"Submenu1"
            }
        },
        components:{
            Submenu1,
            Submenu2,
            Submenu3,
            Submenu4
        }
    }

</script>

<style scoped>
    .active{
        color:white;
    }
    .layout-logo{
        width: 100px;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        float: left;
        position: relative;
        top: 15px;
        left: 20px;
    }
    .layout-nav{
        width: 620px;
        margin: 0 auto;
    }
    .layout-assistant{
        width: 400px;
        margin: 0 auto;
        height: inherit;
    }
    
</style>