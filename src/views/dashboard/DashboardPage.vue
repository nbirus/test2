<template>
  <div class="page dashboard-page">
    TEST
  </div>
</template>

<script>
import { requestResource } from '@/services/RequestService'
export default {
  name: 'dashboard-page',
  async mounted() {
    try {
      const response = await requestResource('patients')
      console.log('RESPONSE');
      console.log(response);
    }
    catch(error) {
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
