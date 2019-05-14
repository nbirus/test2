import { objectSearchWorker } from '@/services/ObjectService'
import { truthy } from '@/services/CommonsService'

const defaultData = [
  { key: 'first', key2: 'second' },
  { key: 'third', key2: 'forth' },
  { key: 'fifth', key2: 'six' },
]

describe('ObjectService', () => {

  // objectSearchWorker

  // one key matching
  it('objectSearchWorker: basic search', () => {
    const params = {
      key: 'f',
    }
    expect(objectSearchWorker(createObjectSearchArg(params))).toEqual([
      { key: 'first', key2: 'second' },
      { key: 'fifth', key2: 'six' },
    ])
  })
  it('objectSearchWorker: matches all rows', () => {
    const params = {
      key: 'i',
    }
    expect(objectSearchWorker(createObjectSearchArg(params))).toEqual(defaultData)
  })
  it('objectSearchWorker: empty params', () => {
    const params = {}
    expect(objectSearchWorker(createObjectSearchArg(params))).toEqual(defaultData)
  })
  it('objectSearchWorker: empty data', () => {
    const params = {}
    expect(objectSearchWorker(createObjectSearchArg(params, []))).toEqual([])
  })

})

function createObjectSearchArg(params, data = defaultData) {
  let searchKeys = Object.keys(params).filter(key => truthy(params[key]))
  return [JSON.stringify([data, params, searchKeys])]
}
