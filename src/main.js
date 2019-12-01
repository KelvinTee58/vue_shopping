// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import infiniteScroll from "vue-infinite-scroll"
import 'jquery'
import VueCurrencyFilter from 'vue-currency-filter'

import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';


Vue.config.productionTip = false;

/* eslint-disable no-new */
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


new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
