<template>
  <div class="page dashboard-page">

    <!-- modal -->
    <!-- <modal :visible.sync="visible">
    </modal> -->

    <!-- grid -->
    <!-- <data-grid
      :model="gridModel"
      :headers="headers"
    ></data-grid> -->

    <!-- table -->
    <!-- <data-table
      :model="gridModel"
      :headers="headers"
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
import Modal from '@/components/utils/Modal'

export default {
  name: 'dashboard-page',
  components: { Modal, DataGrid, DataTable, FormGenerator },
  data() {
    return {
      visible: true,
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
  mounted() {
    setTimeout(() => {
      this.visible = true
    }, 1000)
  },
  methods: {
    submit(result, model) {
      this.activeModel = this.$h.cloneDeep(model)
    },
    invalid(test) {
      console.log('open');
      console.log(test);
      
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
