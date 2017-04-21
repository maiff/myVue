import EventEmitter from 'events'

const globalEvent = new EventEmitter()


function define (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value        : val,
    enumerable   : !!enumerable,
    writable     : true,
    configurable : true
  })
}

export { globalEvent, define }

