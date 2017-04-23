import Dep from './Dep'

export default function watch (vm, exp, cb) {
  Dep.target = cb
  let vdom = exp()
  Dep.target = null
  return vdom
}
