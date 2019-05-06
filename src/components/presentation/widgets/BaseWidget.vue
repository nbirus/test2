<template>
  <data-wrapper v-bind="$attrs" v-slot="{ _state, _refresh }" v-on="$listeners">
    <expand-wrapper class="widget" :class="_state" v-model="expanded">

      <!-- header -->
      <slot name="header"/>

      <!-- actions -->
      <slot
        name="actions"
        :_expand="expand" 
        :_collapse="collapse"
        :_refresh="_refresh"
      />

      <!-- body -->
      <slot
        name="body"
        :_state="_state" 
        :_refresh="_refresh"
      />

    </expand-wrapper>
  </data-wrapper>
</template>

<script>
import ExpandWrapper from '@/components/presentation/expand/ExpandWrapper'

export default {
  name: 'base-widget',
  inheritAttrs: false,
  components: { ExpandWrapper },
  data() {
    return {
      expanded: false,
    }
  },
  methods: {
    expand() {
      this.expanded = true
    },
    collapse() {
      this.expanded = false
    },
    widgetClass(state) {
      return {
        error: this.$h.truthy(state.error),
        loading: state.loading,
      }
    }
  }
}
</script>