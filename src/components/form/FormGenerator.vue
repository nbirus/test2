<template>
  <el-form 
    ref="form" 
    class="biad-form"
    :model="formModel" 
    :rules="formRules"
    :label-position="labelPosition || 'top'"
    v-bind="{
      validateOnRuleChange,
    }"
  >

    <!-- form input wrapper -->
    <component 
      v-for="(field, index) in form"
      :key="`${id}-${index}`"
      :is="`${field.wrapper || 'default'}-wrapper`"
      v-bind="field.wrapperProps"
    >

      <!-- form input -->
      <form-item
        :label="field.label"
        :prop="field.id"
      >
        <component
          :is="`${field.input}-input`"
          v-model="formModel[field.id]"
          v-bind="field.inputProps"
        ></component>
      </form-item>

    </component>

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
    <!-- form control -->
    <div class="biad-form-control">
      <btn @click="submitForm">Submit</btn>
      <btn @click="resetForm">Reset</btn>
    </div>

  </el-form>
</template>

<script>
import { Form, FormItem } from 'element-ui'
import Wrappers from './wrappers'
import Inputs from './inputs'

export default {
  name: 'form-generator',
  components: { 
    ElForm: Form,
    FormItem,
    ...Wrappers,
    ...Inputs,
  },
  beforeCreate() {
    this.$options.components.FormGenerator = require('./FormGenerator.vue')
  },
  props: {
    id: String,
    form: Array,
    model: Object,
    activeModel: Object,
    validateOnRuleChange: Boolean,
    submitOnMount: Boolean,
    labelPosition: String,
  },
  data() {
    return {
      formModel: {},
      formRules: {},
    }
  },
  created() {
    this.init()
  },
  mounted() {
    if (this.submitOnMount) {
      this.submitForm()
    }
  },
  methods: {

    init() {

      // bind prop with reference
      this.formModel = this.model

      // build form rules array using form array
      this.buildRules()

    },

    submitForm() {
      this.formEvent('validate', (valid, invalidRules) => {
        if (valid) {
          this.$emit('submit', this.formatModel(), this.formModel)
        } 
        else {
          this.$emit('invalid', invalidRules)
        }
      })
    },
    resetForm() {

      // update parent model with active model prop
      this.$emit('update:model', this.$h.cloneDeep(this.activeModel))

      // recreate form with new values
      this.$nextTick(this.init)

      // clear form validation, let form reset first
      setTimeout(() => { this.formEvent('clearValidate')}, 5)      

    },

    buildRules() {
      this.form.forEach(field => {
        this.formRules[field.id] = field.validations
      })
    },
    formEvent(event, arg) {
      if (this.$refs.form) {
        this.$refs.form[event](arg)
      }
    },
    formatModel() {
      const model = this.$h.cloneDeep(this.formModel)
      const formattedModel = {}
      this.form.forEach(field => {
        formattedModel[field.id] = getFormattedValue(model[field.id], field, model)
      })
      return formattedModel
    },

  }
}

function getFormattedValue(value, field, model) {
  if (field.hasOwnProperty('setter')) {
    return field.setter(value, model)
  }
  else {
    return value
  }
}

</script>