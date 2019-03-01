"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Assert = require("../../utils/Assert");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LinkedList = function () {
    _createClass(LinkedList, null, [{
        key: "createNode",
        value: function createNode(prev, next, value) {
            return {
                prev: prev,
                next: next,
                value: value
            };
        }
    }]);

    function LinkedList() {
        _classCallCheck(this, LinkedList);

        this._head = null;
        this._tail = null;
        this._length = 0;
    }

    _createClass(LinkedList, [{
        key: "prepend",
        value: function prepend(item) {
            if (this._head === null) {
                (0, _Assert.assert)(this._tail === null, "tail must be null too");

                this._head = LinkedList.createNode(null, null, item);
                this._tail = this._head;
            } else {
                var previousHead = this._head;
                this._head = LinkedList.createNode(null, previousHead, item);
                previousHead.prev = this._head;
            }

            this._length++;
        }
    }, {
        key: "append",
        value: function append(item) {
            if (this._head === null) {
                (0, _Assert.assert)(this._tail === null, "tail must be null too");

                this._head = LinkedList.createNode(null, null, item);
                this._tail = this._head;
            } else {
                var previousTail = this._tail;
                this._tail = LinkedList.createNode(previousTail, null, item);
                previousTail.next = this._tail;
            }

            this._length++;
        }
    }, {
        key: "popFront",
        value: function popFront() {
            if (this._head === null) {
                return null;
            }

            var previousHead = this._head;
            if (this._head === this._tail) {
                this._head = null;
                this._tail = null;
            } else {
                this._head = previousHead.next;
                this._head.prev = null;
            }

            previousHead.next = null;
            (0, _Assert.assert)(previousHead.prev === null, "prev should always be null on head");

            this._length--;

            return previousHead.value;
        }
    }, {
        key: "popRear",
        value: function popRear() {
            if (this._tail === null) {
                return null;
            }

            var previousTail = this._tail;
            if (this._head === this._tail) {
                this._head = null;
                this._tail = null;
            } else {
                this._tail = previousTail.prev;
                this._tail.next = null;
            }

            previousTail.prev = null;
            (0, _Assert.assert)(previousTail.next === null, "next should always be null on tail");

            this._length--;

            return previousTail.value;
        }
    }, {
        key: "contains",
        value: function contains(item) {
            var fetchIdFunction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;


            for (var curr = this._head; curr !== null; curr = curr.next) {
                if (!!fetchIdFunction) {
                    if (fetchIdFunction(item) === fetchIdFunction(curr.value)) {
                        return true;
                    }
                } else {
                    if (item === curr.value) {
                        return true;
                    }
                }
            }

            return false;
        }
    }, {
        key: "iterateOver",
        value: function iterateOver(theCallback) {
            if (this._head === null) {
                return; // Nothing to do
            }
            var index = 0;

            for (var current = this._head; current !== null; current = current.next) {
                theCallback(current.value, index);
                index++;
            }
        }
    }, {
        key: "head",
        get: function get() {
            return this._head;
        }
    }, {
        key: "tail",
        get: function get() {
            return this._tail;
        }
    }, {
        key: "length",
        get: function get() {
            return this._length;
        }
    }]);

    return LinkedList;
}();

exports.default = LinkedList;