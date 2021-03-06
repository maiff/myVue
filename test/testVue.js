var _ = require('../dist/index')

let Vue = _.Vue

var demo = new Vue({
  el: '#demo',
  data: {
    text: 'before',
    other: 1
  },
  render () {
    return this.__h__('div', {}, [
      this.__h__('span', {}, [this.__toString__(this.text)])
    ])
  }
})
console.log(demo.text)
setTimeout(function () {
  demo.text = 2
  demo.other = 22
  console.log(demo.text)
}, 3000)
