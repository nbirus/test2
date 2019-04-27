<template>
  <div class="page dashboard-page">
    <pre>{{TestModel}}</pre>
  </div>
</template>

<script>
import { TestForm, TestModel } from '@/components/form/forms/TestForm'

export default {
  name: 'patients-page',
  data() {
    return {
      TestModel
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
