<template>
  <data-wrapper v-bind="$attrs" v-slot="{ _state, _refresh }" v-on="$listeners" :params="params">
    <state-handler v-bind="_state" ignore-loading keep-response-alive>

      <expand-container class="filtered-data-table" v-bind="{ expanded, collapse }" :class="{ expanded }">
        
        <filter-bar 
          class="filtered-data-table-form"
          v-bind="$attrs" 
          :loading="_state.loading" 
          @submit="formSubmit"
        />

        <data-table
          class="filtered-data-table-body"
          v-bind="[$attrs, _state]"
          v-on="$listeners"
          width="100"
          fit
        />

        <btn @click="expanded=!expanded">toggle</btn>

      </expand-container>
      
    </state-handler>
  </data-wrapper>
</template>

<script>
import DataTable from '@/components/presentation/grid/DataTable'
import FilterBar from '@/components/presentation/grid/FilterBar'
import ExpandContainer from '@/components/presentation/expand/ExpandContainer'

export default {
  name: 'filtered-data-table',
  inheritAttrs: false,
  components: {
    ExpandContainer,
    DataTable,
    FilterBar,
  },
  data() {
    return {
      params: {},
      expanded: true,
    }
  },
  methods: {
    formSubmit(params) {
      this.params = Object.freeze(params)
    },
    collapse() {
      this.expanded = false
    },
  }
}
</script>

<style lang="scss">

.filtered-data-table {
  display: flex;
  flex-direction: column;
  background: white;

  &.expanded {
    z-index: 100;
    position: fixed;
    padding: 2rem;
    border-radius: .35rem;
    top: 48%;
    left: 50%;
    margin: -400px 0 0 -400px;
    width: 800px;
    height: 800px;
    box-shadow: 0 6px .75rem .05rem fade-out(black, .95);
  }
}
.filtered-data-table-form {
  flex: 0 0 auto;
}
.filtered-data-table-body {
  flex: 0 1 100%;
}

</style>
