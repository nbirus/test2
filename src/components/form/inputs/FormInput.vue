<template>
  <form-generator
    ref="form"
    v-bind="{
      validateOnRuleChange,
      hideActions,
      form,
      id,
    }"
    :model="value"
    @input="input"
  ></form-generator>
</template>

<script>
export default {
  name: 'form-input',
  components: { 
    FormGenerator: () => import('@/components/form/FormGenerator')
  },
  props: {
    id: String,
    form: Array,
    value: Object,
    hideActions: Boolean,
    validateOnRuleChange: Boolean,
  },
  methods: {
    input(value) {
      console.log(value);
      
      this.$emit('input', value);
    },
  },
}
</script>
