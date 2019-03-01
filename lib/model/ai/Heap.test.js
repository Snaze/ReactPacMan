"use strict";

var _Heap = require("./Heap");

var _Heap2 = _interopRequireDefault(_Heap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it("constructor works", function () {
    var heap = new _Heap2.default();

    expect(heap !== null).toBe(true);
});

var verifyHeapProperty = function verifyHeapProperty(heap) {

    for (var i = 2; i < heap.length; i++) {
        expect(heap.heapProperty(i)).toBe(true);
    }
};

it("_buildHeap works - max heap", function () {
    // SETUP
    var heap = new _Heap2.default(_Heap2.default.HEAP_TYPE_MAX, [1, -1, 10]);

    // CALL
    heap._buildHeap(1);

    // ASSERT
    verifyHeapProperty(heap);
    expect(heap.size).toBe(3);

    var theArray = heap.getArray();
    expect(theArray[1]).toBe(10);
    expect(theArray[2]).toBe(-1);
    expect(theArray[3]).toBe(1);
});

it("_buildHeap works - min heap", function () {
    // SETUP
    var heap = new _Heap2.default(_Heap2.default.HEAP_TYPE_MIN, [1, -1, 10]);

    // CALL
    heap._buildHeap(1);

    // ASSERT
    verifyHeapProperty(heap);
    expect(heap.size).toBe(3);

    var theArray = heap.getArray();
    expect(theArray[1]).toBe(-1);
    expect(theArray[2]).toBe(1);
    expect(theArray[3]).toBe(10);
});

it("getMin", function () {
    // SETUP
    var heap = new _Heap2.default(_Heap2.default.HEAP_TYPE_MIN, [1, -1, 10, -30]);

    // CALL
    var min = heap.getMin();

    // ASSERT
    expect(min).toBe(-30);
});

it("getMax", function () {
    // SETUP
    var heap = new _Heap2.default(_Heap2.default.HEAP_TYPE_MAX, [1, -1, 10, -30]);

    // CALL
    var max = heap.getMax();

    // ASSERT
    expect(max).toBe(10);
});

it("extractMax", function () {
    // SETUP
    var heap = new _Heap2.default(_Heap2.default.HEAP_TYPE_MAX, [1, -1, 10, -30]);

    // CALL
    var max = heap.extractMax();

    // ASSERT
    expect(max).toBe(10);

    verifyHeapProperty(heap);
    expect(heap.size).toBe(3);

    var theArray = heap.getArray();
    expect(theArray[1]).toBe(1);
    expect(theArray[2]).toBe(-1);
    expect(theArray[3]).toBe(-30);
});

it("extractMin", function () {
    // SETUP
    var heap = new _Heap2.default(_Heap2.default.HEAP_TYPE_MIN, [1, -1, 10, -30]);

    // CALL
    var min = heap.extractMin();

    // ASSERT
    expect(min).toBe(-30);

    verifyHeapProperty(heap);
    expect(heap.size).toBe(3);

    var theArray = heap.getArray();
    expect(theArray[1]).toBe(-1);
    expect(theArray[2]).toBe(1);
    expect(theArray[3]).toBe(10);
});

it("increaseKey test", function () {
    // SETUP
    var heap = new _Heap2.default(_Heap2.default.HEAP_TYPE_MAX, [1, -1, 10, -30]);

    // CALL
    heap.increaseKey(4, 30);

    // ASSERT
    expect(heap.getMax()).toBe(30);
    expect(heap.size).toBe(4);

    var theArray = heap.getArray();
    expect(theArray[1]).toBe(30);
    expect(theArray[2]).toBe(10);
    expect(theArray[3]).toBe(1);
    expect(theArray[4]).toBe(-1);
});

it("decreaseKey test", function () {
    // SETUP
    var heap = new _Heap2.default(_Heap2.default.HEAP_TYPE_MIN, [1, -1, 10, -30]);

    // CALL
    heap.decreaseKey(4, -60);

    // ASSERT
    expect(heap.getMin()).toBe(-60);
    expect(heap.size).toBe(4);

    var theArray = heap.getArray();
    expect(theArray[1]).toBe(-60);
    expect(theArray[2]).toBe(-30);
    expect(theArray[3]).toBe(10);
    expect(theArray[4]).toBe(-1);
});

it("extractMin", function () {
    // SETUP
    var heap = new _Heap2.default(_Heap2.default.HEAP_TYPE_MIN, [1, -1, 10, -30]);

    // CALL and ASSERT
    expect(heap.extractMin()).toBe(-30);
    expect(heap.extractMin()).toBe(-1);
    expect(heap.extractMin()).toBe(1);
    expect(heap.extractMin()).toBe(10);
});

it("extractMax", function () {
    // SETUP
    var heap = new _Heap2.default(_Heap2.default.HEAP_TYPE_MAX, [1, -1, 10, -30]);

    // CALL and ASSERT
    expect(heap.extractMax()).toBe(10);
    expect(heap.extractMax()).toBe(1);
    expect(heap.extractMax()).toBe(-1);
    expect(heap.extractMax()).toBe(-30);
});

it("insert works - max", function () {
    // SETUP
    var heap = new _Heap2.default(_Heap2.default.HEAP_TYPE_MAX);

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

it("insert works - min", function () {
    // SETUP
    var heap = new _Heap2.default(_Heap2.default.HEAP_TYPE_MIN);

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

var TestObject = function TestObject(value) {
    this._value = value;
};

it("object test - min", function () {
    // SETUP
    var heap = new _Heap2.default(_Heap2.default.HEAP_TYPE_MIN, null, "_value");

    // CALL
    heap.insert(new TestObject(1));
    heap.insert(new TestObject(-1));
    heap.insert(new TestObject(10));
    heap.insert(new TestObject(-30));
    var maxObject = new TestObject(-60);
    heap.insert(maxObject);

    maxObject._value = 30;
    heap.update(maxObject);

    // ASSERT
    expect(heap.getMin()._value).toBe(-30);
    expect(heap.extractMin()._value).toBe(-30);
    expect(heap.extractMin()._value).toBe(-1);
    expect(heap.extractMin()._value).toBe(1);
    expect(heap.extractMin()._value).toBe(10);
    expect(heap.extractMin()._value).toBe(30);
    expect(heap.size).toBe(0);
});

it("object test - max", function () {
    // SETUP
    var heap = new _Heap2.default(_Heap2.default.HEAP_TYPE_MAX, null, "_value");

    // CALL
    heap.insert(new TestObject(1));
    heap.insert(new TestObject(-1));
    heap.insert(new TestObject(10));
    heap.insert(new TestObject(30));
    var minObject = new TestObject(60);
    heap.insert(minObject);

    minObject._value = -30;
    heap.update(minObject);

    // ASSERT
    expect(heap.getMax()._value).toBe(30);
    expect(heap.extractMax()._value).toBe(30);
    expect(heap.extractMax()._value).toBe(10);
    expect(heap.extractMax()._value).toBe(1);
    expect(heap.extractMax()._value).toBe(-1);
    expect(heap.extractMax()._value).toBe(-30);
    expect(heap.size).toBe(0);
});

it("test maxSize", function () {
    // SETUP
    var heap = new _Heap2.default(_Heap2.default.HEAP_TYPE_MAX, null, null, 3);

    // CALL
    heap.insert(0);
    heap.insert(1);
    heap.insert(2);
    heap.insert(3);
    heap.insert(4);
    heap.insert(5);

    // ASSERT
    expect(heap.size).toBe(3);
    expect(heap.extractMax()).toBe(5);
    expect(heap.extractMax()).toBe(4);
    expect(heap.extractMax()).toBe(3);
    expect(heap.size).toBe(0);
});

it("test maxSize 2", function () {
    // SETUP
    var heap = new _Heap2.default(_Heap2.default.HEAP_TYPE_MAX, null, null, 3);

    // CALL
    heap.insert(5);
    heap.insert(0);
    heap.insert(4);
    heap.insert(2);
    heap.insert(3);
    heap.insert(1);

    // ASSERT
    expect(heap.size).toBe(3);
    expect(heap.extractMax()).toBe(5);
    expect(heap.extractMax()).toBe(4);
    expect(heap.extractMax()).toBe(3);
    expect(heap.size).toBe(0);
});

it("clone test", function () {
    // SETUP
    var heap = new _Heap2.default(_Heap2.default.HEAP_TYPE_MAX);
    heap.insert(1);
    heap.insert(2);
    heap.insert(3);

    // CALL
    var toCheck = heap.clone();

    // ASSERT
    expect(toCheck.size).toBe(3);
    expect(toCheck.extractMax()).toBe(3);
    expect(toCheck.extractMax()).toBe(2);
    expect(toCheck.extractMax()).toBe(1);
    expect(toCheck.size).toBe(0);
});