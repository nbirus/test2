<template>
  <el-select 
    :value="value"
    v-bind="{
      placeholder,
      multiple,
      disabled,
    }"
    @input="v => $emit('input', v)"
  >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    ></el-option>
  </el-select>
</template>

<script>
import { Select, Option } from 'element-ui'
export default {
  name: 'select-input',
  components: {
    ElSelect: Select,
    ElOption: Option,
  },
  props: {
    options: Array,
    value: [String, Number, Array],
    placeholder: String,
    multiple: Boolean,
    disabled: Boolean,
    autocomplete: Boolean,
    filterable: Boolean,
    remote: Boolean,
    remoteMethod: Function,
    loading: Boolean,
    loadingText: String,
    noMatchText: String,
    valueKey: String,
    labelKey: String,
  }
}
</script>
