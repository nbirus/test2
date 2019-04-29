<template>
  <div class="page dashboard-page">

    <!-- grid -->
    <!-- <data-grid
      :model="gridModel"
      :headers="headers"
    ></data-grid> -->

    <!-- table -->
    <!-- <data-table
      :model="gridModel"
      :headers="headers"
      fit
    ></data-table> -->

    <!-- get data from an api -->
    <!-- <async-data-wrapper resource="patients" :params="params" v-slot="{ _state, _refresh }">
      <state-handler v-bind="_state" :refresh="_refresh">
        <div key="loading" slot="loading">load</div>
        <div key="error" slot="error">Error</div>
        <div></div>
      </state-handler>
    </async-data-wrapper> -->

    <!-- form generator example -->
    <!-- <form-generator
      id="form"
      class="form"
      :form="form"
      :activeModel="activeModel"
      v-model="model"
      @submit="submit"
      @invalid="invalid"
      @reset="reset"
    ></form-generator> -->

  </div>
</template>

<script>
import DataGrid from '@/components/presentation/grid/DataGrid'
import DataTable from '@/components/presentation/grid/DataTable'
import FormGenerator from '@/components/form/FormGenerator'
import { TestForm, TestModel } from '@/components/form/forms/TestForm'

export default {
  name: 'dashboard-page',
  components: { DataGrid, DataTable, FormGenerator },
  data() {
    return {
      gridModel: [
        { id: 'test', name: 'test_name' },
        { id: 'test 2', name: 'test_name 2' },
        { id: 'tes 3', name: 'test_name 3' },
      ],
      headers: [
        {
          field: 'id',
          headerName: 'ID',
        },
        {
          field: 'name',
          headerName: 'NAME',
        },
      ],
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
      console.log('submit');
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
