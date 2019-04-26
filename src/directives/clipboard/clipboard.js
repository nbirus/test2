import { Message } from 'element-ui'
import Clipboard from 'clipboard'

export default {
  bind(el, binding) {

    // success callback
    if (binding.arg === 'success') {
      el._v_clipboard_success = binding.value
    }

    // eror callback
    else if (binding.arg === 'error') {
      el._v_clipboard_error = binding.value
    } 
    
    else {

      // copy text
      const clipboard = new Clipboard(el, {
        text() { return binding.value },
        action() { return 'copy' }
      })

      // callbacks
      clipboard.on('success', e => {
        const callback = el._v_clipboard_success
        callback && callback(e)

        if (binding.arg !== 'silent') {
          clipboardSuccess()
        }
      })
      clipboard.on('error', e => {
        const callback = el._v_clipboard_error
        callback && callback(e)

        if (binding.arg !== 'silent') {
          clipboardError()
        }
      })

      el._v_clipboard = clipboard
    }
  },
  update(el, binding) {
    if (binding.arg === 'success') {
      el._v_clipboard_success = binding.value
    } else if (binding.arg === 'error') {
      el._v_clipboard_error = binding.value
    } else {
      el._v_clipboard.text = function() { return binding.value }
      el._v_clipboard.action = function() { return binding.arg === 'cut' ? 'cut' : 'copy' }
    }
  },
  unbind(el, binding) {
    if (binding.arg === 'success') {
      delete el._v_clipboard_success
    } else if (binding.arg === 'error') {
      delete el._v_clipboard_error
    } else {
      el._v_clipboard.destroy()
      delete el._v_clipboard
    }
  },
}

function clipboardSuccess() {
  Message({
    message: 'Copied to clipboard!',
    type: 'success',
    duration: 1500
  })
}
function clipboardError() {
  Message({
    message: 'Copy failed!',
    type: 'error'
  })
}
