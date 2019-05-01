import { getResourceConfig, getResourceFormatter } from '@/services/ResourceService'

describe('ResourceService', () => {

  it('getResourceConfig', () => {
    expect(getResourceConfig('test')).toEqual({
      endpoint: 'test',
    })
    expect(getResourceConfig('test-with-params', { test: 'test' })).toEqual({
      endpoint: 'testWithParams',
      test: 'test',
    })
  })

  it('getResourceFormatter', async () => {
    const formatter = getResourceFormatter('test')
    expect(await formatter({ test: 'test' })).toEqual({ test: 'test' })
  })

})
