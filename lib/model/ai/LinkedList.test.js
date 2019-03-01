"use strict";

var _LinkedList = require("./LinkedList");

var _LinkedList2 = _interopRequireDefault(_LinkedList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it("constructor works", function () {
    var ll = new _LinkedList2.default();

    expect(ll !== null).toBe(true);
});

it("prepend first item", function () {
    // SETUP
    var ll = new _LinkedList2.default();

    // CALL
    ll.prepend(0);

    // ASSERT
    expect(ll.length).toBe(1);
    expect(ll.head.value).toBe(0);
    expect(ll.tail.value).toBe(0);
});

it("prepend second item", function () {
    // SETUP
    var ll = new _LinkedList2.default();

    // CALL
    ll.prepend(1);
    ll.prepend(0);

    // ASSERT
    expect(ll.length).toBe(2);
    expect(ll.head.value).toBe(0);
    expect(ll.tail.value).toBe(1);
});

it("append works", function () {
    // SETUP
    var ll = new _LinkedList2.default();

    // CALL
    ll.append(0);

    // ASSERT
    expect(ll.length).toBe(1);
    expect(ll.head.value).toBe(0);
    expect(ll.tail.value).toBe(0);
});

it("append multiple item works", function () {
    // SETUP
    var ll = new _LinkedList2.default();

    // CALL
    ll.append(0);
    ll.append(1);
    ll.append(2);

    // ASSERT
    expect(ll.length).toBe(3);
    expect(ll.head.value).toBe(0);
    expect(ll.tail.value).toBe(2);
});

it("popFront single test", function () {
    // SETUP
    var ll = new _LinkedList2.default();
    ll.append(0);

    // CALL
    var value = ll.popFront();

    // ASSERT
    expect(value).toBe(0);
    expect(ll.length).toBe(0);
    expect(ll.head).toBe(null);
    expect(ll.tail).toBe(null);
});

it("popFront multiple test", function () {
    // SETUP
    var ll = new _LinkedList2.default();
    ll.append(0);
    ll.append(1);
    ll.append(2);
    expect(ll.length).toBe(3);
    expect(ll.head.value).toBe(0);
    expect(ll.tail.value).toBe(2);

    // CALL
    ll.popFront();
    ll.popFront();
    var value = ll.popFront();

    // ASSERT
    expect(value).toBe(2);
    expect(ll.length).toBe(0);
    expect(ll.head).toBe(null);
    expect(ll.tail).toBe(null);
});

it("popRear single test", function () {
    // SETUP
    var ll = new _LinkedList2.default();
    ll.append(0);

    // CALL
    var value = ll.popRear();

    // ASSERT
    expect(value).toBe(0);
    expect(ll.length).toBe(0);
    expect(ll.head).toBe(null);
    expect(ll.tail).toBe(null);
});

it("popRear multiple test", function () {
    // SETUP
    var ll = new _LinkedList2.default();
    ll.append(0);
    ll.append(1);
    ll.append(2);
    expect(ll.length).toBe(3);
    expect(ll.head.value).toBe(0);
    expect(ll.tail.value).toBe(2);

    // CALL
    ll.popRear();
    ll.popRear();
    var value = ll.popRear();

    // ASSERT
    expect(value).toBe(0);
    expect(ll.length).toBe(0);
    expect(ll.head).toBe(null);
    expect(ll.tail).toBe(null);
});

it("contains basic", function () {
    // SETUP
    var ll = new _LinkedList2.default();
    ll.append(0);
    ll.append(1);
    ll.append(2);

    // CALL
    var trueVal = ll.contains(2);
    var falseVal = ll.contains(3);

    // ASSERT
    expect(trueVal).toBe(true);
    expect(falseVal).toBe(false);
});

it("contains object", function () {
    // SETUP
    var ll = new _LinkedList2.default();
    ll.append({ id: 0, value: "0" });
    ll.append({ id: 1, value: "1" });
    var twoObject = { id: 2, value: "2" };
    ll.append(twoObject);
    var threeObject = { id: 3, value: "3" };
    var fetchIdFunction = function fetchIdFunction(obj) {
        return obj.id;
    };

    // CALL
    var trueVal = ll.contains(twoObject, fetchIdFunction);
    var falseVal = ll.contains(threeObject, fetchIdFunction);

    // ASSERT
    expect(trueVal).toBe(true);
    expect(falseVal).toBe(false);
});

it("iterateOver", function () {
    // SETUP
    var ll = new _LinkedList2.default();
    ll.append(0);
    ll.append(1);
    ll.append(2);
    var callback = jest.fn();

    // CALL
    ll.iterateOver(callback);

    // ASSERT
    expect(callback.mock.calls.length).toBe(3);
    expect(callback.mock.calls[0][0]).toBe(0);
    expect(callback.mock.calls[1][0]).toBe(1);
    expect(callback.mock.calls[2][0]).toBe(2);
});