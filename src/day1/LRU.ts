
type Node<T> = {
    value: T;
    next?: Node<T>;
    prev?: Node<T>;
}

function createNode<V>(value: V): Node<V> {
    return {value};
}

// We use LinkedList and HaspMap
export default class LRU<K, V> { // Key and Value
    private length: number;
    private head?: Node<V>; // Value
    private tail?: Node<V>; // Value

    private lookup: Map<K, Node<V>>; // Go to the KEY to the node 
    private reverseLookup: Map<Node<V>, K> // Go to the Node back to the KEY
    


    constructor(private capacity: number = 10) { // Capacity that we have in the cache
        this.length = 0;
        this.head = this.tail = undefined;
        this.lookup = new Map<K, Node<V>>();
        this.reverseLookup = new Map<Node<V>, K>();
    }

    update(key: K, value: V): void {
        // does it exist?
        // call get();
        let node = this.lookup.get(key);
        if (!node) {
            node = createNode(value);
            this.length++;
            this.prepend(node);
            this.trimCache();

            this.lookup.set(key, node);
            this.reverseLookup.set(node, key);
        } else {
            // it does exist
            // Move to the FRONT of the linkedList
            this.detach(node);
            this.prepend(node);
            node.value = value;
        }
        // if it doesn't we need to insert
        //      - check capacity and evict if over
        // if it does, we need to update in the front of the list and update the value
    }
    get(key: K): V | undefined {
        // check the cache for existence
        const node = this.lookup.get(key);
        if (!node) {
            return undefined;
        }

        // update the value we found and move to the front
        this.detach(node);
        this.prepend(node);    
        // return the value we found or undefined if not exists
        return node.value;
    }

    
    private detach(node: Node<V>) {
        if(node.prev) {
            node.prev.next = node.next;
        }

        if(node.next) {
            node.next.prev = node.prev;
        }
        
        if(this.length === 1) {
            this.tail = this.head = undefined;
        }

        if(this.head == node) {
            this.head = this.head.next;
        }

        if(this.tail == node) {
            this.tail = this.tail.prev;
        }

        node.next = undefined;
        node.prev = undefined;

    }
    // Add to the front of the list
    private prepend(node: Node<V>) {
        if(!this.head) {
            this.head = this.tail = node;
            return;
        }

        node.next = this.head;
        this.head.prev = node;
        this.head = node;

    }

    private trimCache(): void {
        if(this.length <= this.capacity) {
            return;
        }
    
        const tail = this.tail as Node<V>;
        this.detach(this.tail as Node<V>);

        const key = this.reverseLookup.get(tail) as K;
    
        this.lookup.delete(key);
        this.reverseLookup.delete(tail);

        this.length--;
    
    }
}