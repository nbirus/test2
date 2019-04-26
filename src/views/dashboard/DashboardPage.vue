<template>
  <div class="page dashboard-page">
    <async-data-wrapper 
      ref="ref"
      resource="patients" 
      :params="params"
      v-slot="{ _state }" 
    >
      <state-handler v-bind="_state">
        <!-- <div slot="loading">asdfasdf</div> -->
        <div slot="error">Error</div>
        <div>Response</div>
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
        id: undefined
      }
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
