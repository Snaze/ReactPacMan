"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Eventer = function () {
    function Eventer() {
        _classCallCheck(this, Eventer);

        this._callbacks = [];
    }

    _createClass(Eventer, [{
        key: "addCallback",
        value: function addCallback(theCallback) {
            this._callbacks.push(theCallback);
        }
    }, {
        key: "removeCallback",
        value: function removeCallback(theCallback) {

            var theIndex = this._callbacks.indexOf(theCallback);
            if (theIndex >= 0) {
                this._callbacks.splice(theIndex, 1);
            }
        }
    }, {
        key: "removeAllCallbacks",
        value: function removeAllCallbacks() {
            this._callbacks = [];
        }
    }, {
        key: "raiseEvent",
        value: function raiseEvent() {
            var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

            if (data === null) {
                data = {};
            }

            this._callbacks.forEach(function (theCallback) {
                try {
                    theCallback(data);
                } catch (e) {
                    console.log(e);
                }
            });
        }
    }, {
        key: "numCallbacks",
        get: function get() {
            return this._callbacks.length;
        }
    }]);

    return Eventer;
}();

exports.default = Eventer;