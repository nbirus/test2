<template>
  <div class="page dashboard-page">

    <!-- widget with local data -->
    <test-widget
      class="test-class"
      id="widget"
      header="Widget Header"
      :data="gridModel"
    />

    <!-- widget with resource -->
    <!-- <test-widget
      id="widget"
      header="Widget Header"
      resource="patients"
      :params="params"
      data-key="data"
    /> -->

    <!-- modal -->
    <modal :visible.sync="visible">
      TEST
    </modal>

    <!-- grid -->
    <!-- <data-grid
      :model="gridModel"
      :headers="headers"
    ></data-grid> -->


    <!-- dynamic table -->
    <filtered-data-table
      class="table"
      submit-on-mount
      form-id="test"
      :data='gridModel'
      :headers="headers"
      :form="form"
      :form-model="model"
      :inline="true"
      @reject="reject"
    />

    <!-- get data from an api -->
    <!-- <data-wrapper resource="patients" :params="params" v-slot="{ _state, _refresh }">
      <state-handler v-bind="_state" :refresh="_refresh">
        <div key="loading" slot="loading">load</div>
        <div key="error" slot="error">Error</div>
        <div>
          
        </div>
      </state-handler>
    </data-wrapper> -->

    <!-- search through data locally -->
    <!-- <data-wrapper :data="gridModel" :params="params" v-slot="{ _state }">
      <state-handler v-bind="_state">
        <div key="loading-2" slot="loading">load</div>
        <div key="response">
          <li v-for="item in _state.data" :key="item.id">{{item.id}}</li>
        </div>
      </state-handler>
    </data-wrapper> -->

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
import DataGrid from '@/components/presentation/grid-table/base/DataGrid'
import DataTable from '@/components/presentation/grid-table/base/DataTable'
import FilteredDataTable from '@/components/presentation/grid-table/FilteredDataTable'
import FormGenerator from '@/components/form/FormGenerator'
import { TestForm, TestModel } from '@/data/forms/TestForm'
import Modal from '@/components/presentation/modal/Modal'
import TestWidget from '@/components/presentation/widgets/TestWidget'
import Static from '@/data/Static'

export default {
  name: 'dashboard-page',
  components: { TestWidget, Modal, DataGrid, DataTable, FormGenerator, FilteredDataTable },
  data() {
    return {
      visible: true,
      gridModel: Static,
      headers: [
        {
          field: 'id',
          headerName: 'ID',
        },
        {
          field: 'employee_age',
          headerName: 'employee_age',
        },
        {
          field: 'employee_name',
          headerName: 'employee_name',
        },
        {
          field: 'employee_salary',
          headerName: 'employee_salary',
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
    invalid() {
    },
    reset() {
    },
    reject(test) {
      console.log('REJECT');
      console.log(test);
    }
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
.table {
  width: 100%;
}
</style>
