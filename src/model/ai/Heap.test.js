import Heap from "./Heap";

it ("constructor works", () => {
   let heap = new Heap();

   expect(heap !== null).toBe(true);
});

const verifyHeapProperty = function (heap) {

    for (let i = 2; i < heap.length; i++) {
        expect(heap.heapProperty(i)).toBe(true);
    }
};

it ("_buildHeap works - max heap", () => {
    // SETUP
    let heap = new Heap(Heap.HEAP_TYPE_MAX, [1, -1, 10]);

    // CALL
    heap._buildHeap(1);

    // ASSERT
    verifyHeapProperty(heap);
    expect(heap.size).toBe(3);

    let theArray = heap.getArray();
    expect(theArray[1]).toBe(10);
    expect(theArray[2]).toBe(-1);
    expect(theArray[3]).toBe(1);

});

it ("_buildHeap works - min heap", () => {
    // SETUP
    let heap = new Heap(Heap.HEAP_TYPE_MIN, [1, -1, 10]);

    // CALL
    heap._buildHeap(1);

    // ASSERT
    verifyHeapProperty(heap);
    expect(heap.size).toBe(3);

    let theArray = heap.getArray();
    expect(theArray[1]).toBe(-1);
    expect(theArray[2]).toBe(1);
    expect(theArray[3]).toBe(10);
});

it ("getMin", () => {
    // SETUP
    let heap = new Heap(Heap.HEAP_TYPE_MIN, [1, -1, 10, -30]);

    // CALL
    let min = heap.getMin();

    // ASSERT
    expect(min).toBe(-30);
});

it ("getMax", () => {
    // SETUP
    let heap = new Heap(Heap.HEAP_TYPE_MAX, [1, -1, 10, -30]);

    // CALL
    let max = heap.getMax();

    // ASSERT
    expect(max).toBe(10);
});

it ("extractMax", () => {
    // SETUP
    let heap = new Heap(Heap.HEAP_TYPE_MAX, [1, -1, 10, -30]);

    // CALL
    let max = heap.extractMax();

    // ASSERT
    expect(max).toBe(10);

    verifyHeapProperty(heap);
    expect(heap.size).toBe(3);

    let theArray = heap.getArray();
    expect(theArray[1]).toBe(1);
    expect(theArray[2]).toBe(-1);
    expect(theArray[3]).toBe(-30);
});

it ("extractMin", () => {
    // SETUP
    let heap = new Heap(Heap.HEAP_TYPE_MIN, [1, -1, 10, -30]);

    // CALL
    let min = heap.extractMin();

    // ASSERT
    expect(min).toBe(-30);

    verifyHeapProperty(heap);
    expect(heap.size).toBe(3);

    let theArray = heap.getArray();
    expect(theArray[1]).toBe(-1);
    expect(theArray[2]).toBe(1);
    expect(theArray[3]).toBe(10);
});

it ("increaseKey test", () => {
    // SETUP
    let heap = new Heap(Heap.HEAP_TYPE_MAX, [1, -1, 10, -30]);

    // CALL
    heap.increaseKey(4, 30);

    // ASSERT
    expect(heap.getMax()).toBe(30);
    expect(heap.size).toBe(4);

    let theArray = heap.getArray();
    expect(theArray[1]).toBe(30);
    expect(theArray[2]).toBe(10);
    expect(theArray[3]).toBe(1);
    expect(theArray[4]).toBe(-1);
});

it ("decreaseKey test", () => {
    // SETUP
    let heap = new Heap(Heap.HEAP_TYPE_MIN, [1, -1, 10, -30]);

    // CALL
    heap.decreaseKey(4, -60);

    // ASSERT
    expect(heap.getMin()).toBe(-60);
    expect(heap.size).toBe(4);

    let theArray = heap.getArray();
    expect(theArray[1]).toBe(-60);
    expect(theArray[2]).toBe(-30);
    expect(theArray[3]).toBe(10);
    expect(theArray[4]).toBe(-1);
});

it ("extractMin", () => {
    // SETUP
    let heap = new Heap(Heap.HEAP_TYPE_MIN, [1, -1, 10, -30]);

    // CALL and ASSERT
    expect(heap.extractMin()).toBe(-30);
    expect(heap.extractMin()).toBe(-1);
    expect(heap.extractMin()).toBe(1);
    expect(heap.extractMin()).toBe(10);

});

it ("extractMax", () => {
    // SETUP
    let heap = new Heap(Heap.HEAP_TYPE_MAX, [1, -1, 10, -30]);

    // CALL and ASSERT
    expect(heap.extractMax()).toBe(10);
    expect(heap.extractMax()).toBe(1);
    expect(heap.extractMax()).toBe(-1);
    expect(heap.extractMax()).toBe(-30);
});

it ("insert works - max", () => {
   // SETUP
    let heap = new Heap(Heap.HEAP_TYPE_MAX);

    // CALL
    heap.insert(1);
    heap.insert(-1);
    heap.insert(10);
    heap.insert(-30);

    // ASSERT
    expect(heap.extractMax()).toBe(10);
    expect(heap.extractMax()).toBe(1);
    expect(heap.extractMax()).toBe(-1);
    expect(heap.extractMax()).toBe(-30);
    expect(heap.size).toBe(0);
});

it ("insert works - min", () => {
    // SETUP
    let heap = new Heap(Heap.HEAP_TYPE_MIN);

    // CALL
    heap.insert(1);
    heap.insert(-1);
    heap.insert(10);
    heap.insert(-30);

    // ASSERT
    expect(heap.extractMin()).toBe(-30);
    expect(heap.extractMin()).toBe(-1);
    expect(heap.extractMin()).toBe(1);
    expect(heap.extractMin()).toBe(10);
    expect(heap.size).toBe(0);
});