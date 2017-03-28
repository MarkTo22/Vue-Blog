<template>
    <div class="layout">
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
    </div>
</template>
<script>
  import Headerbar from './components/layout/Headerbar.vue'
  import Footerbar from './components/layout/Footerbar.vue'
  import Asidebar from './components/layout/Asidebar.vue'
    export default {
        components:{
          Headerbar,
          Footerbar,
          Asidebar
        }
    }
</script>

<style>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
    }
    .layout-breadcrumb{
        padding: 10px 15px 0;
    }

    .layout-content{
        min-height: 200px;
        margin: 15px;
        overflow: hidden;
        background: #fff;
        border-radius: 4px;
    }
    .layout-content-main{
        padding: 10px;
    }
    
</style>
