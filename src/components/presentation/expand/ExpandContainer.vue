<template>
  <div>
  <!-- <el-dialog :visible="visible"> -->
    <!-- <portal-target name="expand" @change="change" /> -->
  <!-- </el-dialog> -->
  </div>
</template>

<script>
import { Dialog } from 'element-ui'
export default {
  name: 'expand-container',
  components: {
    ElDialog: Dialog,
  },
  data() {
    return {
      visible: false,
    }
  },
  methods: {
    change(change) {
      console.log(change);
      this.visible = change
    }
  }
}
</script>

<style>

</style>
