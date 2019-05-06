export let TestForm = [
  {
    input: 'text',
    id: '_keyword',
    label: 'Keyword',
    wrapper: 'default',
    wrapperProps: {},
    inputProps: {
      placeholder: 'placeholder',
    },
    // validations: [
    //   {
    //     required: true,
    //     message: 'Please select Activity zone',
    //     trigger: 'change'
    //   }
    // ],
  }, 
  {
    input: 'select',
    id: 'employee_name',
    label: 'Name',
    inputProps: {
      placeholder: 'placeholder',
      multiple: true,
      options: [{
          label: 'a',
          value: 'a'
        },
        {
          label: 'c',
          value: 'c'
        },
      ]
    },
  },
]

export const TestModel = {
  _keyword: 'test',
  employee_name: [],
}

function validatePass(rule, value, callback) {
  if (value.text === '') {
    return callback(new Error(''));
  }
  else {
    return callback()
  }
}
