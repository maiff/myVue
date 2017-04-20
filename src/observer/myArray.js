// const aryMethods = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse']
import Observer from './Observer'
class MyArray extends Array {
  push (...args) {
    console.log('我被改变了')
    let length = super.push(...args)
    new Observer(this)
    return length
  }
}

export default MyArray
