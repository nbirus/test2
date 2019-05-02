// add helpers
import Directives from '@/services/DirectiveService'
import * as Filters from '@/services/FilterService'
// import GlobalComponents from '@/global'

import { get, cloneDeep } from 'lodash'
import { truthy } from '@/services/CommonsService'
const helpers = {
  get,
  cloneDeep,
  truthy,
}

export function createTestVue(localVue) {

  // global
  // for (const component in GlobalComponents) {
  //   localVue.component(component, GlobalComponents[component])
  // }

  // filters
  for (const filter in Filters) {
    localVue.filter(filter, Filters[filter])
  }

  // directives
  for (const directive in Directives) {
    localVue.directive(directive, Directives[directive])
  }
  
  // helpers
  localVue.use({ install() { localVue.prototype.$h = helpers } })
  
  // icon
  localVue.component('icon', { name: 'icon', render(h) {} })

  localVue.config.logModifiedComponents = () => {}
  
}
