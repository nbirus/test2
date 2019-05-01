import t from 'typy'
import { truthy } from './CommonsService'
import { get } from 'lodash'

/**
 * 1000 -> '1,000'
 * @param {number} value
 */
export function localeString(value) {
  return (truthy(value) && t(value).isNumber)
    ? value.toLocaleString()
    : value
}

/**
 * 'test string' -> 'Test String'
 * @param {string} value
 */
export function titleCase(value) {
  return validString(value)
    ? value.replace(/\w\S*/g, txt => `${txt.charAt(0).toUpperCase()}${txt.substr(1).toLowerCase()}`)
    : value
}

/**
 * 'test_string' -> 'title string'
 * @param {string} value
 */
export function replaceUnderscores(value) {
  return validString(value)
    ? value.replace(/_/g, ' ') 
    : value
}

/**
 * 'test-string' -> 'title string'
 * @param {string} value
 */
export function replaceDashes(value) {
  return validString(value) ? value.replace(/-/g, ' ') : value
}

/**
 * 'test string' -> 'TEST STRING'
 * @param {string} value
 */
export function upperCase(value) {
  return validString(value) ? value.toUpperCase() : value
}

/**
 * 'TEST STRING' -> 'test string'
 * @param {string} value
 */
export function lowerCase(value) {
  return validString(value) ? value.toLowerCase() : value
}

/**
 * [1, 2, 3] -> '1, 2, 3'
 * @param {array} value
 */
export function arrayToString(value) {
  return t(value).isArray && !t(value).isEmptyArray
    ? value.join(', ') 
    : value
}

/**
 * [{test: 'test'}, ...] -> 'test, ...'
 * @param {array} value
 * @param {string} path
 */
export function objectArrayToString(value, path = 'value') {
  return t(value).isArray && !t(value).isEmptyArray
    ? value.map(item => get(item, path)).join(', ') 
    : value
}

/**
 * true -> 'Yes'
 * @param {any} value
 */
export function toYesNo(value) {
  return truthy(value) ? 'Yes' : 'No'
}

/**
 * 'test string' -> 'test str...'
 * @param {string} value
 * @param {number} length
 */
export function abbreviate(value, length = 10) {
  return (validString(value) && value.length > length) ? `${value.substr(0, length)}...` : value
}

// helper
function validString(value) {
  return (truthy(value) && t(value).isString)
}
