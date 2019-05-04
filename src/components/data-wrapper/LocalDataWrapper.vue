<script>
import { objectSearch, objectSort } from '@/services/SearchService'
import { debounce } from 'lodash'

export default {
  name: 'local-data-wrapper',
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
    }
  },
  computed: {
    updateWatcher() {
      // watch for change in any of these
      return JSON.stringify(this.pagination)
        + JSON.stringify(this.sort) 
        + JSON.stringify(this.params) 
        + this.dataKey
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

    async _request(params) {
      try {
        this.loading = true
        let { paginatedData, filteredData } = await this.getData(this.data, params)
        this.returnData = paginatedData
        this.loading = false

        this.$emit('resolve', {
          data: paginatedData,
          total: filteredData.length,
        })
      }
      catch(e) {
        console.log(e);
        this.returnData = []
        this.loading = false
      }
    },

    async getData(data, params) {
      const keyData = this.$h.get(data, this.dataKey, data)
      const filteredData = await objectSearch(keyData, params)
      const sortedData = await objectSort(filteredData, this.sort)
      const paginatedData = this.paginate(this.$h.cloneDeep(sortedData))

      return {
        filteredData,
        paginatedData,
      }
    },
    paginate(data) {
      if (this.$h.truthy(this.pagination)) {
        return data.splice(this.pagination.from, this.pagination.size)
      }
      else return data
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
