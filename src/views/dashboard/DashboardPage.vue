<template>
  <div class="page dashboard-page">
    <async-data-wrapper resource="patients" :params="params" v-slot="{ _state, _refresh }">
      <state-handler v-bind="_state">
        <div key="loading" slot="loading">load</div>
        <div key="error" slot="error">Error</div>
        <div>
          {{$h.get(_state, 'response.data')}}
          <btn v-ripple>Refresh</btn>
        </div>
      </state-handler>
    </async-data-wrapper>
  </div>
</template>

<script>
export default {
  name: 'dashboard-page',
  data() {
    return {
      params: {
        id: 'employees'
      }
    }
  },
  methods: {
    ok(test) {
      console.log(test)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
