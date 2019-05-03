import { truthy } from '@/services/CommonsService'
import { cloneDeep } from 'lodash'
import SWorker from 'simple-web-worker'
let searchWorker = SWorker.create()
const message = 'search-worker'

export function objectSearch(data, params) {
  return new Promise((resolve, reject) => {

    // get keys to search by
    const searchKeys = Object.keys(params).filter(key => truthy(params[key]))

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