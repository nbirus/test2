<template>
  <transition name="fade" mode="out-in">

    <!-- loading -->
    <loading-slot v-if="loadingCondition && loadingDefault"></loading-slot>
    <slot v-else-if="loadingCondition" name="loading"></slot>

    <!-- error -->
    <error-slot v-else-if="errorCondition && errorDefault"></error-slot>
    <slot v-else-if="errorCondition" name="error"></slot>

    <!-- response -->
    <slot v-else></slot>
    
  </transition>
</template>

<script>
import LoadingSlot from './Loading'
import ErrorSlot from './Error'

export default {
  name: 'state-handler',
  components: { LoadingSlot, ErrorSlot },
  props: {
    response: Object,
    loading: Boolean,
    error: [String, Error],
    ignoreLoading: Boolean,
    ignoreError: Boolean,
  },
  computed: {

    loadingCondition() {
      return !this.ignoreLoading && this.loading
    },
    errorCondition() {
      return !this.ignoreError && this.error !== undefined
    },

    loadingDefault() {
      return !this.$slots.hasOwnProperty('loading')
    },
    errorDefault() {
      return !this.$slots.hasOwnProperty('error')
    },

  },
}
</script>
