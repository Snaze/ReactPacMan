"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Assert = require("../../utils/Assert");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var max_heap = 0;
var min_heap = 1;

/**
 * This is an implementation of a Heap.
 * TODO: finish commenting this class.
 */

var Heap = function () {
    _createClass(Heap, null, [{
        key: "HEAP_TYPE_MAX",


        /**
         * This is the Max HEAP_TYPE.
         * @returns {number}
         */
        get: function get() {
            return max_heap;
        }

        /**
         * This is the Min HEAP_TYPE.
         * @returns {number}
         */

    }, {
        key: "HEAP_TYPE_MIN",
        get: function get() {
            return min_heap;
        }

        /**
         * The constructor for the Heap.
         * @param type {Number} Use the static HEAP_TYPE members of this class.  Designates this as a min
         * or a max heap.
         * @param theArray {Array} The array you wish to heapify.  If you leave as null, one will be created.
         * @param keyFieldName {String} This will be used to extract the value of each object that is inserted. If
         * this is left as null, it will be assumed that you are inserting / extracting primitive numbers.
         * @param maxSize {Number} This specifies the maximum size of the heap.
         * @constructor
         */

    }]);

    function Heap() {
        var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Heap.HEAP_TYPE_MAX;
        var theArray = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        var keyFieldName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
        var maxSize = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : Number.POSITIVE_INFINITY;

        _classCallCheck(this, Heap);

        if (theArray === null) {
            theArray = [];
        }

        this._type = type;
        // First element is always ignored
        this._array = [null].concat(theArray);
        this._heapSize = 0;
        this._isHeapified = false;
        this._keyFieldName = keyFieldName;
        this._maxSize = maxSize;
    }

    /**
     * This returns the parent element index of element i in the storing array
     * @param i {Number} The element you wish to find the parent of.
     * @returns {number} The parent element index in the storing array.
     */


    _createClass(Heap, [{
        key: "leftChild",
        value: function leftChild(i) {
            return this.getArrayItem(Heap.left(i));
        }
    }, {
        key: "rightChild",
        value: function rightChild(i) {
            return this.getArrayItem(Heap.right(i));
        }
    }, {
        key: "parent",
        value: function parent(i) {
            return this.getArrayItem(Heap.parent(i));
        }
    }, {
        key: "getArrayValue",
        value: function getArrayValue(i) {
            var item = this.getArrayItem(i);

            if (item instanceof Object) {
                (0, _Assert.assert)(this._keyFieldName !== null, "_keyFieldName must be set");
                return item[this._keyFieldName];
            }

            return item;
        }
    }, {
        key: "getArrayItem",
        value: function getArrayItem(i) {
            return this._array[i];
        }
    }, {
        key: "setArrayItem",
        value: function setArrayItem(i, item) {
            this._array[i] = item;

            if (item instanceof Object) {
                (0, _Assert.assert)(this._keyFieldName !== null, "_keyFieldName must be set");
                item.__heap_index = i; // Hmmmm, is this bootleg?
            }
        }
    }, {
        key: "_maxHeapProperty",
        value: function _maxHeapProperty(i) {
            return this.getArrayValue(Heap.parent(i)) >= this.getArrayValue(i);
        }
    }, {
        key: "_minHeapProperty",
        value: function _minHeapProperty(i) {
            return this.getArrayValue(Heap.parent(i)) <= this.getArrayValue(i);
        }
    }, {
        key: "heapProperty",
        value: function heapProperty(i) {
            if (this.type === Heap.HEAP_TYPE_MAX) {
                return this._maxHeapProperty(i);
            }

            return this._minHeapProperty(i);
        }
    }, {
        key: "_maxHeapify",
        value: function _maxHeapify(i) {
            // Left and right child indices
            var l = Heap.left(i);
            var r = Heap.right(i);
            var largest = i;

            if (l <= this._heapSize && this.getArrayValue(l) > this.getArrayValue(i)) {
                largest = l;
            }

            if (r <= this._heapSize && this.getArrayValue(r) > this.getArrayValue(largest)) {
                largest = r;
            }

            if (largest !== i) {
                var temp = this.getArrayItem(i);
                this.setArrayItem(i, this.getArrayItem(largest));
                this.setArrayItem(largest, temp);

                this._maxHeapify(largest);
            }
        }
    }, {
        key: "_minHeapify",
        value: function _minHeapify(i) {
            // Left and right child indices
            var l = Heap.left(i);
            var r = Heap.right(i);
            var smallest = null;

            if (l <= this._heapSize && this.getArrayValue(l) < this.getArrayValue(i)) {
                smallest = l;
            } else {
                smallest = i;
            }

            if (r <= this._heapSize && this.getArrayValue(r) < this.getArrayValue(smallest)) {
                smallest = r;
            }

            if (smallest !== i) {
                var temp = this.getArrayItem(i);
                this.setArrayItem(i, this.getArrayItem(smallest));
                this.setArrayItem(smallest, temp);

                this._minHeapify(smallest);
            }
        }
    }, {
        key: "_heapify",
        value: function _heapify(i) {
            if (this._type === Heap.HEAP_TYPE_MAX) {
                this._maxHeapify(i);
            } else if (this._type === Heap.HEAP_TYPE_MIN) {
                this._minHeapify(i);
            } else {
                throw new Error("Invalid Heap Type");
            }
        }
    }, {
        key: "_buildHeap",
        value: function _buildHeap() {
            this._heapSize = this._array.length - 1; // DO I NEED TO INCREMENT THIS?
            for (var i = Math.floor(this._array.length / 2); i > 0; i--) {
                this._heapify(i);
            }

            this._isHeapified = true;
        }
    }, {
        key: "_buildHeapIfNotHeapified",
        value: function _buildHeapIfNotHeapified() {
            if (!this._isHeapified) {
                this._buildHeap();
            }
        }

        // _heapSort() {
        //     this._buildHeap();
        //
        //     for (let i = (this._array.length - 1); i > 1; i--) {
        //         let temp = this._array[1];
        //         this._array[1] = this._array[i];
        //         this._array[i] = temp;
        //         this._heapSize--;
        //
        //         this._heapify(1);
        //     }
        // }

    }, {
        key: "getMax",
        value: function getMax() {
            (0, _Assert.assert)(this._type === Heap.HEAP_TYPE_MAX, "You shouldn't grab the max unless this is a max-heap");

            this._buildHeapIfNotHeapified();

            return this.getArrayItem(1);
        }
    }, {
        key: "getMin",
        value: function getMin() {
            (0, _Assert.assert)(this._type === Heap.HEAP_TYPE_MIN, "You shouldn't grab the min unless this is a min-heap");

            this._buildHeapIfNotHeapified();

            return this.getArrayItem(1);
        }
    }, {
        key: "extractMax",
        value: function extractMax() {
            this._buildHeapIfNotHeapified();

            (0, _Assert.assert)(this._heapSize >= 1, "Heap underflow");
            (0, _Assert.assert)(this._type === Heap.HEAP_TYPE_MAX, "You shouldn't grab the max unless this is a max-heap");

            var max = this.getArrayItem(1);
            this.setArrayItem(1, this.getArrayItem(this._heapSize)); // Should this be -1
            this._heapSize--;
            this._maxHeapify(1);

            return max;
        }
    }, {
        key: "extractMin",
        value: function extractMin() {
            this._buildHeapIfNotHeapified();

            (0, _Assert.assert)(this._heapSize >= 1, "Heap underflow");
            (0, _Assert.assert)(this._type === Heap.HEAP_TYPE_MIN, "You shouldn't grab the min unless this is a min-heap");

            var min = this.getArrayItem(1);
            this.setArrayItem(1, this.getArrayItem(this._heapSize)); // Should this be -1
            this._heapSize--;
            this._minHeapify(1);

            return min;
        }
    }, {
        key: "increaseKey",
        value: function increaseKey(i, key) {
            (0, _Assert.assert)(this._type === Heap.HEAP_TYPE_MAX, "You shouldn't increase key unless this is a max-heap");
            (0, _Assert.assert)(key >= this._array[i], "new key is smaller than current key");

            this._buildHeapIfNotHeapified();

            this.setArrayItem(i, key);
            while (i > 1 && this.getArrayValue(Heap.parent(i)) < this.getArrayValue(i)) {
                var temp = this.getArrayItem(i);
                this.setArrayItem(i, this.getArrayItem(Heap.parent(i)));
                this.setArrayItem(Heap.parent(i), temp);
                i = Heap.parent(i);
            }
        }
    }, {
        key: "decreaseKey",
        value: function decreaseKey(i, key) {
            (0, _Assert.assert)(this._type === Heap.HEAP_TYPE_MIN, "You shouldn't decrease key unless this is a min-heap");
            (0, _Assert.assert)(key <= this._array[i], "new key is larger than current key");

            this._buildHeapIfNotHeapified();

            this._array[i] = key;

            while (i > 1 && this.getArrayValue(Heap.parent(i)) > this.getArrayValue(i)) {
                var temp = this.getArrayItem(i);
                this.setArrayItem(i, this.getArrayItem(Heap.parent(i)));
                this.setArrayItem(Heap.parent(i), temp);
                i = Heap.parent(i);
            }
        }

        /**
         * Use this method to update obj's position in the heap if it's key has changed.
         * @param obj {Object} The object whose key has changed.
         */

    }, {
        key: "update",
        value: function update(obj) {
            (0, _Assert.assert)(this._keyFieldName !== null, "You must specify extractKey in the constructor to use this method.");
            (0, _Assert.assert)(typeof obj.__heap_index !== "undefined", "__heap_index must be defined on obj to use update method.");

            this._buildHeapIfNotHeapified();

            this.remove(obj.__heap_index);
            this.insert(obj);
        }

        /**
         * Use this to insert a new number or object into the Heap.  You can only insert an
         * object if you specified extractKey in the constructor.
         * @param key {Number|Object} The Number of Object you wish to insert into the Heap.
         * @returns {Number|Object} Returns a removed item if there is a max capacity set and the capacity
         * was reached (forcing an item to be removed from the bottom of the heap).  If nothing is removed,
         * null is returned.
         */

    }, {
        key: "insert",
        value: function insert(key) {
            this._buildHeapIfNotHeapified();

            var itemValue = void 0;
            if (this._keyFieldName === null) {
                itemValue = key;
            } else {
                itemValue = key[this._keyFieldName];
            }

            (0, _Assert.assert)(Number.isFinite(itemValue), "Item Values in the Heap must be finite.  I use Inf and -Inf to add" + " and remove from the heap");

            this._heapSize++;
            if (this._type === Heap.HEAP_TYPE_MAX) {
                if (this._keyFieldName === null) {
                    this.setArrayItem(this._heapSize, Number.NEGATIVE_INFINITY); // Is this correct heapSize - 1?
                } else {
                    this.setArrayItem(this._heapSize, key); // Is this correct heapSize - 1?
                }

                this.increaseKey(this._heapSize, key);
            } else if (this._type === Heap.HEAP_TYPE_MIN) {
                if (this._keyFieldName === null) {
                    this.setArrayItem(this._heapSize, Number.POSITIVE_INFINITY); // Is this correct heapSize - 1?
                } else {
                    this.setArrayItem(this._heapSize, key); // Is this correct heapSize - 1?
                }

                this.decreaseKey(this._heapSize, key);
            } else {
                throw new Error("Unknown heap type");
            }

            var toRet = null;

            if (this._heapSize > this._maxSize) {
                var lastValue = this.getArrayValue(this._heapSize);
                var prevLastValue = this.getArrayValue(this._heapSize - 1);

                if (lastValue < prevLastValue) {
                    toRet = this.remove(this._heapSize);
                } else {
                    toRet = this.remove(this._heapSize - 1);
                }
                // this._heapSize--;
            }

            return toRet;
        }

        /**
         * This method will remove the item found at index i
         * @param i {Number} The index you wish to remove from the heap.
         * @returns {*} Returns the removed item.
         */

    }, {
        key: "remove",
        value: function remove(i) {
            this._buildHeapIfNotHeapified();

            var origItemValue = this.getArrayValue(i);
            var item = this.getArrayItem(i);

            if (this._type === Heap.HEAP_TYPE_MAX) {
                if (this._keyFieldName === null) {
                    this.setArrayItem(i, Number.POSITIVE_INFINITY); // Is this correct heapSize - 1?
                    item = Number.POSITIVE_INFINITY;
                } else {
                    item[this._keyFieldName] = Number.POSITIVE_INFINITY;
                    this.setArrayItem(i, item); // Is this correct heapSize - 1?
                }

                this.increaseKey(i, item);
                var tempObj = this.extractMax();

                (0, _Assert.assert)(tempObj === item, "tempObj should be obj");
            } else if (this._type === Heap.HEAP_TYPE_MIN) {
                if (this._keyFieldName === null) {
                    this.setArrayItem(i, Number.NEGATIVE_INFINITY); // Is this correct heapSize - 1?
                    item = Number.NEGATIVE_INFINITY;
                } else {
                    item[this._keyFieldName] = Number.NEGATIVE_INFINITY;
                    this.setArrayItem(i, item); // Is this correct heapSize - 1?
                }

                this.decreaseKey(i, item);
                var _tempObj = this.extractMin();

                (0, _Assert.assert)(_tempObj === item, "tempObj should be obj");
            } else {
                throw new Error("Unknown heap type");
            }

            if (this._keyFieldName !== null) {
                item[this._keyFieldName] = origItemValue;
            }

            return item;
        }
    }, {
        key: "getArray",
        value: function getArray() {
            return this._array.slice(0);
        }

        /**
         * This is the underlying array of the heap.  DO NOT MODIFY.
         * @returns {Array}
         */

    }, {
        key: "clone",


        /**
         * This method will clone this Heap and return a new rebuilt Heap.
         *
         * Note that this method will mutate and essentially destroy the existing heap.
         *
         * Maybe I should name this something else?
         *
         * @returns {Heap} A new freshly rebuilt heap.
         */
        value: function clone() {
            var toRet = new Heap(this._type, null, this._keyFieldName, this._maxSize);

            while (this.size > 0) {
                if (this.type === Heap.HEAP_TYPE_MAX) {
                    toRet.insert(this.extractMax());
                } else {
                    toRet.insert(this.extractMin());
                }
            }

            return toRet;
        }
    }, {
        key: "type",
        get: function get() {
            return this._type;
        }
    }, {
        key: "array",
        get: function get() {
            return this._array;
        }

        /**
         * This returns the length of the underlying array storing the heap.
         *
         * It will always be 1 + size()
         *
         * @returns {Number}
         */

    }, {
        key: "length",
        get: function get() {
            return this._array.length;
        }

        /**
         * This will return the size of the actual heap (not the underlying array).
         *
         * It will always be length() - 1
         *
         * @returns {Number}
         */

    }, {
        key: "size",
        get: function get() {
            return this._heapSize;
        }
    }], [{
        key: "parent",
        value: function parent(i) {
            return Math.floor(i / 2);
        }

        /**
         * This returns the left child of element i in the storing array.
         * @param i {Number} The element you wish to find the left child of.
         * @returns {number} The index of the left child of i.
         */

    }, {
        key: "left",
        value: function left(i) {
            return 2 * i;
        }
    }, {
        key: "right",
        value: function right(i) {
            return 2 * i + 1;
        }
    }]);

    return Heap;
}();

exports.default = Heap;