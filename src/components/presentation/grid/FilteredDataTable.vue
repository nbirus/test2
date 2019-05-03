<template>
  <data-wrapper v-bind="$attrs" v-slot="{ _state, _refresh }" v-on="$listeners" :params="params">
    <state-handler v-bind="_state" ignore-loading>
      <filter-bar v-bind="$attrs" :loading="_state.loading" @submit="formSubmit">
        <data-table
          v-bind="[$attrs, _state]"
          v-on="$listeners"
        />
      </filter-bar>
    </state-handler>
  </data-wrapper>
</template>

<script>
import DataTable from '@/components/presentation/grid/DataTable'
import FilterBar from '@/components/presentation/grid/FilterBar'

export default {
  name: 'filtered-data-table',
  components: {
    DataTable,
    FilterBar,
  },
  data() {
    return {
      params: {},
    }
  },
  methods: {
    formSubmit(params) {
      this.params = Object.freeze(params)
    }
  }
}
</script>

<style>

</style>
