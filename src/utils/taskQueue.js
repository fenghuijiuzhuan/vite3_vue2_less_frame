/*
 * @path        : \nita-wms-web\pages\wms\wmp\_provide\utils\taskQueue.js
 * @message     : 任务队列
 * @Author      : YvanGuo
 */
const Queue = (function () {
  const items = new WeakMap();
  class Queue {
    constructor() {
      this.isReady = false;
      items.set(this, []);
    }

    enqueue(element) {
      const q = items.get(this);
      q.push(element);
    }

    dequeue() {
      const q = items.get(this);
      return q.shift();
    }

    front() {
      const q = items.get(this);
      return q[0];
    }

    isEmpty() {
      const q = items.get(this);
      return q.length === 0;
    }

    size() {
      const q = items.get(this);
      return q.length;
    }

    print() {
      const q = items.get(this);
      console.log(q.toString());
    }

    serise() {
      if (!this.isReady) return;
      this.isReady = false;
      if (this.isEmpty()) return;
      const fn = this.dequeue();
      fn().then(() => {
        this.isReady = true;
        this.serise();
      });
    }

    pop() {
      if (this.isEmpty()) {
        this.isPending = false;
        return;
      }
      this.isPending = true;
      const fn = this.dequeue();
      fn();
    }

    start() {
      if (this.isPending) return;
      this.pop();
    }

    push(f) {
      this.enqueue(f);
      // this.serise();
    }
  }
  return Queue;
})();

const getInstance = (function () {
  const Processor = {};
  return function (key, ...args) {
    if (!Processor[key]) {
      Processor[key] = new Queue(args);
    }
    return Processor[key];
  };
})();

export default Queue;
export const GuideQueue = getInstance('guide');
