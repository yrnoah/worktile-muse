<template>
  <div class="layout">
    <div class="menu">
      <div class="header">
        <h3>Message</h3>
        <div class="buttons">
          <mu-icon-button icon="notifications_none" class="notification"/>
          <mu-icon-button icon="group_add" class="icon-add"/>
        </div>
      </div>
      <div class="search-area">
        <mu-icon value="search" color="#8f8f8f" :size="20"/>
        <input placeholder="Search Member or Message" class="search-item"/>
      </div>
      <mu-menu class="nav-menu">
        <mu-menu-item title="Chat Message" leftIcon="remove_red_eye" class="menu-item" :to="`${path}/chat-room`"/>
        <!--<mu-menu-item title="Drive Assistant" leftIcon="remove_red_eye" class="menu-item"/>
        <mu-menu-item title="Task Assistant" leftIcon="remove_red_eye" class="menu-item"/>
        <mu-menu-item title="Paragraph" leftIcon="¶" class="menu-item"/>-->
        <mu-menu-item title="Add User" leftIcon="remove_red_eye" class="menu-item" :to="`${path}/sign-up`"/>
      </mu-menu>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: 0,
      name: '',
      password: '',
    };
  },
  computed: {
    path() {
      return `/home/${this.id}/message`;
    },
  },
};
</script>

<style scoped lang="less">
  @import "~muse-ui/src/styles/colors.less";
  .layout {
    display: flex;
    flex-direction: row;
    height: 100%;
  }
  .menu {
    width: 230px;
    background-color: @grey200;
  }
  .header {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 15px;
  }
  .buttons {
    display: flex;
    flex-direction: row;
    flex: 1;
    justify-content: space-between;
  }
  .search-area {
    width: 200px;
    height: 34px;
    margin: 0 auto;
    background-color: #dcdcdc;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-radius: 2px;
    padding: 0 8px;
  }
  .search-item {
    line-height: 34px;
    padding: 0;
    border: none;
    background-color: #dcdcdc;
    outline: none;
    color: #8f8f8f;
    flex: 1;
    margin-left: 4px;
  }
  .nav-menu {}
  .menu-item {
    width: 230px;
  }
</style>
