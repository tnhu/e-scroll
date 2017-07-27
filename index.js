function onScroll(element, callback, progress = () => null) {
  let onProgress = false

  if (element.onScrollHandler && element.onScrollHandler.callback === callback) {
    return
  }

  element.onScrollHandler = async function(e) {
    if (onProgress) {
      return
    }

    if (element.scrollTop + element.clientHeight >= element.scrollHeight) {
      try {
        onProgress = true
        progress({ type: 'start' })
        await callback(e)
      } catch (error) {
        progress({ type: 'error', error })
        console.error(error)
      } finally {
        onProgress = false
        progress({ type: 'end' })
      }
    }
  }

  element.onScrollHandler.callback = callback
  element.addEventListener('scroll', element.onScrollHandler)
}

function offScroll(element, callback) {
  if (!element.onScrollHandler || element.onScrollHandler !== callback) {
    return
  }

  element.removeEventListener('scroll', element.onScrollHandler)

  delete element.onScrollHandler.callback
  delete element.onScrollHandler
}

module.exports = {
  onScroll,
  offScroll
}