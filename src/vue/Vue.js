import Observer from '../observer/Observer'
import { globalEvent } from '../until'

class Vue {
  constructor (options) {
    this.$options = options
    this.$data = options.data
    new Observer(this.$data)
    globalEvent.on('set', () => {
      this._updata()
    })
    this._updata()
  }
  _updata () {
    this.$options.render()
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
}
export default Vue
