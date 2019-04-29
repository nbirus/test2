export const TestForm = [
  {
    input: 'text',
    id: 'text',
    label: 'Test Input',
    wrapper: 'default',
    wrapperProps: {},
    inputProps: {
      placeholder: 'placeholder',
    },
    validations: [
      {
        required: true,
        message: 'Please select Activity zone',
        trigger: 'change'
      }
    ],
    setter(value, formModel) {
      console.log(formModel);
      return value + 'wow'
    },
  }, 
  {
    input: 'select',
    id: 'select',
    label: 'Select Input',
    inputProps: {
      placeholder: 'placeholder',
      multiple: true,
      options: [{
          label: 'asdfasdg',
          value: 'select'
        },
        {
          label: 'label 2',
          value: 'select2'
        },
      ]
    },
  },
]

export const TestModel = {
  form: {
    text: 'test'
  },
  text: 'test',
  select: [],
}

function validatePass(rule, value, callback) {
  if (value.text === '') {
    return callback(new Error(''));
  }
  else {
    return callback()
  }
}
