import MyArray from './myArray'
class Observer {
  constructor (data) {
    this.data = data
    this.walk(data)
  }

  walk (obj) {
    let val
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (obj[key]['__isConvert__']) return
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
    this.data[key]['__isConvert__'] = true
    Object.defineProperty(this.data, key, {
      enumerable: true,
      configurable: true,
      get: function () {
        console.log('你访问了' + key)
        return val
      },
      set: function (newVal) {
        console.log('你设置了' + key)
        console.log('新的' + key + ' = ' + newVal)
        if (newVal === val) return
        val = newVal
      }
    })
  }
}
new Observer()
export default Observer
