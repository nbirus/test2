import { truthy } from '@/services/CommonsService'
import { get, cloneDeep } from 'lodash'
import SWorker from 'simple-web-worker'
let searchWorker = SWorker.create()

// export worker functions for ease of testing

// search
export function objectSearch(data, params) {
  return new Promise((resolve, reject) => {
    
    // get keys to search by
    const searchKeys = Object.keys(params).filter(key => truthy(params[key]))
    const message = 'search-worker'

    // set up and call service worker
    searchWorker.register({
      message,
      func: objectSearchWorker
    })

    searchWorker.postMessage(message, [JSON.stringify([data, params, searchKeys])])
      .then(resolve)
      .catch(reject)

    searchWorker.unregister(message)

  })
}
export function objectSearchWorker(args) {
  try {

    // get vars from json input
    let data = JSON.parse(args)[0]
    let params = JSON.parse(args)[1]
    let searchKeys = JSON.parse(args)[2]

    // loop over each key, and compare against corrisponding row value
    searchKeys.forEach(key => {
      data = data.filter(row => {

        // get compare values
        const value = row[key]
        const searchValue = params[key]

        // search
        if (key === '_keyword') {
          return rowSearch(row, searchValue)
        }
        else if (isArray(searchValue)) {
          return searchValue.every(s => value.search(s) !== -1)
        }
        else {
          return value.search(searchValue) !== -1
        }
      })
    })

    return data
  }
  catch(e) {
    console.warn('PARSE ERROR', e);
  }
  // helper
  function isArray(value) {
    return !!value && value.constructor === Array
  }
  function rowSearch(row, searchValue) {
    return objectValues(row).some(value => value.search(searchValue) !== -1)
  }
  function objectValues(obj) {
    var res = [];
    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        res.push(obj[i]);
      }
    }
    return res;
  }
}

// sort
export function objectSort(data, sort) {
  return new Promise((resolve, reject) => {

    const message = 'sort-worker'

    // set up and call service worker
    searchWorker.register({
      message,
      func: objectSortWorker
    })

    searchWorker.postMessage(message, [JSON.stringify([data, sort])])
      .then(resolve)
      .catch(reject)

    searchWorker.unregister(message)

  })
}
export function objectSortWorker(args) {
  let data = JSON.parse(args)[0]
  let sort = JSON.parse(args)[1]
  let sortFunc = sort.order === 'ascending' ? sortAsc : sortDesc

  if (sort.key !== undefined) {
    data = data.sort(sortFunc)
  }
  
  return data

  // helpers
  function sortAsc(a, b) {
    return isNaN(a[sort.key])
      ? stringCompare(a, b)
      : numberCompare(a, b)
  }
  function sortDesc(a, b) {
    return isNaN(a[sort.key]) 
      ? stringCompare(b, a) 
      : numberCompare(b, a)
  }
  function numberCompare(a, b) {
    return a[sort.key] - b[sort.key]
  }
  function stringCompare(a, b) {
    return ('' + a[sort.key]).localeCompare(b[sort.key]);    
  }
}

// paginate
export function objectPaginate(data, pagination) {
  return new Promise(resolve => {
    const from = get(pagination, 'from', 0)
    const size = get(pagination, 'size', 1000)
    const total = data.length

    resolve({
      data: cloneDeep(data).splice(from, size),
      total,
    })
  })
}
