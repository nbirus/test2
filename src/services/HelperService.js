import Vue from 'vue'
import { get, cloneDeep } from 'lodash'
import { truthy } from '@/services/CommonsService'

Vue.use({
  install() {
    Vue.prototype.$h = {
      get,
      cloneDeep,
      truthy,
    }
  }
})
