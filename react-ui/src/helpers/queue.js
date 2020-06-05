export class Queue {
  constructor(init) {
    this.array = init.slice(0, 20);
    this.limit = 20;
  }
  enqueue(item) {
    if (this.array.length === this.limit) {
      this.array.shift();
    }
    this.array.push(item);
  }

  get items() {
    return this.array;
  }
}
