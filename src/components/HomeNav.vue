<template>
  <nav class="nav">
    <div>
      <div class="logo-item">
        <div class="logo"></div>
      </div>
      <mu-icon-button icon="chat_bubble_outline" class="icon" :to="`/home/${id}/message`"/>
      <mu-icon-button icon="playlist_add_check" class="icon" :to="`/home/${id}/task`"/>
      <mu-icon-button icon="date_range" class="icon" :to="`/home/${id}/calender`"/>
      <mu-icon-button icon="folder_open" class="icon" :to="`/home/${id}/drive`"/>
    </div>
    <div>
      <mu-icon-button icon="perm_contact_calendar" class="icon" :to="`/home/${id}/contacts`"/>
      <mu-icon-button class="avatar">No</mu-icon-button>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      id: 0,
    };
  },
  methods: {},
};
</script>

<style scoped lang="less">
  @import "~muse-ui/src/styles/colors.less";
  nav {
    width: 60px;
    height: 100%;
    background-color: @teal300;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 15px;

    > div {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
  .icon {
    color: #FFF;
    width: 60px;
    height: 60px;
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 0;

    &:hover {
      border-radius: 0;
      background-color: rgba(0, 0, 0, .2);
    }
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
    margin-top: 15px;
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
    background: url('../assets/logo.png') no-repeat;
    background-size: contain;
    margin: 0 auto;
  }
</style>
