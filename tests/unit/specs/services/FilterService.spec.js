import * as FilterService from '@/services/FilterService'
const invalidCases = [ null, undefined, '', {}, [], new Error() ]

describe('FilterService', () => {

  // localeString
  it('localeString', () => {
    const validCases = [ 0, 10, 100, 1000, 10000 ]
    expect(invalidCases.map(FilterService.localeString)).toEqual(invalidCases) // invalid
    expect(validCases.map(FilterService.localeString)).toEqual( // valid
      [ '0', '10', '100', '1,000', '10,000' ]
    )
  })

  // titleCase
  it('titleCase', () => {
    const validCases = [ 'test', 'testTwo', 'TEST three', 'title case test' ]
    expect(invalidCases.map(FilterService.titleCase)).toEqual(invalidCases) // invalid
    expect(validCases.map(FilterService.titleCase)).toEqual( // valid
      [ 'Test', 'Testtwo', 'Test Three', 'Title Case Test' ]
    )
  })

  // replaceUnderscores
  it('replaceUnderscores', () => {
    const validCases = ['_', 'test_test', 'Test_TEST_test']
    expect(invalidCases.map(FilterService.replaceUnderscores)).toEqual(invalidCases) // invalid
    expect(validCases.map(FilterService.replaceUnderscores)).toEqual( // valid
      [' ', 'test test', 'Test TEST test']
    )
  })

  // replaceDashes
  it('replaceDashes', () => {
    const validCases = ['-', 'test-test', 'Test-TEST-test', new Error()]
    expect(invalidCases.map(FilterService.replaceDashes)).toEqual(invalidCases) // invalid
    expect(validCases.map(FilterService.replaceDashes)).toEqual( // valid
      [' ', 'test test', 'Test TEST test', new Error()]
    )
  })

  // upperCase
  it('upperCase', () => {
    const validCases = ['test', 'testTwo', 'TEST three']
    expect(invalidCases.map(FilterService.upperCase)).toEqual(invalidCases) // invalid
    expect(validCases.map(FilterService.upperCase)).toEqual( // valid
      ['TEST', 'TESTTWO', 'TEST THREE']
    )
  })

  // lowerCase
  it('lowerCase', () => {
    const validCases = ['test', 'testTwo', 'TEST three']
    expect(invalidCases.map(FilterService.lowerCase)).toEqual(invalidCases) // invalid
    expect(validCases.map(FilterService.lowerCase)).toEqual( // valid
      ['test', 'testtwo', 'test three']
    )
  })

  // arrayToString
  it('arrayToString', () => {
    const validCases = [[], ['test'], ['test1', 'test2', 'test3']]
    expect(invalidCases.map(FilterService.arrayToString)).toEqual(invalidCases) // invalid
    expect(validCases.map(FilterService.arrayToString)).toEqual( // valid
      [[], 'test', 'test1, test2, test3']
    )
  })

  // objectArrayToString
  it('objectArrayToString', () => {

    const validCases = [
      [ { value: 'test' } ],
      [ { value: 'test1' }, { value: 'test2' } ],
    ]

    expect(invalidCases.map(v => FilterService.objectArrayToString(v))).toEqual(invalidCases) // invalid
    expect(validCases.map(v => FilterService.objectArrayToString(v))).toEqual( // valid
      ['test', 'test1, test2']
    )
  })

  // toYesNo
  it('toYesNo', () => {
    const validCases = ['', 0, [], {}, null, undefined]
    expect(validCases.map(FilterService.toYesNo)).toEqual( // valid
      ['No', 'Yes', 'No', 'No', 'No', 'No']
    )
  })

  // abbreviate
  it('abbreviate', () => {
    const validCases = ['test', 'testtest', 'testtesttest']
    expect(validCases.map(v => FilterService.abbreviate(v, 4))).toEqual( // valid
      ['test', 'test...', 'test...']
    )
    expect(validCases.map(v => FilterService.abbreviate(v))).toEqual( // valid
      ['test', 'testtest', 'testtestte...']
    )
  })

})