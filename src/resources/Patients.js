export default {

  patients: {
    query: (params) => ({
      endpoint: 'employees'
    }),
    formatter: (response) => {
      return JSON.parse(response)
    },
  },

}
