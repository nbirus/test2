<template>
  <div id="app" class="biad-app">
    <app-header></app-header>
    <app-body></app-body>
    <app-footer></app-footer>
    <portal-target name="modal"></portal-target>
  </div>
</template>

<script>
import AppHeader from '@/views/page/AppHeader'
import AppBody from '@/views/page/AppBody'
import AppFooter from '@/views/page/AppFooter'

export default {
  name: 'app',
  components: { 
    AppHeader, 
    AppBody, 
    AppFooter,
  },
}
</script>