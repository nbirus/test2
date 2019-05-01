export default {

  test: {
    query: () => ({
      endpoint: 'test',
    }),
    formatter: (response) => {
      return JSON.parse(response)
    },
  },

  testNoFormat: {
    query: () => ({
      endpoint: 'testNoFormat'
    }),
  },

  testWithParams: {
    query: params => ({
      endpoint: 'testWithParams',
      ...params
    }),
  },

}
