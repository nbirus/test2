import { get } from 'lodash';

export const key = (key = 'value') => {
  return (returnObject, field) => {
    returnObject[field.id] = get(field.value, key)
  }
}
export const array = (key = 'value') => {
  return (returnObject, field) => {
    if (Array.isArray(field.value)) {
      returnObject[field.id] = field.value.length ? field.value.map(value => value[key]) : []
    }
  }
}
