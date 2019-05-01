<template>
  <expand-container>
    test
  </expand-container>
</template>

<script>

// needs to handle both asnyc and local data


import ExpandContainer from '@/components/presentation/expand/ExpandContainer'

export default {
  name: 'test-widget',
  components: { ExpandContainer },
  props: {
    response: ''
  },
}
</script>

<style>

</style>
