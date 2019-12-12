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
      component: GoodsList,
      meta:{
        title:'电子商城'
      }
    },
    {
      path:'/cart',
      component:Cart,
      meta:{
        title:'购物车'
      }
    },
    {
      path:'/checkout',
      component:checkout,
      meta:{
        title:'订单结算'
      }
    }
  ]
})

