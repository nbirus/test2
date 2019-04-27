<template>
  <el-form 
    ref="form" 
    class="biad-form"
    :model="model" 
    :rules="rules"
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
          v-bind="field.inputProps"
          :value="model[field.id]"
          @input="value => input(value, field.id)"
          @change="change"
        ></component>
      </form-item>

    </component>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
    <!-- form control -->
    <div class="biad-form-control" v-if="!hideActions">
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
  props: {
    id: String,
    form: Array,
    model: Object,
    activeModel: Object,
    validateOnRuleChange: Boolean,
    hideActions: Boolean,
    submitOnMount: Boolean,
    labelPosition: String,
  },
  model: {
    event: 'input',
    prop: 'model',
  },
  data() {
    return {
      rules: {},
    }
  },
  created() {
    this.buildRules()
  },
  mounted() {
    if (this.submitOnMount) {
      this.submitForm()
    }
  },
  methods: {

    submitForm() {
      this.formEvent('validate', (valid, invalidRules) => {
        if (valid) {
          this.$emit('submit', this.formatModel(), this.model)
        } 
        else {
          this.$emit('invalid', invalidRules)
        }
      })
    },
    resetForm() {

      // update parent model with active model prop
      this.$emit('input', this.$h.cloneDeep(this.activeModel))

      // recreate form with new values
      this.$nextTick(this.createForm)

      // clear form validation, let form reset first
      setTimeout(() => { this.formEvent('clearValidate')}, 5)      

    },

    input(value, id) {
      const model = this.$h.cloneDeep(this.model)
      model[id] = value
      this.$emit('input', model)
    },
    change() {
      this.$emit('change', this.model)
    },

    buildRules() {
      this.form.forEach(field => {
        this.rules[field.id] = field.validations
      })
    },
    formEvent(event, arg) {
      if (this.$refs.form) {
        this.$refs.form[event](arg)
      }
    },
    formatModel() {
      const model = this.$h.cloneDeep(this.model)
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