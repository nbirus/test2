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
    <test-widget
      id="widget"
      header="Widget Header"
      resource="patients"
      :params="params"
      data-key="data"
    />


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
import DataGrid from '@/components/presentation/grid/DataGrid'
import DataTable from '@/components/presentation/grid/DataTable'
import FormGenerator from '@/components/form/FormGenerator'
import { TestForm, TestModel } from '@/components/form/forms/TestForm'
import Modal from '@/components/presentation/modal/Modal'
import TestWidget from '@/components/presentation/widgets/TestWidget'

export default {
  name: 'dashboard-page',
  components: { TestWidget, Modal, DataGrid, DataTable, FormGenerator },
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
