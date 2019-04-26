import axios from 'axios'
import { getResourceConfig, getResourceFormatter } from '@/services/ResourceService'

// create an axios instance
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API,
  baseURL: 'http://dummy.restapiexample.com/api/v1/',
})

export function request(config) {
  return service.get(config.endpoint, config)
}

export function requestResource(resource, params) {

  // get config and formatter for requested resource
  const config = getResourceConfig(resource, params)
  const formatter = getResourceFormatter(resource)

  // set up intercepter to format response
  setFormatterIntercepter(formatter)

  return request(config)
}


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
