import { truthy } from './CommonsService'
import moment from 'moment'

// localeString
export function localeString(value) {
  return (value && typeof value === 'number')
    ? value.toLocaleString()
    : value
}

// titleCase
export function titleCase(value) {
  try {
    return (value)
      ? value.replace(/\w\S*/g, txt => `${txt.charAt(0).toUpperCase()}${txt.substr(1).toLowerCase()}`)
      : value
  }
  catch (error) {
    return value
  }
}

// replaceUnderscores
export function replaceUnderscores(value) {
  return (value && value.length > 0) ? value.replace(/_/g, ' ') : value
}

// replaceDashes
export function replaceDashes(value) {
  return (value && value.length > 0) ? value.replace(/-/g, ' ') : value
}

// upperCase
export function upperCase(value) {
  try {
    return (value) ? value.toUpperCase() : value
  }
  catch (error) {
    return value
  }
}

// lowerCase
export function lowerCase(value) {
  try {
    return (value) ? value.toLowerCase() : value
  }
  catch (error) {
    return value
  }
}

// arrayToString
export function arrayToString(value) {
  return (Array.isArray(value) && value.length) ? value.join(', ') : value
}

// objectArrayToString
export function objectArrayToString(value, key = 'value') {
  try {
    return (value.length) ? value.map(item => item[key]).join(', ') : value
  }
  catch (error) {
    return value
  }
}

// toYesNo
export function toYesNo(value) {
  return truthy(value) ? 'Yes' : 'No'
}

// abbreviate
export function abbreviate(value, length = 10) {
  return (value && value.length > length) ? `${value.substr(0, length)}...` : value
}

export function date(value, format = 'lll') {
  try {
    let date = Date.parse(value)
    if (isNaN(date)) {
      throw 'Invalid Date'
    }
    let momentDate = moment(value)
    return momentDate.isValid() ? momentDate.format(format) : value
  }
  catch (error) {
    return value
  }
}
