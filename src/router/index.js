import Vue from 'vue'
import Router from 'vue-router'

import './../../node_modules/bootstrap/dist/js/bootstrap.min';
import './../../node_modules/bootstrap/dist/css/bootstrap.css';

import GoodsList from '@/views/GoodsList.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: GoodsList
    }
  ]
})
