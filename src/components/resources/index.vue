<template>
    <div class="">
        <div class="layout-breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem href="#">资源管理</BreadcrumbItem>
                <!-- <BreadcrumbItem href="#">应用中心</BreadcrumbItem>
                <BreadcrumbItem>某应用</BreadcrumbItem> -->
            </Breadcrumb>
        </div>
        <div class="layout-content laycontent">
            <div class="layout-content-main">
                <v-source></v-source>
            </div>
        </div>
    </div>
</template>
<script>
import vSource from './source.vue'
export default {
  components:{
      vSource
  }
}
</script>
<style lang="scss">
    .laycontent{
        height: calc(100vh - 170px);
        // overflow-y: scroll;
    }
</style>

