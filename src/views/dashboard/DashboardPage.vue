<template>
  <div class="page dashboard-page">

    <!-- <btn @click="$router.push({name: 'patients'})">patients</btn> -->

    <!-- <async-data-wrapper resource="patients" :params="params" v-slot="{ _state, _refresh }">
      <state-handler v-bind="_state">
        <div key="loading" slot="loading">load</div>
        <div key="error" slot="error">Error</div>
        <div>
          {{$h.get(_state, 'response.data')}}
          <btn v-ripple>Refresh</btn>
        </div>
      </state-handler>
    </async-data-wrapper> -->

    <div class="form-contain">
      <form-generator 
        id="form"
        class="form"
        :form="form"
        :model.sync="model"
        :active-model="activeModel"
        @submit="submit"
        @invalid="invalid"
        @reset="reset"
      ></form-generator>
      <div class="values"></div>
      <code class="output">
        <pre v-html="form"></pre>
      </code>
    </div>

  </div>
</template>

<script>
import FormGenerator from '@/components/form/FormGenerator'
import { TestForm, TestModel } from '@/components/form/forms/TestForm'

export default {
  name: 'dashboard-page',
  components: { FormGenerator },
  data() {
    return {
      form: TestForm,
      model: TestModel,
      activeModel: this.$h.cloneDeep(TestModel),
      params: {
        id: 'employees'
      },
    }
  },
  methods: {
    submit(result, model) {
      this.activeModel = this.$h.cloneDeep(model)
    },
    invalid(test) {
      
    },
    reset() {
      
    },
  }
}
</script>

<style lang="scss" scoped>

.dashboard-page {
  padding: 3rem;
}
.form-contain {
  display: flex;

  .form {
    flex: 0 0 300px;
  }
  .values {
    flex: 0 0 300px;
  }
}
</style>
