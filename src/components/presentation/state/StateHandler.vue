<template>
  <transition :name="transitionName" mode="out-in">

    <!-- loading -->
    <default-loading v-if="loadingCondition && loadingDefault"></default-loading>
    <slot v-else-if="loadingCondition" name="loading"></slot>

    <!-- error -->
    <default-error :error="error" :refresh="refresh" v-else-if="errorCondition && errorDefault"></default-error>
    <slot v-else-if="errorCondition" name="error"></slot>

    <!-- response -->
    <slot v-else></slot>
    
  </transition>
</template>

<script>
import DefaultLoading from './Loading'
import DefaultError from './Error'

export default {
  name: 'state-handler',
  components: { DefaultLoading, DefaultError },
  props: {
    data: [Object, Array],
    loading: Boolean,
    error: [String, Error],
    refresh: Function,
    ignoreLoading: Boolean,
    ignoreError: Boolean,
    keepResponseAlive: Boolean,
    transitionName: {
      type: String,
      default: 'fade'
    },
  },
  computed: {

    loadingCondition() {
      if (this.keepResponseAlive && this.hasResponse) {
        return false
      }
      else {
        return !this.ignoreLoading && this.loading
      }
    },
    errorCondition() {
      return !this.ignoreError && this.$h.truthy(this.error)
    },

    loadingDefault() {
      return !this.$slots.hasOwnProperty('loading')
    },
    errorDefault() {
      return !this.$slots.hasOwnProperty('error')
    },
    hasResponse() {
      return this.$h.truthy(this.data)
    },

  },
}
</script>
