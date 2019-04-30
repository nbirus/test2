<template>
  <portal to="modal">
    <el-dialog v-bind="$attrs" v-on="$listeners">
      <slot></slot>
    </el-dialog>
  </portal>
</template>

<script>
// wrapper component to move the modal outside of relative container
import { Dialog } from 'element-ui'
export default {
  name: 'modal',
  components: {
    ElDialog: Dialog,
  },
}
</script>