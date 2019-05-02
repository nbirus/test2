<template functional>
  <div class="expand-container">

    <transition name="fade">
      <div 
        class="backdrop" 
        v-if="props.expanded"
        :key="props.expanded"
        @click="props.collapse" 
      ></div>
    </transition>

    <transition name="expand" mode="out-in">
      <div :class="[data.staticClass, data.class, { 'expanded': props.expanded }]" :key="props.expanded">
        <slot></slot>
      </div>
    </transition>
    
  </div>
</template>

<style lang="scss" scoped>
.expand-container.expanded {
  z-index: 100;
}
.backdrop {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  height: 100vh;
  width: 100vw;
  background-color: fade-out(black, .9);
}
</style>
