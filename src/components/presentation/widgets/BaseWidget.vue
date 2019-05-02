<template>
  <data-wrapper v-bind="$attrs" v-slot="{ _state, _refresh }" v-on="$listeners">
    <expand-container class="widget" :expanded="expanded" :collapse="collapse" :class="widgetClass(_state)">

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

    </expand-container>
  </data-wrapper>
</template>

<script>
import ExpandContainer from '@/components/presentation/expand/ExpandContainer'

export default {
  name: 'base-widget',
  inheritAttrs: false,
  components: { ExpandContainer },
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