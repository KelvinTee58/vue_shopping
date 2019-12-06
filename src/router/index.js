import Vue from 'vue'
import Router from 'vue-router'

import './../../node_modules/bootstrap/dist/js/bootstrap.min';
import './../../node_modules/bootstrap/dist/css/bootstrap.css';

import GoodsList from '@/views/GoodsList.vue';
import Cart from '@/views/Cart.vue';
import checkout from '@/views/checkout.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: GoodsList
    },
    {
      path:'/cart',
      component:Cart
    },
    {
      path:'/checkout',
      component:checkout
    }
  ]
})
