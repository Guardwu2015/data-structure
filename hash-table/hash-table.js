import { defaultToString } from '../util'
import { ValuePair } from '../models/value-pair'

export default class HashTable {
  constructor(toStrFn = defaultToString) {
    this.toStrFn = toStrFn
    this.table = {}
  }

  loseloseHashCode(key) {
    if (typeof key === 'number') {
      return key
    }

    const tableKey = this.toStrFn(key)
    let hash = 0
    for (let i = 0; i < tableKey.length; i++) {
      hash += tableKey[i]
    }

    return hash % 37
  }

  hashCode(key) {
    return this.loseloseHashCode(key)
  }

  put(key, value) {
    if (key !== null && value !== null) {
      const pos = this.hashCode(key)
      this.table[pos] = new ValuePair(key, value)
      return true
    }
    return false
  }

  remove(key) {
    const hash = this.hashCode(key)
    const valuePair = this.table[hash]
    if (valuePair !== null) {
      delete this.table[hash]
      return true
    }
    return false
  }

  getTable() {
    return this.table
  }

  isEmpty() {
    return this.size() === 0
  }

  size() {
    return Object.keys(this.table).length
  }

  clear() {
    return this.table = {}
  }

  toString() {
    if (this.isEmpty()) {
      return '';
    }
    const keys = Object.keys(this.table)
    let objString = `{${keys[0]} => ${this.table[keys[0]].toString()}}`
    for (let i = 1; i < keys.length; i++) {
      objString = `${objString},{${keys[i]} => ${this.table[keys[i]].toString()}}`
    }
    return objString
  }
}