<template>
  <form-generator 
    v-bind="$props"
    v-model="model"
    :active-model="activeModel"
    :disabled="loading"
    submit-on-mount
    @submit="submit"
  />
</template>

<script>
import FormGenerator from '@/components/form/FormGenerator'

export default {
  name: 'filter-bar',
  inheritAttrs: false,
  components: { FormGenerator },
  props: ['form', 'form-model', 'form-id', 'inline', 'loading'],
  data() {
    return {
      model: {},
      activeModel: {},
    }
  },
  created() {
    const model = this.getModel()
    this.model = this.$h.cloneDeep(model)
    this.activeModel = this.$h.cloneDeep(model)
  },
  methods: {
    submit(params, model) {
      this.$emit('submit', params)
      this.activeModel = this.$h.cloneDeep(model)

      if (this.formId) {
        this.$store.dispatch('form/setForm', {
          id: this.formId,
          model,
        })
      }
    },
    getModel() {
      return this.formId 
        ? this.$store.getters['form/getForm'](this.formId)
        : this.formModel
    },
  }
}
</script>

<style>

</style>
