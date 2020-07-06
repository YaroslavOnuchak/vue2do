import Vue from 'vue'
import App from './App.vue'
import router from './route.js'
import VModal from 'vue-js-modal'


Vue.use(VModal, {
  dialog: true
})
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')