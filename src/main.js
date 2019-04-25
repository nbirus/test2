import Vue from 'vue'
import App from './App.vue'
import router from './router'

import store from './store'
import './global';

// styles
import 'normalize.css/normalize.css'
import '@/styles/index.scss'

// utils
import './utils/PageTitle'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
