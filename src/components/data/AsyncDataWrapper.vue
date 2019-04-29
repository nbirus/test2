<script>
import RequestMixin from '@/mixins/RequestMixin'
import { debounce } from 'lodash'

export default {
  name: 'asnyc-data-wrapper',
  mixins: [RequestMixin],
  props: {
    resource: String,
    params: Object,
    config: Object,
    noCallOnMount: Boolean,
    debounce: {
      type: Number,
      default: 10,
    },
  },
  data() {
    return {
      request: undefined,
    }
  },
  computed: {
    useResource() {
      return this.resource !== undefined
    },
    updateWatcher() {
      return this.resource, this.params, this.config
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
      // get correct request type
      const requestFunction = this.useResource
        ? this.$requestResource
        : this.$request
        
      // set debounce for request
      this.request = debounce(requestFunction, this.debounce)
    },
    makeRequest() {

      // set up paramaters, pass extra params if they're using a resoure
      const params = this.useResource
        ? [this.resource, this.params]
        : [this.config]
        
      this.request(...params)
    },
  },
  watch: {
    'updateWatcher': 'makeRequest'
  },
  render() {
    if (this.$scopedSlots.default !== undefined) {
      return this.$scopedSlots.default({
        _state: this.DataMixin_state,
        _refresh: this.makeRequest,
      })
    } 
    else {
      return this.$slots
    }
  },
}
</script>
