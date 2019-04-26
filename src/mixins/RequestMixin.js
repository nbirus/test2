import { request, requestResource } from '@/services/RequestService'

export default {
  data() {
    return {
      DataMixin_state: {
        response: undefined,
        loading: true,
        error: undefined,
      },
      DataMixin_keepResponseAlive: false,
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

    // preset 'requests'
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
    $setState(response = undefined, loading = true, error = undefined) {
      this.DataMixin_state = {
        response: this.$getResponse(response),
        loading,
        error,
      }
    },
    
    // don't set response to undefined if keepAlive is specified
    $getResponse(response) {
      if (this.DataMixin_keepResponseAlive && this.DataMixin_state.response !== undefined) {
        return this.DataMixin_state.response
      }
      else {
        return response
      }
    },

  }
}
