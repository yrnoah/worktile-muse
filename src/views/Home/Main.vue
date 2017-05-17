<template>
  <div class="layout">
    <home-nav></home-nav>
    <router-view></router-view>
  </div>
</template>

<script>
import HomeNav from '../../components/HomeNav';

export default {
  components: { HomeNav },
};
</script>

<style scoped lang="less">
  @import "~muse-ui/src/styles/colors.less";
  .layout {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
  }
  nav {
    width: 60px;
    height: 100%;
    background-color: @teal300;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 15px;
  }
  .icon {
    color: #FFF;
  }
  .avatar {
    width: 40px;
    height: 40px;
    color: #FFF;
    background-color: @deepPurple600;
    border-radius: 4px;
    padding: 0;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
  }
  .logo-item {
    padding: 20px 0;
    width: 100%;
    height: auto;
    cursor: pointer;
  }
  .logo {
    width: 50px;
    height: 50px;
    background: url('../../assets/logo.png') no-repeat;
    background-size: contain;
    margin: 0 auto;
  }
</style>
