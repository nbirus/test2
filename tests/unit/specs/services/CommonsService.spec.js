import { truthy } from '@/services/CommonsService'

describe('CommonsService', () => {
  it('truthy', () => {
  
    // true
    expect([
      0, 
      false, 
      true, 
      'a', 
      ['test'], 
      { ok: 'test' }, 
      ' '
    ].every(truthy)).toBe(true)

    // false
    expect([
      undefined, 
      null, 
      {}, 
      [], 
      ''
    ].every(truthy)).toBe(false)

  })
})