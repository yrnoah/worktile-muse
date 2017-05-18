<template>
  <div class="room-layout">
    <h3>chat room</h3>
    <mu-text-field label="请输入消息" v-model="content" labelFloat :maxLength="20" :errorText="inputErrorText" @textOverflow="handleInputOverflow"/>
    <mu-raised-button label="发送" class="demo-raised-button" primary @click="sendMessage" :disabled="!vaildated"/><br/>
    <mu-list class="message-list">
      <mu-sub-header style="text-align: left">最近聊天记录</mu-sub-header>
      <template v-for="message in messages">
        <mu-list-item class="content">
          <img slot="leftAvatar" class="avatar"/>
          <span slot="describe">
            <span style="color: rgba(0, 0, 0, .87)">{{message.USER}} -</span> {{message.CONTENT}}
            <br/>
            <span>{{new Date(message.TIMESMAP).toLocaleString()}}</span>
          </span>
          <mu-icon-menu slot="right" icon="more_vert" tooltip="操作">
            <mu-menu-item title="回复" />
            <mu-menu-item title="标记" />
            <mu-menu-item title="删除" />
          </mu-icon-menu>
        </mu-list-item>
        <mu-divider inset/>
      </template>
    </mu-list>
    <div class="danmu"></div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      content: '',
      inputErrorText: '',
      messages: [],
      user: null,
    };
  },
  computed: {
    vaildated() {
      const content = this.content.trim();
      if (content.length && content.length <= 20 && !this.inputErrorText) return true;
      return false;
    },
    userAvatar() {
      const avatar = `background-image: url(../../assets/avatar${0}.png)`;
      return avatar;
    },
  },
  mounted() {
    // mock 获取登录用户
    this.getUser();
    this.getMessages();
  },
  methods: {
    handleInputOverflow(isOverflow) {
      this.inputErrorText = isOverflow ? '超过啦！！！！' : '';
    },
    sendMessage() {
      const timesmap = Date.now();
      const { user, content } = this;
      const message = { user: user.NAME, content, timesmap };
      axios.post('/api/create_message', { message }).then((resp) => {
        console.log(resp, 'create message');
        const newMessage = {
          CONTENT: content,
          ID: this.messages.length + 1,
          TIMESMAP: timesmap,
          USER: user.NAME,
        };
        this.messages = [newMessage, ...this.messages];
      });
      this.content = '';
    },
    getUser() {
      if (!this.user) {
        axios.get('/api/get_users').then((resp) => {
          this.user = resp.data.result[3];
        });
      }
    },
    getMessages() {
      return axios.get('/api/get_messages').then((resp) => {
        this.messages = [...resp.data.result].reverse();
      });
    },
  },
};
</script>

<style scoped lang="less">
  .room-layout {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 10px;
  }
  h3 {
    padding: 0;
    margin: 0;
  }
  .avatar {
    width: 40px;
    height: 40px;
    background: url(../../assets/avatar0.png) no-repeat;
    background-size: cover;
    border-radius: 20px;
  }
  .content {
    text-align: left;
  }
  .message-list {
    max-height: 500px;
  }
  .danmu {
    position: fixed;
    top: 20%;
    left: 20%;
    width: 500px;
    height: 50px;
    outline: 1px solid red;
    background-color: rgba(0, 0, 0, .2);
  }
</style>
