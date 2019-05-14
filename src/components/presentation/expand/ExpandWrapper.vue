<template>
  <transition name="expand" mode="out-in">
    <portal :key="expanded" ref="expand" to="expand" :disabled="!expanded" slim>
      <slot></slot>
    </portal>
  </transition>
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
        this.addBackdrop()
        document.body.classList.add(modalBodyClass)
        // this.$el.classList.add('el-dialog')
      }
      else {
        removeBackdrop()
        document.body.classList.remove(modalBodyClass)
        // this.$el.classList.remove('el-dialog')
      }
    },
    addBackdrop() {
      const backdrop = getBackdrop()
      backdrop.addEventListener('click', () => this.$emit('change', false))  // on background click, close the modal
      document.body.insertAdjacentElement('beforeend', backdrop)
    },
  },
  watch: {
    'expanded': 'onChange'
  }
}

function getBackdrop() {
  let backdrop = document.createElement('div')
  backdrop.setAttribute('class', 'v-modal')
  backdrop.setAttribute('id', 'v-modal')
  return backdrop
}
function removeBackdrop() {
  let elem = document.getElementById('v-modal');
  return elem.parentNode.removeChild(elem);
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
