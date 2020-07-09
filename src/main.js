import Vue from 'vue'
import App from './App.vue'
import router from './route.js'
import VModal from 'vue-js-modal'
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.http.options.root = 'https://vue2to.firebaseio.com/'
Vue.use(VModal, {
  dialog: true
})
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')