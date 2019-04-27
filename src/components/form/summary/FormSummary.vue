<template>
  <ul class="form-summary">
    <li class="field" v-for="(field, index) in activeFields" :key="index">

      <!-- label -->
      <span class="label">with the
        <code v-if="field.id === 'id-search'" v-html="$h.get(values, `${field.id}.id-selector.label`, '')"></code>
        <code v-else-if="field.id === 'date-range'" v-html="$h.get(values, `${field.id}.date-range-key.label`, '')"></code>
        <code v-else v-html="$h.get(field, 'group.label', '')"></code>
      </span>

      <!-- date range -->
      <span class="value date" v-if="isId(field, 'date-range')">
        <div class="interval" v-html="getLabel(values[field.id], field)"></div>
        <span v-html="formatDate(values[field.id]['date-range-from'])"></span>
        <i>to</i>
        <span v-html="formatDate(values[field.id]['date-range-to'])"></span>
      </span>

      <!-- select -->
      <span class="list" v-else-if="isType(field, 'select')">

        <!-- multi -->
        <span class="list" v-if="$h.get(field, 'input.multiple', false)">
          <span
            class="value comma"
            v-if="values[field.id].length < 4"
            v-html="values[field.id].map(value => getLabel(value, field)).join(', ')"
          ></span>
          <span
            class="value multi"
            v-else
            v-for="(value, index) in values[field.id]" :key="index" 
            v-html="getLabel(value, field)"
          ></span>
        </span>

        <!-- single -->
        <span class="value single" v-html="getLabel(values[field.id], field)" v-else></span>

      </span>

      <!-- checkbox -->
      <span class="list" v-else-if="isType(field, 'checkbox')">
        <span
          class="value comma"
          v-if="values[field.id].length < 4"
          v-html="values[field.id].map(value => getCheckboxLabel(value, field)).join(', ')"
        ></span>
        <span
          class="value"
          v-else
          v-for="(value, index) in values[field.id]" :key="index"
          v-html="getCheckboxLabel(value, field)"
        ></span>
      </span>

      <!-- radio -->
      <span class="value radio" v-else-if="isType(field, 'radio')" v-html="getCheckboxLabel(values[field.id], field)"></span>

      <!-- disease -->
      <span class="list" v-else-if="isType(field, 'multi-form')">
        <span
          class="value"
          v-for="(value, index) in values[field.id]" :key="index"
          v-html="getDisease(value, field)"
        ></span>
      </span>

      <!-- id-selector -->
      <span class="value" v-else-if="isType(field, 'form')" v-html="values[field.id]['id-input']"></span>

      <!-- default -->
      <span class="value" v-html="values[field.id]" v-else></span>

    </li>

    <li class="field empty" v-if="!activeFields.length">
      No Filters Active
    </li>

  </ul>
</template>

<script>

const dateFormatMap = {
  day: 'MMMM D, YYYY',
  month: 'MMMM, YYYY',
  year: 'YYYY',
}
const hiddenFields = []

export default {
  name: 'form-summary',
  props: ['values', 'schema'],
  computed: {
    activeFields() {
      return this.schema.filter(this.isActiveField)
    },
  },
  methods: {
    isActiveField(field) {
      // trial type set to all
      if (field.id === 'trial-type' && this.$h.get(this.values, field.id) === -1) {
        return false
      }
      // id-selector
      if (field.id === 'id-search') {
        return this.$h.truthy(this.$h.get(this.values, `${field.id}.id-input`))
      }

      // hidden fields
      if (hiddenFields.includes(field.id)) {
        return false
      }

      // date-range
      if (field.id === 'date-range') {
        return this.$h.truthy(this.$h.get(this.values, `${field.id}.date-range-key`))
      }
      // has value
      else if (this.$h.truthy(this.$h.get(this.values, field.id))) {
        return true
      }
      // default
      else {
        return false
      }
    },
    getLabel(value, field) {
      let key = this.$h.get(field, 'input.textField', 'label')
      return value[key]
    },
    isType(field, type) {
      return field.type === `${type}-field`
    },
    isId(field, id) {
      return field.id === id
    },
    getCheckboxLabel(value, field) {
      const options = this.$h.get(field, 'input.options', [])
      let label = ''
      options.forEach(option => {
        if (option.value === value) {
          label = option.label
        }
      })
      return label
    },
    getDisease(value) {
      if (value.stage) {
        return value.stage.name
      } else if (value.subtype) {
        return value.subtype.name
      } else {
        return value.maintype.name
      }
    },
    formatDate(date) {
      const interval = this.$h.get(this.values, 'date-range.date-range-interval', 'day')
      const format = dateFormatMap[interval]
      return this.$options.filters.date(date, format)
    },
  }
}
</script>

<style lang="scss" scoped>
@import 'src/styles/component';

.form-summary {
  padding: 0; margin: 0;
  height: 100%;
}
.field {
  display: flex;
  flex-direction: column;
  padding: 0; margin: 0 0 1.5rem;

  &:not(:last-child) {
    // border-bottom: solid thin $n2;
  }
  &:not(:first-child) {
    >.label:before {
      content: "and ";
    }
  }
  &.empty {
    font-size: .9rem;
    font-weight: $thin;
    color: $text-light;
  }
}
.label {
  font-weight: $thin;
  font-size: .9rem;
  color: $text;
  margin-bottom: .75rem;

  code {
    font-weight: $bold;
    padding: .2rem .4rem;
    background-color: lighten($studies, 42);
    border: solid thin lighten($studies, 30);
    color: darken($studies, 20);
    border-radius: 3px;
    font-size: .85rem;
  }
}
.value {
  font-weight: $bold;
  font-size: 1rem;
  color: $text;

  &.date {
    i {
      font-style: normal;
      margin: 0 .3rem;
      font-weight: $thin;
    }
  }
}
.list {
  display: flex;
  flex-direction: column;

  .value:not(.comma):not(.single) {
    padding-left: 1rem;

    &:before {
      content: "";
      position: absolute;
      width: 3px; height: 3px;
      border-radius: 50%;
      background-color: lighten($dark, 10);
      margin-left: -.85rem;
      margin-top: .575rem;
    }
    &:not(:last-child) {
      margin-bottom: .25rem;
    }
  }
}
</style>
