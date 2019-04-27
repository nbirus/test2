import Options from '../options'

export function getOptions(key) {
  try {
    return Options[key].options
  }
  catch(error) {
    return []
  }
}

export function getOption(key, value, accessKey = 'label') {
  if (typeof value !== 'string') {
    return value
  }
  return getOptions(key).find(option => option[accessKey] === value)
}
