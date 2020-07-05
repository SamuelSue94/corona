<template>
  <div id="app">
    <tab></tab>
    <div class="m-container">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import Tab from '@/components/Tab'

export default {
  name: 'app',
  components: { Tab }
}
</script>

<style lang="less">
  @import '~style/common.less';
  #app {
    overflow: hidden;
    background: @color-bg;
    .m-container{
      margin: 61px 50px 0;
    }
  }

</style>
