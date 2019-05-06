<template>
  <data-wrapper
    v-bind="$attrs"
    v-on="$listeners" 
    v-slot="{ _state, _refresh }"
    :params="params"
    :sort="sort"
    :pagination="$pagination"
    :resolve="onResolve"
  >
    <state-handler v-bind="_state" ignore-loading keep-response-alive>
      <expand-container class="filtered-data-table" v-model="expanded">

        <filter-bar
          class="filtered-data-table-form"
          v-bind="$attrs"
          :loading="_state.loading" 
          @submit="formSubmit"
        />

        <pagination-bar
          class="filtered-data-table-pagination"
          v-bind="[$attrs, _state, $pageState]"
          @pageChange="$pageChange"
          @pageSizeChange="$pageSizeChange"
        />

        <data-table
          class="filtered-data-table-body"
          v-bind="[$attrs, _state]"
          v-on="$listeners"
          width="100"
          fit
          @sort="onSort"
        />

        <pagination-bar
          class="filtered-data-table-pagination bottom"
          v-bind="[$attrs, _state, $pageState]"
          @pageChange="$pageChange"
          @pageSizeChange="$pageSizeChange"
        />

        <btn class="filtered-data-table-expand" @click="expanded=!expanded">
          Expand
        </btn>

      </expand-container>
    </state-handler>
  </data-wrapper>
</template>

<script>
import DataTable from '@/components/presentation/grid-table/base/DataTable'
import FilterBar from '@/components/presentation/grid-table/helper/FilterBar'
import PaginationBar from '@/components/presentation/grid-table/helper/PaginationBar'
import ExpandContainer from '@/components/presentation/expand/ExpandContainer'
import PaginationMixin from '@/mixins/PaginationMixin'

export default {
  name: 'filtered-data-table',
  inheritAttrs: false,
  mixins: [PaginationMixin],
  components: {
    ExpandContainer,
    DataTable,
    FilterBar,
    PaginationBar,
  },
  data() {
    return {
      sort: {},
      params: {},
      expanded: false,
    }
  },
  methods: {
    formSubmit(params) {
      this.params = Object.freeze(params)
      this.$pageChange(1)
    },
    collapse() {
      this.expanded = false
    },
    onResolve({ total }) {
      this.$setPaginationTotal(total)
    },
    onSort(model) {
      this.sort = model
      this.$pageChange(1)
    }
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
    top: 50%;
    left: 50%;
    margin: -375px 0 0 -400px;
    width: 800px;
    height: auto;
    box-shadow: 0 6px .75rem .05rem fade-out(black, .95);
    overflow-y: scroll;
  }
}
.filtered-data-table-form {
  flex: 0 0 auto;
}
.filtered-data-table-body {
  flex: 0 1 100%;
}
.filtered-data-table-pagination {
  margin: 1rem 0;
}
.filtered-data-table-expand {
  width: 100px;
}

</style>
