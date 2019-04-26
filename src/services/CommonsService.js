export function truthy(data) {

  // number/boolean
  if (typeof (data) === 'number' || typeof (data) === 'boolean') {
    return data !== undefined && data !== null
  }

  // date
  if (data instanceof Date) {
    return !isNaN(data.valueOf())
  }

  // undefined
  if (typeof (data) === 'undefined' || data === null) {
    return false
  }

  // array
  if (typeof (data.length) !== 'undefined') {
    return data.length !== 0
  }

  // object
  let count = 0
  for (let i in data) {
    if (data.hasOwnProperty(i)) {
      count++
    }
  }

  return count !== 0
}
