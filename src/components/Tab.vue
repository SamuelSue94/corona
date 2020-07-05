<template>
  <div class="container">
    <el-menu mode="horizontal" :default-active="activeIndex" @select="handleSelect" background-color="#545c64"
             text-color="#fff"
             active-text-color="#ffd04b">
      <el-menu-item index="1">全国数据</el-menu-item>
      <el-menu-item index="2">修改数据</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'Tab',
  data () {
    return {
      activeIndex: '1'
    }
  },
  methods: {
    handleSelect (key) {
      switch (key) {
        case '1':
          this.$router.push(
            { path: '/' }
          )
          break
        case '2':
          console.log(2)
          this.$router.push(
            { path: '/update' }
          )
          break
      }
    }
  }
}
</script>

<style scoped lang="less">
  .container {
    position: fixed;
    z-index: 999;
    width: 100%;
    background: #545c64;
    display: flex;
    justify-content: center;

    .el-menu-item {
      width: 300px;
      text-align: center;
    }
  }
</style>
