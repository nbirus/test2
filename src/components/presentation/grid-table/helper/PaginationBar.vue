<template>
  <div class="pagination-bar">
    <pagination
      background
      layout="prev, pager, next"
      :total="total"
    />
  </div>
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
