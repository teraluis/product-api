
class ListNode {
    head = null;
    size = 0;
    current: Node;

    constructor() {
        this.head = null;
        this.size = 0;
    }

    insertHead(data) {
        this.head = new Node(data, this.head);
        size++;
    }

    insertLast(data) {
        let last = new Node(data);
        this.current = this.head;

        while (current.next) {
            this.current = current.next;
        }
        current.next = node;
        this.size++;
    }
}
