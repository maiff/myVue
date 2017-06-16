import Observer from '../observer/Observer'
import { globalEvent } from '../until'

import VNode from '../observer/vdom'
import watch from '../observer/watch'

class Vue {
  constructor (options) {
    this.$options = options
    this.$data = options.data

    Object.keys(options.data).forEach(key => this._proxy(key))
    new Observer(this.$data)

    const vdom = watch(this, this._render.bind(this), this._update.bind(this))
    console.log(vdom)
  }
  _update () {
    console.log('i need update')
    const vdom = this._render()
    console.log(vdom)
  }
  _render () {
    console.log('render~')
    return this.$options.render.call(this)
  }
  _proxy (key) {
    const self = this
    Object.defineProperty(self, key, {
      configurable: true,
      enumerable: true,
      get: function proxyGetter () {
        return self.$data[key]
      },
      set: function proxySetter (val) {
        self.$data[key] = val
      }
    })
  }

  __h__ (tag, attr, children) {
    return VNode(tag, attr, children.map((child) => {
      if (typeof child === 'string') {
        return VNode(undefined, undefined, undefined, child)
      } else {
        return child
      }
    }))
  }
  __toString__ (val) {
    return val == null ? '' : typeof val === 'object' ? JSON.stringify(val, null, 2) : String(val);
  }
}
export default Vue
