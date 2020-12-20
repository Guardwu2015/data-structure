import { defaultEquals } from '../util'
import { Node } from '../models/linked-list-models'

export default class LinkedList {
  constructor(equalsFn = defaultEquals) {
    this.equalsFn = equalsFn
    this.count = 0
    this.head = null
  }

  add(element) { // 添加到链表的尾部
    const node = new Node(element)
    let current = null;
    if (this.head === null) {
      this.head = node
    } else {
      current = this.head
      while(current.next !== null) {
        current = current.next
      }
      current.next = node
    }
    this.count++
  }

  getElementAt(index) {
    if (index < 0 || index > this.count) {
      throw new Error('the index is invalid')
    }
    let node = this.head
    for (let i = 0; i < index && node !== null; i++) {
      node = node.next
    }
    return node
  }

  insert(element, index) {
    if (index < 0 || index > this.count) {
      throw new Error('the index is invalid')
    }
    const node = new Node(element)
    if (index === 0) {
      const current = this.head
      node.next = current
      this.head = node
    } else {
      const previous = this.getElementAt(index)
      node.next = previous.next
      previous.next = node
    }
    this.count++
    return true
  }

  removeAt(index) {
    if (index < 0 || index > this.count) {
      throw new Error('the index is invalid')
    }
    let current = this.head
    if (index === 0) {
      this.head = current.next
    } else {
      const previous = this.getElementAt(index - 1)
      current = previous.next
      previous.next = current.next
    }
    this.count--
  }

  remove(element) {
    const index = this.indexOf(element)
    return this.removeAt(index)
  }
  indexOf(element) {
    let current = this.head
    for (let i = 0; i < this.size() && current !== null; i++) {
      if (this.equalsFn(element, current.element)) {
        return i
      }
      current = current.next
    }
    return -1
  }
  isEmpty() {
    return this.size() === 0
  }
  size() {
    return this.count = 0
  }
  getHead() {
    return this.head
  }
  clear() {
    this.head = null;
    this.count = 0;
  }
  toString() {
    if (this.head == null) {
      return ''
    }
    let objString = `${this.head.element}`
    let current = this.head.next
    for (let i = 1; i < this.size() && current != null; i++) {
      objString = `${objString},${current.element}`
      current = current.next
    }
    return objString
  }
}