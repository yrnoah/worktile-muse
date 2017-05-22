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
    <transition-group>
      <canvas
        v-for="(message, index) in messages.slice(0, 10)"
        :key="index"
        :id="`danmu${index}`"
        class="danmu"
        :width="getCanvasWidth(message.CONTENT)"
        :height="canvasYSize"
        :style="canvasStyle(index, message.CONTENT)">
      </canvas>
      <!-- 问题： 使用p标签的存放弹幕的话，暂未找到较好的方法测量字符串长度，从而使动画开始时的初始位置在屏幕之外 -->
      <!-- 问题： 使用canvas 暂未找到较好方法在vue中修改keyframe使动画适配当前屏幕宽度 -->
      <!--<p v-for="(message, index) in messages"
        :key="index"
        :id="`danmu${index}`"
        class="danmu"
        :style="canvasStyle(index)">{{message.CONTENT}}</p>-->
    </transition-group>
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
      canvasXSize: 200,
      canvasYSize: 30,
      contentSended: false,
      canvasTopDistanceOffset: 0, // 超出一屏高度后使弹幕再次从顶部开始渲染
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
        this.contentSended = true;
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
        setTimeout(this.initCanvas);
      });
    },
    // 测量弹幕字符串宽度
    measureTextWidth(content) {
      const canvas = document.createElement('CANVAS');
      if (canvas.getContext) {
        const ctx = document.createElement('CANVAS').getContext('2d');
        ctx.font = '20px serif';
        const text = ctx.measureText(content);
        return (text && text.width) || 0;
      }
      return 0;
    },
    getCanvasWidth(text) {
      return this.measureTextWidth(text);
    },
    // 初始化每个弹幕canvas属性
    initCanvas() {
      const canvas = document.querySelectorAll('.danmu');
      if (canvas.length && canvas[0].getContext) {
        canvas.forEach((c, index) => {
          const ctx = c.getContext('2d');
          const text = this.messages[index].CONTENT;
          // const textWidth = this.measureTextWidth(text);
          // if (!textWidth) return;
          // this.canvasXSize = textWidth;
          setTimeout(() => this.drawCanvas(ctx, text));
        });
      }
    },
    // 绘制
    drawCanvas(ctx, text) {
      ctx.clearRect(0, 0, this.canvasXSize, this.canvasYSize);
      ctx.font = '20px serif';
      const colors = ['#f44336', '#9c27b0', '#4fc3f7', '#1976d2', '#ffc107'];
      ctx.fillStyle = colors[Math.floor(Math.random() * 5)];
      ctx.fillText(text, 0, 20);
    },
    canvasStyle(index, text) {
      // const danmuEl = document.querySelector(`#danmu${index}`);
      // const danmuEl = this.$children[3] && this.$children[3].$el.children;
      // if (!danmuEl) return null;
      const colors = ['#f44336', '#9c27b0', '#4fc3f7', '#1976d2', '#ffc107'];
      const baseIndex = index - this.canvasTopDistanceOffset;
      const pageTopPadding = 20;
      const lineHeight = 20;
      let topDistance = (lineHeight * baseIndex) + pageTopPadding;
      if (topDistance > this.$el.clientHeight) {
        this.canvasTopDistanceOffset = index - 1;
        topDistance = (lineHeight * 1) + pageTopPadding;
      }
      let style;
      if (index >= 0) {
        style = `top: ${topDistance}px; animation: scroll 8s linear; animation-delay: ${index * 0.8}s;` +
                `right: ${-1 * this.getCanvasWidth(text)}px;` +
                `color: ${colors[Math.floor(Math.random() * 5)]};`;
                // `right: ${-1 * this.getCanvasWidth(text)}px;` +
                // `right: ${-1 * danmuEl.clientWidth}px;` +
      } else {
        // 输入新的文字后弹幕的样式
      }
      return style;
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
    // font-size: 20px;
    // top: 20%;
    // left: 20%;
    // right: 0;
    // top: 20px;
    // outline: 1px solid red;
    // background-color: rgba(0, 0, 0, .2);
  }
  // .scrollX {
  //   animation: scroll 8s linear;
  // }
  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      // todo: 如何动态传入页面宽度及文字宽度
      transform: translateX(-2000px);
    }
  }
</style>
