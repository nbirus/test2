export default {
  data() {
    return {
      PaginationMixin_page: 1,
      PaginationMixin_size: 20,
      PaginationMixin_total: 0,
    }
  },
  computed: {
    $pagination() {
      const page = this.PaginationMixin_page
      const size = this.PaginationMixin_size
      const from = (page - 1) * size
      
      return { from, size }
    },
    $pageState() {
      return {
        page: this.PaginationMixin_page,
        size: this.PaginationMixin_size,
        total: this.PaginationMixin_total,
      }
    }
  },
  methods: {
    $pageChange(page) {
      this.PaginationMixin_page = page
    },
    $pageSizeChange(size) {
      this.PaginationMixin_size = size
      this.$pageChange(1)
    },
    $setPaginationTotal(total) {
      this.PaginationMixin_total = total
    },
  }
}
