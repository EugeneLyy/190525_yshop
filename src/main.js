/*
  入口js
*/
import Vue from 'vue'
import App from './App'
import router from './router/index'
import store from './store'
import {Button} from 'mint-ui'
import VueLazyload from 'vue-lazyload'

import './mork/mockServer'
import loading from './common/imgs/loading.gif'
import './filters'
Vue.component(Button.name, Button)
Vue.use(VueLazyload, {
  loading
})

const vm = new Vue({
  el: '#app',
  router,
  render: h => h(App),
  store
  /* components:{
    App
  },
  template:'<App/>' */
})
Vue.use(vm)
