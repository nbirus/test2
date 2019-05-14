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
        .catch(this.$requestReject)
    },

    // preset 'requests' method, provide a resource along with any additional parmas
    async $requestResource(resource, params) {
      this.$setState()
      return requestResource(resource, params)
        .then(this.$requestResolve)
        .catch(this.$requestReject)
    },

    $requestResolve(response) {
      const data = this.$getData(response)
      const total = this.$getTotal(response)
      this.$setState(data, false, undefined)
      this.$emit('resolve', { data, total })
    },
    $requestReject(error) {
      this.$setState(undefined, false, error)
      this.$emit('reject', error)
    },

    // set state, set to new ref to trigger watchers
    $setState(data = this.RequestMixin_state.data, loading = true, error = undefined) {
      this.RequestMixin_state = {
        data,
        loading,
        error,
      }
    },

    $getData(response) {
      return this.$h.truthy(this.dataKey)
        ? this.$h.get(response, this.dataKey) 
        : response
    },
    $getTotal(response) {
      // TODO: figure out how to dynamically access total
      return response.length
    }

  }
}
