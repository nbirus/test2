export default {

  patients: {
    query: (params) => ({
      endpoint: 'employees',
      params,
    }),
    formatter: (response) => {
      return JSON.parse(response)
    },
  },

}
