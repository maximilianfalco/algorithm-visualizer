class QueueADT {
  #queue = [];

  constructor() {
    this.#queue = [];
  }

  add(newObject) {
    this.#queue.push(newObject)
  }

  getNext() {
    return this.#queue.shift();
  }

  length() {
    return this.#queue.length;
  }
}

export default QueueADT