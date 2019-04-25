import axios from 'axios'
import { getResourceConfig, getResourceFormatter } from '@/services/ResourceService'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
})

export function request(config) {
  return service.get(config.endpoint, config)
}

export function requestResource(resource) {
  const config = getResourceConfig(resource)
  const formatter = getResourceFormatter(resource)

  service.interceptors.response.use(
    async response => {
      try {
        return await formatter(response)
      }
      catch(error) {
        return Promise.reject(error)
      }
    },
    error => Promise.reject(error),
  )

  return request(config)
}
