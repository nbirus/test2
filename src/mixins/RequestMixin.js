import { request, requestResource } from '@/services/RequestService'

export default {
  props: {
    keepResponseAlive: Boolean,
  },
  data() {
    return {
      DataMixin_state: {
        response: undefined,
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

    $requestResolve(response) {
      this.$setState(response, false, undefined)
    },
    $requestError(error) {
      this.$setState(undefined, false, error)
    },

    // set state, set to new ref to trigger watchers
    $setState(response = this.DataMixin_state.response, loading = true, error = undefined) {
      this.DataMixin_state = {
        response,
        loading,
        error,
      }
    },

  }
}
