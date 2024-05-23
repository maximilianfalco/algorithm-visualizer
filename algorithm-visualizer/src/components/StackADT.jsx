class StackADT {
  #stack = [];

  constructor() {
    this.#stack = [];
  }

  add(newObject) {
    this.#stack.push(newObject)
  }

  getNext() {
    return this.#stack.pop();
  }

  length() {
    return this.#stack.length;
  }
}

export default StackADT