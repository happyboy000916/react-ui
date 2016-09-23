import merge from '../utils/merge'
import config from '../config'

let LangData = null

export function setLang () {
  let args = [].slice.call(arguments)
  args.forEach(function (arg) {
    if (typeof arg === 'object') {
      LangData = merge({}, LangData, arg)
    }
  })
}

export function setLocation (location = config.location) {
  LangData = {}
  if (location === 'zh-cn') {
    require.ensure([], require => setLang(require('./zh-cn')), 'zh-cn')
  } else {
    require.ensure([], require => setLang(require('./en')), 'en')
  }
}

export function getLang (path, def = '') {
  if (LangData === null) {
    setLocation()
    return def
  }

  let result = LangData

  if (path === undefined) {
    return result
  }

  if (!path || typeof path !== 'string') {
    return undefined
  }

  let paths = path.split('.')

  for (let i = 0, count = paths.length; i < count; i++) {
    result = result[paths[i]]
    if (result === undefined) {
      if (def !== undefined) {
        return def
      } else {
        return undefined
      }
    }
  }

  return result
}

