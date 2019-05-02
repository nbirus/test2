<script>
import { debounce } from 'lodash'

export default {
  name: 'local-data-wrapper',
  props: {
    data: Array,
    dataKey: String,
    params: Object,
    disabled: Boolean,
    debounce: {
      type: Number,
      default: 10,
    },
  },
  data() {
    return {
      request: undefined,
      filteredData: undefined,
      loading: false,
    }
  },
  created() {
    this.createRequest()
  },
  mounted() {
    if (!this.noCallOnMount) {
      this.makeRequest()
    }
  },
  methods: {
    createRequest() {
      this.request = debounce(this._request, this.debounce)
    },
    makeRequest() {
      if (!this.disabled) {
        this.request(this.params)
      }
    },
    getData(data) {
      return this.dataKey 
        ? this.$h.get(data, this.dataKey)
        : this.data
    },
    _request(params) {
      this.filteredData = this.$h.cloneDeep(this.getData(this.data))
    },
  },
  render() {
    if (this.$scopedSlots.default !== undefined) {
      return this.$scopedSlots.default({
        _state: {
          data: this.filteredData,
          loading: this.loading,
          error: undefined,
        },
        _refresh: this.makeRequest,
      })
    } 
    else {
      return this.$slots
    }
  },
}
</script>
