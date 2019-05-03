<template>
  <ag-grid-vue
    ref="grid"
    class="ag-theme-balham biad-grid"
    :class="{ padding, empty }"
    :row-data="data"
    :column-defs="activeHeaders"
    :grid-options="options"
    :quick-filter-text="quickFilterText"
    :grid-ready="gridReady"
    :column-everything-changed="gridReady"
    :grid-size-changed="gridSizeChanged"
    :sortChanged="sortChanged"
    :cellEditingStarted="cellEditingStarted"
    :rowClicked="rowClicked"
    suppressColumnMoveAnimation
    suppressNoRowsOverlay
  ></ag-grid-vue>
</template>

<script>
import { AgGridVue } from 'ag-grid-vue'
import debounce from 'lodash/debounce'

export default {
  name: 'grid',
  components: { AgGridVue },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    headers: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: undefined,
    },
    resizeOnReady: {
      type: Boolean,
      default: false,
    },
    padding: {
      type: Boolean,
      default: true,
    },
    resizeOnChange: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    quickFilterText: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      gridApi: undefined,
      columnApi: undefined,
      dResizeColumns: undefined,
      activeHeaders: this.$h.cloneDeep(this.headers),
      options: {
        // headerHeight: 48,
        // rowHeight: 45,
        // suppressMovableColumns: true,
        // suppressCellSelection: true,
        // suppressPropertyNamesCheck: true,
        // overlayLoadingTemplate: `<i/>`,
        // overlayNoRowsTemplate: `No Data Found`,
        // domLayout: this.autoHeight ? 'autoHeight': 'normal',
      },
    }
  },
  computed: {
    empty() {
      return this.data.length === 0
    },
    columnWidth() {
      return this.$h.cloneDeep(this.headers).reduce((acc, value) => {
        return acc += value.hide ? 0 : value.width
      }, 0)
    },
  },
  created() {
    this.dResizeColumns = debounce(this.resizeColumns, 10)
  },
  methods: {
    gridReady(params) {
      this.gridApi = params.api
      this.columnApi = params.columnApi

      if (this.resizeOnReady) {
        this.dResizeColumns()
      }

      this.resetRowHeights()
    },
    gridSizeChanged() {
      if (this.resizeOnChange) {
        this.dResizeColumns()
      }
    },
    toggleColumnVisible(colId) {
      const columnState = this.columnApi.getColumnState()
      const column = columnState.find(col => col.colId === colId)
      this.columnApi.setColumnVisible(colId, column.hide)
      this.columnApi.autoSizeColumn(colId)
      this.dResizeColumns()
    },
    stretchColumns() {
      const columnState = this.columnApi.getColumnState()
      columnState.forEach(col => this.columnApi.autoSizeColumn(col.colId))
    },
    resizeColumns() {
      // is the total of the columns greater than client width
      const grid = this.$h.get(this.$refs, 'grid.$el')
      if (grid && this.gridApi) {
        this.$nextTick(() => {
          if (grid.offsetWidth > this.columnWidth) {
            this.gridApi.sizeColumnsToFit()
          }
        });
      }
    },
    sortChanged(model) {
      const sortModel = model.api.getSortModel()
      const colId = this.$h.get(sortModel, '0.colId')
      const order = this.$h.get(sortModel, '0.sort')
      const column = this.activeHeaders.find(header => header.field === colId)
      const sort = this.$h.get(column, 'sortKey', colId)
      this.$emit('sort', { sort, order })
    },
    cellEditingStarted() {
      const grid = this.$h.get(this.$refs, 'grid.$el')
      if (grid) {
        grid.querySelector('input').readOnly = true
      }
    },
    resetRowHeights() {
      setTimeout(this.gridApi.resetRowHeights());
    },
    toggleLoading(loading) {
      if (this.gridApi) {
        loading ? this.gridApi.showLoadingOverlay() : this.gridApi.hideOverlay()
      }
    },
    rowClicked(row) {
      this.$emit('rowClicked', row)
    },
  },
  watch: {
    'loading': 'toggleLoading',
  },
}
</script>

<style lang="scss">
@import "src/styles/component";

.biad-grid {
  height: 100vh;
  position: relative;
}

</style>
