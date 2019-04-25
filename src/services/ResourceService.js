import Resources from '@/resources'
import SWorker from 'simple-web-worker'
import { get } from 'lodash'
let worker = SWorker.create()

export function getResourceConfig(resource) {
  const query = get(Resources, `${resource}.query`, {})
  return query()
}

export function getResourceFormatter(resource) {
  const formatter = get(Resources, `${resource}.formatter`, arg => arg) 
  return response => new Promise((resolve, reject) => {

    // register formatter as web worker
    worker.register({
      message: resource,
      func: formatter
    })

    // most message
    worker.postMessage(resource, [response])
      .then(resolve)
      .catch(reject)

  })
}