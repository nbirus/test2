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
    keepResponseAlive: Boolean,
    debounce: {
      type: Number,
      default: 1000,
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
    }
  },
  created() {
    this.DataMixin_keepResponseAlive = this.keepResponseAlive
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
      // get correct paramaters
      const params = this.useResource
        ? [this.resource, this.params]
        : [this.config]
        
      this.request(...params)
    },

  },
  render() {
    if (this.$scopedSlots.default !== undefined) {
      return this.$scopedSlots.default({
        _state: this.DataMixin_state,
      })
    } 
    else {
      return this.$slots
    }
  },
}
</script>
