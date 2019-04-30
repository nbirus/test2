import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'

import store from '@/store'
import '@/global';

// styles
import 'normalize.css/normalize.css'
import '@/styles/index.scss'

// utils
import '@/utils/PageTitle'

// helpers
import '@/services/HelperService'

// filters
import * as Filters from '@/services/FilterService'
for (const filter in Filters) {
  Vue.filter(filter, Filters[filter])
}

// directives
import Directives from '@/services/DirectiveService'
for (const directive in Directives) {
  Vue.directive(directive, Directives[directive])
}

// portal
import PortalVue from 'portal-vue'
Vue.use(PortalVue)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
