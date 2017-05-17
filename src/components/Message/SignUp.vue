<template>
  <div>
    <h3>创建新用户</h3>
    <input placeholder="请输入昵称" v-model="name" type="text"/>
    <input placeholder="请输入密码" v-model="password" type="text"/>
    <button @click.prevent="createUser">提交</button>
    <button @click.prevent="getUsers">获取全部用户</button>
    <!-- <button @click.prevent="createTable">创建表格</button> -->
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      name: '',
      password: '',
    };
  },
  methods: {
    createUser() {
      const { name, password } = this;
      if (!this.name || !this.password) return null;
      const user = { name, password };
      return axios.post('/api/create_user', { user }).then((resp) => {
        console.log(resp, 'create user');
      });
    },
    getUsers() {
      return axios.get('/api/get_users').then(resp => console.log(resp));
    },
    createTable() {
      return axios.post('/api/create_table', { table: 'MESSAGES' }).then((resp) => {
        console.log(resp, 'create table');
      });
    },
  },
};
</script>

<style scoped lang="less">
</style>
