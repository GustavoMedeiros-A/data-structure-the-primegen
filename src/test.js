class Queue {
    constructor() {
        this.items = {};
        this.head = 0;
        this.tail = 0;
    }

    enqueue(item) {
        this.items[this.tail] = item;
        this.tail++;
        return item + " inserted";
    }

    dequeue() {
        const item = this.items[this.head];
        delete this.items[this.head];
        this.head++;
        return item + " deleted";
    }
    peek() {
        return this.items[this.head];
    }

    get showQueue() {
        return this.items;
    }
}

const queue = new Queue();
const show = queue.showQueue;
console.log(queue.enqueue(7));
console.log(queue.enqueue(3));
console.log(queue.enqueue(6));
// console.log(show);
console.log(queue.dequeue());
console.log(queue.enqueue(10));
console.log(queue.peek());
// console.log(show);
