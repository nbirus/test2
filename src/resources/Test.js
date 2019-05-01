export default {

  test: {
    query: () => ({
      endpoint: 'test',
    }),
  },

  testFormat: {
    query: () => ({
      endpoint: 'testFormat'
    }),
    formatter: () => {
      return {
        test: 'format',
      }
    },
  },

  testWithParams: {
    query: params => ({
      endpoint: 'testWithParams',
      ...params
    }),
  },

}
