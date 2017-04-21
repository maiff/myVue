import MyArray from './myArray'
// import { define } from '../until'
import { globalEvent } from '../until'
class Observer {
  constructor (data) {
    this.data = data
    this.walk(data)
  }

  walk (obj) {
    let val
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        val = obj[key]
        if (Array.isArray(val)) {
          obj[key] = new MyArray(...val)
          val = obj[key]
        }
        if (typeof val === 'object') {
          new Observer(val)
        }

        this.convert(key, val)
      }
    }
  }

  convert (key, val) {
    Object.defineProperty(this.data, key, {
      enumerable: false,
      configurable: true,
      get: function () {
        console.log('你访问了' + key)
        return val
      },
      set: function (newVal) {
        console.log('新的' + key + ' = ' + newVal)
        if (newVal === val) return
        val = newVal
        globalEvent.emit('set')
      }
    })
  }
}

export default Observer
