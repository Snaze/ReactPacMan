"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Direction = require("./Direction");

var _Direction2 = _interopRequireDefault(_Direction);

var _Eventer = require("./Eventer");

var _Eventer2 = _interopRequireDefault(_Eventer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _singleton = Symbol();

var callback_keydown = 0;
var callback_keyup = 1;

var KeyEventer = function () {
    _createClass(KeyEventer, null, [{
        key: "CALLBACK_KEYDOWN",
        get: function get() {
            return callback_keydown;
        }
    }, {
        key: "CALLBACK_KEYUP",
        get: function get() {
            return callback_keyup;
        }
    }]);

    function KeyEventer(singletonToken) {
        var _this = this;

        _classCallCheck(this, KeyEventer);

        if (_singleton !== singletonToken) {
            throw new Error('Cannot instantiate directly.');
        }

        this._bindingElement = null;
        this._left = false;
        this._up = false;
        this._right = false;
        this._down = false;
        this._w = false;
        this._a = false;
        this._s = false;
        this._d = false;
        this._q = false;
        this._x = false;
        this._p = false;
        this._lastArrowPressed = null;
        this._keyDownEventer = new _Eventer2.default();
        this._keyUpEventer = new _Eventer2.default();

        if (typeof document !== "undefined") {
            this._bindingElement = document.body;
            this._bindingElement.onkeydown = function (e) {
                return _this.onKeyDown(e);
            };
            this._bindingElement.onkeyup = function (e) {
                return _this.onKeyUp(e);
            };
        }
    }

    _createClass(KeyEventer, [{
        key: "addCallback",
        value: function addCallback(theCallback, callbackType) {
            if (callbackType === KeyEventer.CALLBACK_KEYDOWN) {
                this._keyDownEventer.addCallback(theCallback);
            } else if (callbackType === KeyEventer.CALLBACK_KEYUP) {
                this._keyUpEventer.addCallback(theCallback);
            } else {
                throw new Error("Unknown Callback Type");
            }
        }
    }, {
        key: "removeCallback",
        value: function removeCallback(theCallback, callbackType) {
            if (callbackType === KeyEventer.CALLBACK_KEYDOWN) {
                this._keyDownEventer.removeCallback(theCallback);
            } else if (callbackType === KeyEventer.CALLBACK_KEYUP) {
                this._keyUpEventer.removeCallback(theCallback);
            } else {
                throw new Error("Unknown Callback Type");
            }
        }
    }, {
        key: "onKeyDown",
        value: function onKeyDown(e) {
            switch (e.key) {
                case "ArrowDown":
                    this._down = true;
                    this._lastArrowPressed = _Direction2.default.DOWN;
                    break;
                case "ArrowUp":
                    this._up = true;
                    this._lastArrowPressed = _Direction2.default.UP;
                    break;
                case "ArrowLeft":
                    this._left = true;
                    this._lastArrowPressed = _Direction2.default.LEFT;
                    break;
                case "ArrowRight":
                    this._right = true;
                    this._lastArrowPressed = _Direction2.default.RIGHT;
                    break;
                case "w":
                case "W":
                    this._w = true;
                    break;
                case "a":
                case "A":
                    this._a = true;
                    break;
                case "s":
                case "S":
                    this._s = true;
                    break;
                case "d":
                case "D":
                    this._d = true;
                    break;
                case "x":
                case "X":
                    this._x = true;
                    break;
                case "q":
                case "Q":
                    this._q = true;
                    break;
                case "Enter":
                case " ":
                case "F":
                case "f":
                    break;
                case "p":
                case "P":
                    this._p = true;
                    break;
                default:
                    return; // Quit when this doesn't handle the key event.
            }

            this._keyDownEventer.raiseEvent(e.key);
        }
    }, {
        key: "onKeyUp",
        value: function onKeyUp(e) {
            switch (e.key) {
                case "ArrowDown":
                    this._down = false;
                    if (this._lastArrowPressed === _Direction2.default.DOWN) {
                        this._lastArrowPressed = null;
                    }
                    break;
                case "ArrowUp":
                    this._up = false;
                    if (this._lastArrowPressed === _Direction2.default.UP) {
                        this._lastArrowPressed = null;
                    }
                    break;
                case "ArrowLeft":
                    this._left = false;
                    if (this._lastArrowPressed === _Direction2.default.LEFT) {
                        this._lastArrowPressed = null;
                    }
                    break;
                case "ArrowRight":
                    this._right = false;
                    if (this._lastArrowPressed === _Direction2.default.RIGHT) {
                        this._lastArrowPressed = null;
                    }
                    break;
                case "w":
                case "W":
                    this._w = false;
                    break;
                case "a":
                case "A":
                    this._a = false;
                    break;
                case "s":
                case "S":
                    this._s = false;
                    break;
                case "d":
                case "D":
                    this._d = false;
                    break;
                case "x":
                case "X":
                    this._x = false;
                    break;
                case "q":
                case "Q":
                    this._q = false;
                    break;
                case "Enter":
                case " ":
                case "F":
                case "f":
                    break;
                case "p":
                case "P":
                    this._p = false;
                    break;
                default:
                    return; // Quit when this doesn't handle the key event.
            }

            this._keyUpEventer.raiseEvent(e.key);
        }
    }, {
        key: "left",
        get: function get() {
            return this._left;
        }
    }, {
        key: "up",
        get: function get() {
            return this._up;
        }
    }, {
        key: "right",
        get: function get() {
            return this._right;
        }
    }, {
        key: "down",
        get: function get() {
            return this._down;
        }
    }, {
        key: "w",
        get: function get() {
            return this._w;
        }
    }, {
        key: "a",
        get: function get() {
            return this._a;
        }
    }, {
        key: "s",
        get: function get() {
            return this._s;
        }
    }, {
        key: "d",
        get: function get() {
            return this._d;
        }
    }, {
        key: "q",
        get: function get() {
            return this._q;
        }
    }, {
        key: "x",
        get: function get() {
            return this._x;
        }
    }, {
        key: "p",
        get: function get() {
            return this._p;
        }
    }, {
        key: "lastArrowPressed",
        get: function get() {
            return this._lastArrowPressed;
        }
    }], [{
        key: "instance",
        get: function get() {
            if (!this[_singleton]) {
                this[_singleton] = new KeyEventer(_singleton);
            }

            return this[_singleton];
        }
    }]);

    return KeyEventer;
}();

exports.default = KeyEventer;