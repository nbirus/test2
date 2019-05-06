<template>
  <portal class="expand-wrapper-container" :class="{ expanded }" to="expand" :disabled="!expanded">
    <slot></slot>
    
    <!-- backdrop -->
    <!-- <transition name="fade">
      <div 
        class="backdrop"
        v-if="expanded"
        :key="expanded"
        @click="$emit('change', false)"
      ></div>
    </transition> -->

    <!-- <slot></slot> -->
    <!-- slot -->
    <!-- <transition name="expand" mode="out-in">
      <div  :key="expanded">
      </div>
    </transition> -->
    
  </portal>
</template>

<script>
const modalBodyClass = 'el-popup-parent--hidden'

export default {
  name: 'expand-container',
  props: ['expanded'],
  model: {
    prop: 'expanded',
    event: 'change',
  },
  methods: {
    onChange(expanded) {
      if (expanded) {
        document.body.classList.add(modalBodyClass)
      }
      else {
        document.body.classList.remove(modalBodyClass)
      }
    },
  } 
}
</script>


<style lang="scss" scoped>
.backdrop {
  position: fixed;
  z-index: 99;
  top: 0; left: 0; right: 0; bottom: 0;
  height: 100vh;
  width: 100vw;
  background-color: fade-out(black, .9);
}
</style>
