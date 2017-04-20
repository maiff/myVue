'use strict';

// const aryMethods = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse']
require
class MyArray extends Array {
  push (...args) {
    console.log('我被改变了');
    return super.push(...args)
  }
}

module.exports = MyArray;
