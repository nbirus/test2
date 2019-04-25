export default {

  patients: {
    query: () => ({
      // endpoint: 'patients',
    }),
    formatter: (response) => {
      return response.data
    }
  },

  test: {
    query: () => ({
      endpoint: 'test',
    }),
  },

}
