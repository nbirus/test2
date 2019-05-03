<template>
  <el-table 
    v-bind="{
      data,
      height,
      stripe,
      border,
      size,
      fit,
      showSummary,
    }"
  >
    <el-table-column
      v-for="(header, index) in headers"
      :key="`${id}-table-column-${index}`"
      :prop="header.field"
      :label="header.headerName"
      :width="header.width"
    ></el-table-column>
  </el-table>
</template>

<script>
import { Table, TableColumn } from 'element-ui'

export default {
  name: 'data-table',
  components: {
    ElTable: Table,
    ElTableColumn: TableColumn,
  },
  props: {
    id: String,
    data: Array,
    headers: Array,
    height: String,
    size: String,
    stripe: Boolean,
    fit: Boolean,
    border: Boolean,
    showSummary: Boolean,
    loading: Boolean,
  },
}
</script>

<style>

</style>
