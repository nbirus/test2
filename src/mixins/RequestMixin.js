import { request, requestResource } from '@/services/RequestService'

export default {
  props: {
    keepResponseAlive: Boolean,
  },
  data() {
    return {
      RequestMixin_state: {
        data: undefined,
        loading: true,
        error: undefined,
      },
    }
  },
  methods: {

    // generic request method, takes a config
    async $request(config) {
      this.$setState()
      return request(config)
        .then(this.$requestResolve)
        .catch(this.$requestError)
    },

    // preset 'requests' method, provide a resource along with any additional parmas
    async $requestResource(resource, params) {
      this.$setState()
      return requestResource(resource, params)
        .then(this.$requestResolve)
        .catch(this.$requestError)
    },

    $requestResolve(data) {
      this.$setState(this.$getData(data), false, undefined)
    },
    $requestError(error) {
      this.$setState(undefined, false, error)
    },

    // set state, set to new ref to trigger watchers
    $setState(data = this.RequestMixin_state.data, loading = true, error = undefined) {
      this.RequestMixin_state = {
        data,
        loading,
        error,
      }
    },

    $getData(data) {
      return this.$h.truthy(this.dataKey)
        ? this.$h.get(data, this.dataKey) 
        : data
    },

  }
}
