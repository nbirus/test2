
import ripple from './ripple'

const install = function(Vue) {
  Vue.directive('ripple', ripple)
}

if (window.Vue) {
  window.ripple = ripple
  Vue.use(install); // eslint-disable-line
}

ripple.install = install
export default ripple