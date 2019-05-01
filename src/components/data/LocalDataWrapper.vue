<script>
import { debounce } from 'lodash'

export default {
  name: 'local-data-wrapper',
  props: {
    model: Array,
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
      response: undefined,
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
      this.request = debounce(this.$request, this.debounce)
    },
    makeRequest() {
      if (!this.disabled) {
        this.request(this.params)
      }
    },
    $request(params) {
      this.response = this.$h.cloneDeep(this.model)
    },
  },
  render() {
    if (this.$scopedSlots.default !== undefined) {
      return this.$scopedSlots.default({
        _state: {
          response: this.response,
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
