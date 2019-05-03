<template>
  <pagination
    layout="total, sizes, prev, pager, next, jumper"
    background
    hide-on-single-page
    :current-page="page"
    :page-sizes="[10, 20, 50, 100, 500]"
    :page-size="size"
    :total="total"
    @size-change="$emit('pageSizeChange', $event)"
    @current-change="$emit('pageChange', $event)"
  />
</template>

<script>
import { Pagination } from 'element-ui'

export default {
  name: 'pagination-bar',
  inheritAttrs: false,
  components: { Pagination },
  props: {
    page: Number,
    size: Number,
    total: Number,
  },
}
</script>

<style>
.pagination-bar {
  margin: 2rem 0;
}
</style>
