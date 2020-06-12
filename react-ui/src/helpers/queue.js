export class Queue {
  constructor(init) {
    this.array = init.slice(0, 20);
    this.limit = 20;
  }

  uniqEnqueue(item) {
    if (this.array.includes(item)) {
      const a = this.array.filter(_item => item !== _item);
      this.array = [...a, item];
      return;
    }

    this.enqueue(item);
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
