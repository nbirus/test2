<script>
import { objectSearch } from '@/services/SearchService'
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
  computed: {
    updateWatcher() {
      // watch for change in any of these
      return JSON.stringify(this.params) + this.dataKey
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
    getData(data) {
      return this.dataKey 
        ? this.$h.get(data, this.dataKey)
        : this.data
    },
    async _request(params) {
      const data = this.getData(this.data)
      try {
        this.loading = true
        this.filteredData = await objectSearch(data, params)
        this.loading = false
      }
      catch(e) {
        console.log(e);
        this.filteredData = data
        this.loading = false
      }
    },
  },
  watch: {
    'updateWatcher': 'makeRequest'
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
