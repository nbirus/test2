import { truthy } from '@/services/CommonsService'
import SWorker from 'simple-web-worker'
let searchWorker = SWorker.create()

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

function objectSearchWorker(args) {
  let data = JSON.parse(args)[0]
  let params = JSON.parse(args)[1]
  let searchKeys = JSON.parse(args)[2]

  // loop over each key, and compare against corrisponding row value
  searchKeys.forEach(key => {
    data = data.filter(row => {

      // get compare values
      const value = row[key]
      const searchValue = params[key]

      // // compare based on search value type
      if (!!searchValue && searchValue.constructor === Array) {
        return searchValue.every(s => value.search(s) !== -1)
      } 
      else {
        return value.search(searchValue) !== -1
      }

    })
  })

  return data
}

function objectSortWorker(args) {
  let data = JSON.parse(args)[0]
  let sort = JSON.parse(args)[1]

  if (sort.key !== undefined) {
    data = data.sort(sort.order === 'ascending' ? sortAsc : sortDesc)
  }
  
  return data

  // helpers
  function sortAsc(a, b) {
    return a[sort.key] - b[sort.key]
  }
  function sortDesc(a, b) {
    return b[sort.key] - a[sort.key]
  }


}
