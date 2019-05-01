import t from 'typy'

/**
 * Check to see if a variable is `truthy'
 * @param {any} data
 */
export function truthy(data) {
  const check = t(data)
  return !(
    check.isNullOrUndefined ||
    check.isEmptyString ||
    check.isEmptyArray ||
    check.isEmptyObject
  )
}
