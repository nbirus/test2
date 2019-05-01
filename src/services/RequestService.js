import axios from 'axios'
import { getResourceConfig, getResourceFormatter } from '@/services/ResourceService'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
})

/**
 * Base request, pass a valid config object
 * @param {object} config
 */
export function request(config) {
  return service.get(config.endpoint, config)
}

/**
 * Make a request using the `resource` service. Pass a resouce string
 * value that corresponds to a resouce file
 * @param {string} resource
 * @param {object} params
 */
export function requestResource(resource, params) {

  // get config and formatter for requested resource
  const config = getResourceConfig(resource, params)
  const formatter = getResourceFormatter(resource)

  // set up intercepter to format response
  setFormatterIntercepter(formatter)

  // make request
  return request(config)
}


// helper
function setFormatterIntercepter(formatter) {
  service.interceptors.response.use(
    response => {
      return new Promise((resolve, reject) => {
        formatter(response)
          .then(resolve)
          .catch(reject)
      })
    },
    error => Promise.reject(error),
  )
}
