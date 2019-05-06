<script>
import { objectSearch, objectSort, objectPaginate } from '@/services/ObjectService'
import { debounce } from 'lodash'

export default {
  name: 'local-data-wrapper',
  inheritAttrs: false,
  props: {
    data: Array,
    dataKey: String,
    params: Object,
    sort: Object,
    pagination: Object,
    disabled: Boolean,
    debounce: {
      type: Number,
      default: 10,
    },
  },
  data() {
    return {
      request: undefined,
      returnData: undefined,
      loading: false,
      error: undefined,
    }
  },
  computed: {
    updateWatcher() {
      // make use of cacheing to watch multiple objects
      return JSON.stringify(this.pagination)
        + JSON.stringify(this.sort) 
        + JSON.stringify(this.params) 
        + this.dataKey
    },
    activeData() {
      return this.$h.get(this.data, this.dataKey, this.data)
    },
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
    _request(params) {
      objectSearch(this.activeData, params)
        .then(result => objectSort(result, this.sort))
        .then(result => objectPaginate(result, this.pagination))
        .then(this.onResolve)
        .catch(this.onError)
    },

    onResolve({ data, total }) {
      this.returnData = data
      this.loading = false
      this.$emit('resolve', { data, total })
    },
    onError(error) {
      this.error = error
      this.loading = false
    },

  },
  watch: {
    'updateWatcher': 'makeRequest'
  },
  render() {
    if (this.$scopedSlots.default !== undefined) {
      return this.$scopedSlots.default({
        _state: {
          data: this.returnData,
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
