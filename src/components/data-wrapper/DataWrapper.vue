<template functional>
  <component
    :is="data.attrs.resource ? injections.components.AsyncDataWrapper : injections.components.LocalDataWrapper" 
    v-bind="data.attrs"
    v-on="$listeners"
    v-slot="{ _state, _refresh }"
  >
    <slot :_state="_state" :_refresh="_refresh"></slot>
  </component>
</template>

<script>
import LocalDataWrapper from './LocalDataWrapper'
import AsyncDataWrapper from './AsyncDataWrapper'

export default {
  inheritAttrs: false,
  inject: {
    components: {
      default: {
        LocalDataWrapper,
        AsyncDataWrapper,
      }
    }
  }
}
</script>
