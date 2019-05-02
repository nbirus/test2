<template>
  <base-widget v-bind="$attrs" v-on="$listeners">

    <!-- widget header -->
    <div slot="header">
      <h4>{{header}}</h4>  
    </div>

    <!-- widget actions -->
    <div slot="actions" slot-scope="{ _expand, _collapse, _refresh }">
      <btn @click="_expand">expand</btn>
      <btn @click="_collapse">collapse</btn>
      <btn @click="_refresh">refresh</btn>
    </div>

    <!-- widget body -->
    <state-handler slot="body" slot-scope="{ _state, _refresh }" v-bind="_state">

      <!-- loading -->
      <div slot="loading" key="loading" class="test-widget-loading">
        Loading
      </div>

      <!-- error -->
      <div slot="error" key="error" class="test-widget-error">
        <btn @click="_refresh">refresh</btn>
      </div>

      <!-- data -->
      <div key="response" class="test-widget-body">
        Response
      </div>

    </state-handler>

  </base-widget>
</template>

<script>
import BaseWidget from '@/components/presentation/widgets/BaseWidget'

export default {
  name: 'test-widget',
  inheritAttrs: false,
  components: { BaseWidget, },
  props: {
    id: String,
    header: String,
  }
}
</script>

<style>

</style>
