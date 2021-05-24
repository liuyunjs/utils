import { uniqueId } from '../uniqueId';

type DoubleNode<T> = {
  prev: DoubleNode<T> | null;
  next: DoubleNode<T> | null;
  value: T;
  key: string;
};

export class DoubleLinkedList<T = any> {
  head: DoubleNode<T> | null = null;
  foot: DoubleNode<T> | null = null;
  length: number = 0;

  protected _createNode(value: T, key: string = uniqueId()): DoubleNode<T> {
    return {
      value,
      key,
      next: null,
      prev: null,
    };
  }

  push(value: T, key?: string) {
    if (this.foot) return this.addAfter(this.foot, value, key);
    this.length++;
    return (this.foot = this._createNode(value, key));
  }

  pop() {
    const node = this.foot;
    if (!node) return;
    this.delete(node);
    return node;
  }

  shift() {
    const node = this.head;
    if (!node) return;
    this.delete(node);
    return node;
  }

  delete(node: DoubleNode<T>) {
    if (node.prev) {
      node.prev.next = node.next;
    } else {
      this.head = node.next;
    }
    if (node.next) {
      node.next.prev = node.prev;
    } else {
      this.foot = node.prev;
    }
    this.length--;
  }

  unshift(value: T, key?: string) {
    if (this.head) return this.insertBefore(this.head, value, key);
    this.length++;
    return (this.head = this._createNode(value, key));
  }

  insertBefore(target: DoubleNode<T>, value: T, key?: string) {
    const node = this._createNode(value, key);
    if (target.prev) {
      target.prev.next = node;
      node.prev = target.prev;
    }
    node.next = target;
    target.prev = node;
    this.length++;
    return node;
  }

  addAfter(target: DoubleNode<T>, value: T, key?: string) {
    const node = this._createNode(value, key);
    if (target.next) {
      target.next.prev = node;
      node.next = target.next;
    }
    node.prev = target;
    target.next = node;
    this.length++;
    return node;
  }

  forEach(
    callback: (value: T, key: string, node: DoubleNode<T>) => void,
    thisArg: any = this,
  ) {
    callback = callback.bind(thisArg);
    let item = this.head;
    while (item) {
      callback(item.value, item.key, item);
      item = item.next;
    }
  }

  map<R>(
    callback: (value: T, key: string, node: DoubleNode<T>) => R,
    thisArg: any = this,
  ): DoubleLinkedList<R> {
    const newLinkedList = new DoubleLinkedList<R>();

    this.forEach((value, key, node) => {
      newLinkedList.push(callback(value, key, node));
    }, thisArg);

    return newLinkedList;
  }
}
