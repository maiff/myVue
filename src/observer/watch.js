import Dep from './Dep'

export default function watch (vm, exp, cb) {
  Dep.target = cb
  return exp()
}
