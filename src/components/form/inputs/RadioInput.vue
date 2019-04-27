<template>
  <el-radio-group 
    :value="value"
    v-bind="{
      placeholder,
      multiple,
      disabled,
    }"
    @input="v => $emit('input', v)"
  >
    <el-radio
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    ></el-radio>
  </el-radio-group>
</template>

<script>
import { RadioGroup, Radio } from 'element-ui'
export default {
  name: 'select-input',
  components: {
    ElRadioGroup: RadioGroup,
    ElRadio: Radio,
  },
  props: {
    // options: Array,
    // value: [String, Number, Array],
    // placeholder: String,
    // multiple: Boolean,
    // disabled: Boolean,
    // autocomplete: Boolean,
    // filterable: Boolean,
    // remote: Boolean,
    // remoteMethod: Function,
    // loading: Boolean,
    // loadingText: String,
    // noMatchText: String,
    // valueKey: String,
    // labelKey: String,
  }
}
</script>
