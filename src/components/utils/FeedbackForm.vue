<template>
  <div class="feedback-form"></div>
</template>

<script>
import { sendSlack } from '@/services/SlackService'

export default {
  name: 'feedback-form',
  data() {
    return {
      message: undefined,
      user: undefined,
    }
  },
  methods: {
    submit() {
      sendSlack(this.message, this.user)
    },
  }
}
</script>

<style>

</style>
