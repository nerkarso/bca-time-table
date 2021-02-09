import Vue from 'vue';
import Router from 'vue-router';
import Day from './views/Day.vue';
import Days from './views/Days.vue';

Vue.use(Router);

export default new Router({
  linkActiveClass: 'is-active',
  routes: [
    {
      path: '/',
      redirect: '/days'
    },
    {
      path: '/days',
      component: Days,
      children: [
        {
          path: '',
          redirect: '0'
        },
        {
          path: ':index',
          name: 'day',
          component: Day
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
});
