// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import infiniteScroll from "vue-infinite-scroll"
import 'jquery'
import VueCurrencyFilter from 'vue-currency-filter'
import Vuex from "vuex"


import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';


Vue.config.productionTip = false;

/* eslint-disable no-new */
Vue.use(Vuex);
Vue.use(infiniteScroll);
Vue.use(ViewUI);
Vue.use(VueCurrencyFilter,
  {
    symbol : '￥',
    thousandsSeparator: ',',
    fractionCount: 2,
    fractionSeparator: '.',
    symbolPosition: 'front',
    symbolSpacing: true
  });

router.beforeEach((to,from,next) =>{
  if (to.meta.title){
    document.title = to.meta.title;
  }
  next()
});


//vuex 状态管理保存了用户名和购物车数量
const store = new Vuex.Store({
  state:{
    userName:'',
    cartCount:0,
  },
  mutations:{
    upDataUserInfo(state,newName){
      state.userName = newName;
    },
    upDataCartCount(state,Count){
      state.cartCount += Count;
    },
    initCartCount(state,Count){
      state.cartCount = Count;
    }
  }

});



new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
