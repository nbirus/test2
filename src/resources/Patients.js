export default {

  patients: {
    query: (params) => ({
      endpoint: params.id,
    }),
    formatter: (response) => {
      return JSON.parse(response)
    },
  },

  test: {
    query: () => ({
      endpoint: 'test',
    }),
  },

}
