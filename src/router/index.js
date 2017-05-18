import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/views/Home/Main';
import Task from '@/views/Home/Task';
import Calender from '@/views/Home/Calender';
import Drive from '@/views/Home/Drive';
import Contacts from '@/views/Home/Contacts';

import Message from '@/views/Home/Message';
import SignUp from '@/components/Message/SignUp';
import ChatRoom from '@/components/Message/ChatRoom';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home/:id',
      name: 'Home',
      component: Home,
      children: [
        {
          path: 'message',
          name: 'Message',
          component: Message,
          children: [
            {
              path: 'sign-up',
              name: 'SignUp',
              component: SignUp,
            },
            {
              path: 'chat-room',
              name: 'ChatRoom',
              component: ChatRoom,
            },
          ],
        },
        {
          path: 'task',
          name: 'Task',
          component: Task,
        },
        {
          path: 'calender',
          name: 'Calender',
          component: Calender,
        },
        {
          path: 'drive',
          name: 'Drive',
          component: Drive,
        },
        {
          path: 'contacts',
          name: 'Contacts',
          component: Contacts,
        },
      ],
    },
  ],
});

/* eslint-disable no-param-reassign */
router.beforeEach((to, from, next) => {
  const routes = ['/home/', '/home'];
  if (routes.indexOf(to.path) > -1) {
    next({ path: '/home/0/message/chat-room', from });
    return;
  }
  next();
});

export default router;
