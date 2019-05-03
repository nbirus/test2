export const TestForm = [
  {
    input: 'text',
    id: 'id',
    label: 'Test Input',
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
    label: 'Select Input',
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
  id: '',
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
