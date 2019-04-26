import Resources from '@/resources'
import SWorker from 'simple-web-worker'
import { get } from 'lodash'
let worker = SWorker.create()

export function getResourceConfig(resource, params) {
  const query = get(Resources, `${resource}.query`, () => {})
  return query(params)
}

export function getResourceFormatter(resource) {
  return response => formatterWorker(
    resource, 
    response,
    get(Resources, `${resource}.formatter`, defaultFormatter),
  )
}


// create web worker to extract data from response
function formatterWorker(resource, response, formatter) {
  return new Promise((resolve, reject) => {

    // register formatter as web worker
    worker.register({
      message: resource,
      func: formatter
    })

    // most message, stringify message for worker
    worker.postMessage(resource, [JSON.stringify(response)])
      .then(response => {
        resolve(response)
        worker.unregister(resource)
      })
      .catch(reject)

  })
}

// used if no default formatter is set
function defaultFormatter(response) {
  return response
}