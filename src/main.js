/*
  入口js
*/
import Vue from 'vue'
import App from './App'
import router from './router/index'

const vm = new Vue({
  el: '#app',
  router,
  render: h => h(App)
  /* components:{
    App
  },
  template:'<App/>' */
})
Vue.use(vm)
