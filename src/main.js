import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './assets/styles/components.styl'
import './assets/styles/fonts.styl'
import './assets/styles/settings.styl'

import './registerServiceWorker'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
