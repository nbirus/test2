<template>
  <transition name="slide-down" appear>
    <div class="form-summary-bar" :class="variant" v-if="open">
      <slot></slot>
      <div class="form-summary-bar-content" v-if="!$slots.default">
        <span>Filtering {{title}} by
          <b>{{fields.map(field => field.group.label).splice(0, 2).join(', ')}}</b>
          <b v-if="fields.length > 2">&nbsp;<i>and</i>&nbsp;{{fields.length - 2}} more</b>
          <a v-if="hideOpen === undefined" href="#" @click.prevent="openSummary">(click to see summary)</a>
        </span>
        <div v-if="hideReset === undefined" href="#" class="reset-btn" @click.prevent="$emit('resetFilters')">
          <icon class="mr-1" icon="ban"></icon><span>Clear Filters</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'form-summary-bar',
  props: ['open', 'title', 'fields', 'values', 'variant', 'hideReset', 'hideOpen'],
  methods: {
    openSummary() {
      this.$store.dispatch('modal/openFormSummary', [this.values, this.variant])
    },
  }
}
</script>

<style lang="scss">
@import 'src/styles/component';

.form-summary-bar {
  width: 100%;
  top: 0;
  height: 2.5rem;
  z-index: 99;

  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: $thin;
  font-size: .9rem;

  &.info {
    font-size: .9rem;
    background-color: $n1;
    color: $text;
    border-bottom: solid thin $n3;

    a {
      font-weight: $thin;
      margin-left: .25rem;
      text-decoration: underline!important;
      cursor: pointer;
    }

    &.warn {
      // font-weight: $regular;
      // background-color: $warn-bg-color;
      // color: $warn-text-color;
      // border-bottom: solid thin $warn-border-color;
      font-size: .9rem;
      background-color: white;
      color: $text;
      border-bottom: solid thin $n3;
      font-weight: $regular;
    }
  }
}
.form-summary-bar-content {
  width: 100%;
  padding: .35rem 0;
  
  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: $thin;
  font-size: .9rem;

  b {
    font-weight: $bold;
  }
  i {
    font-style: normal;
    font-weight: $thin;
  }
  a {
    font-weight: $thin;
    margin-left: .25rem;
    text-decoration: underline;
  }
  span {
    position: relative;
  }
  .reset-btn {
    display: block;
    font-weight: $regular;
    text-decoration: unset;

    position: absolute;
    right: 2.25rem;
    font-size: .9rem;
    cursor: pointer;

    &:hover span {
      text-decoration: underline;
    }
  }
}
@each $name, $color in $theme-colors {
  .form-summary-bar.#{$name} {
    background-color: mix($color, white, 7);
    border-bottom: solid thin fade-out($color, .5);
    color: darken(saturate($color, 15), 15);
    a {
      color: darken($color, 0);
    }
  }
}
</style>
