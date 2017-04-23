import MyArray from './myArray'
// import { define } from '../until'
import Dep from './Dep'
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
    const dep = new Dep()
    Object.defineProperty(this.data, key, {
      enumerable: false,
      configurable: true,
      get: function () {
        if (Dep.target) {
          dep.add(Dep.target)
        }
        return val
      },
      set: function (newVal) {
        // console.log('新的' + key + ' = ' + newVal)
        if (newVal === val) return
        val = newVal
        dep.notify()
      }
    })
  }
}

export default Observer
