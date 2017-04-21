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
}
export default Vue
