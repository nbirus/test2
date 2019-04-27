<template>
  <div class="collapse-wrapper" @click.self="toggle" :class="{ open, truthy: truthy }" tabindex="0">

    <div class="header" @click="toggle">
      <div class="label" v-html="label"></div>
      <div class="length" v-if="length" v-html="length"></div>
      <div class="collapser"><icon class="icon" icon="chevron-left"></icon></div>
    </div>
  
    <!-- <collapse class="body" :id="label" v-model="open">
      <slot></slot>
    </collapse> -->
  
  </div>
</template>

<script>
  // import Collapse from 'bootstrap-vue/es/components/collapse/collapse'

  export default {
    name: 'collapse-wrapper',
    // components: { Collapse },
    props: ['label', 'model'],
    data() {
      return {
        open: false,
      }
    },
    computed: {
      truthy() {
        return this.$h.truthy(this.model)
      },
      length() {
        if (Array.isArray(this.model)) {
          return this.model.length
        }
      }
    },
    created() {
      this.open = this.truthy
    },
    methods: {
      toggle() {
        this.open = !this.open
      }
    },
  }
</script>

<style lang="scss" scoped>
// @import "src/styles/component";

// .collapse-wrapper {
//   position: relative;
//   padding: 1rem 1.5rem;
//   border: solid thin transparent;
//   border-bottom: solid thin $n2;
//   @include form-control-focus();
//   cursor: pointer;
//   box-shadow: none!important;

//   &:hover {
//     background-color: fade-out($link, .93);
//   }
//   &.open {
//     background-color: transparent;
    
//     >.body {
//       margin-top: .45rem;
//       margin-bottom: -1rem;
//     }
//     .collapser > .icon {
//       transform: rotateZ(-90deg)!important
//     }
//   }
//   &.truthy {
//     >.header > .label {
//       color: $text;
//     }
//   }
//   &:focus {
//     .label, .collapser {
//       color: $dark!important;
//     }
//   }

//   >.header {
//     display: flex;
//     align-items: center;
//     // justify-content: space-between;

//     >.label {
//       flex: 0 1 100%;
//       color: $text;
//       font-weight: $regular!important;
//     }
//     >.length {
//       flex: 0 0 auto;

//       padding: .1rem .4rem 0;
//       margin-top: -.25rem;
//       margin-left: .5rem;
//       border-radius: 3px;
//       background-color: fade-out($link, .8);
//       color: darken($link, 20);
//       font-size: .9rem;
//     }
//     >.collapser {
//       flex: 0 0 auto;
//       // text-align: right;          
//       margin-top: -3px;
//       margin-left: .5rem;

//       >.icon {
//         font-size: .75rem;
//         transition: transform .25s;
//         transform: rotateZ(0deg);
//         color: $text-light;
//       }
//     }
//   }
// }

</style>