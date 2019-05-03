import Resources from '@/resources'
import SWorker from 'simple-web-worker'
import { get, camelCase } from 'lodash'
let resourceWorker = SWorker.create()

/**
 * @param {string} resource
 * @param {object} params
 */
export function getResourceConfig(resource, params) {
  const query = get(Resources, `${camelCase(resource)}.query`, () => {})
  return query(params)
}

/**
 * @param {string} resource
 */
export function getResourceFormatter(resource) {
  return response => formatterWorker(
    resource, 
    response,
    get(Resources, `${camelCase(resource)}.formatter`, defaultFormatter),
  )
}


// create web worker to extract data from response
function formatterWorker(resource, response, formatter) {
  return new Promise((resolve, reject) => {

    // register formatter as web worker
    resourceWorker.register({
      message: resource,
      func: formatter
    })

    // most message, stringify message for worker
    resourceWorker.postMessage(resource, [JSON.stringify(response)])
      .then(resolve)
      .catch(reject)

    // unregister worker
    resourceWorker.unregister(resource)

  })
}

// used if no default formatter is set
function defaultFormatter(response) {
  return JSON.parse(response)
}
