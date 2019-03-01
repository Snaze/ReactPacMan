"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Eventer = require("../utils/Eventer");

var _Eventer2 = _interopRequireDefault(_Eventer);

var _lodash = require("../../node_modules/lodash/lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DataSourceBase = function () {
    _createClass(DataSourceBase, null, [{
        key: "getNextId",
        value: function getNextId() {
            return DataSourceBase.nextId++;
        }
    }]);

    function DataSourceBase() {
        var _this = this;

        _classCallCheck(this, DataSourceBase);

        this._dataSourceId = DataSourceBase.getNextId().toString();
        this._ownerPropName = null;
        this._eventer = new _Eventer2.default();
        this._nestDataSourceChangedRef = function (e) {
            return _this._nestedDataSourceChanged(e);
        };
        this._nestedDataSources = {};
        this._debug = false;
        this._toIgnore = [];
        this._wireCount = 0;
        this._unWireCount = 0;
    }

    _createClass(DataSourceBase, [{
        key: "addOnChangeCallback",
        value: function addOnChangeCallback(callback) {
            if (this._eventer) {
                this._eventer.addCallback(callback);
            }
        }
    }, {
        key: "removeOnChangeCallback",
        value: function removeOnChangeCallback(callback) {
            if (this._eventer) {
                this._eventer.removeCallback(callback);
            }
        }
    }, {
        key: "removeAllCallbacks",
        value: function removeAllCallbacks() {
            if (this._eventer) {
                this._eventer.removeAllCallbacks();
            }

            for (var prop in this._nestedDataSources) {
                if (this._nestedDataSources.hasOwnProperty(prop)) {
                    this._unWireForDestruction(this._nestedDataSources[prop]);
                }
            }
        }
    }, {
        key: "_doTheDisposal",
        value: function _doTheDisposal(propName, self) {
            if (typeof self[propName] === "undefined" || self[propName] === null) {
                return;
            }

            if (typeof self[propName].dispose !== "undefined") {
                self[propName].dispose();
            }

            self[propName] = null;
        }
    }, {
        key: "dispose",
        value: function dispose() {
            this.removeAllCallbacks();

            // this._doTheDisposal("_dataSourceId", this);
            // this._doTheDisposal("_ownerPropName", this);
            // this._doTheDisposal("_eventer", this);
            // this._doTheDisposal("_nestDataSourceChangedRef", this);
            // this._doTheDisposal("_nestedDataSources", this);
            // this._doTheDisposal("_debug", this);
            // this._doTheDisposal("_toIgnore", this);
            for (var prop in this) {
                this._doTheDisposal(prop, this);
            }

            if (this._wireCount !== this._unWireCount) {
                throw new Error("Wire and Unwire counts don't match");
            }
        }
    }, {
        key: "log",
        value: function log(toLog) {
            if (this.debug && typeof console !== "undefined") {
                console.log(toLog);
            }
        }
    }, {
        key: "_shouldIgnore",
        value: function _shouldIgnore(source) {
            for (var i = 0; i < this._toIgnore.length; i++) {
                if (_lodash2.default.endsWith(this._toIgnore[i], source)) {
                    return true;
                }
            }

            return false;
        }
    }, {
        key: "_nestedDataSourceChanged",
        value: function _nestedDataSourceChanged(e) {

            // When overridding this method, add your custom code and then call super
            // super._nestedDataSourceChanged(e);

            if (this._shouldIgnore(e.source)) {
                return;
            }

            var source = e.object.ownerPropName + "." + e.source;
            this._eventer.raiseEvent({
                object: this,
                source: source,
                oldValue: e.oldValue,
                newValue: e.newValue
            });

            this.log("DataSourceBase._nestedDataSourceChanged: " + source);
        }

        /**
         * In the constructor, when setting a private field on your object, use this method
         * to wire up the onchange events.
         *
         * @param propName The private field name of the object.
         * @param nestedObject The nested object you wish to set to the private field name
         */

    }, {
        key: "_wireUp",
        value: function _wireUp(propName, nestedObject) {
            if (!(nestedObject instanceof DataSourceBase)) {
                throw new Error("toNest must be an instance of DataSourceBase");
            }

            if (typeof this._nestedDataSources[nestedObject.dataSourceId] !== "undefined") {
                throw new Error("this._nestDataSource already contains a id '" + nestedObject.dataSourceId + "'");
            }

            nestedObject.addOnChangeCallback(this._nestDataSourceChangedRef);
            this._nestedDataSources[nestedObject.dataSourceId] = nestedObject;

            nestedObject._ownerPropName = propName;

            this._wireCount++;

            return nestedObject;
        }
    }, {
        key: "_unWire",
        value: function _unWire(nestedObject) {
            if (!(nestedObject instanceof DataSourceBase)) {
                throw new Error("toNest must be an instance of DataSourceBase");
            }

            if (typeof this._nestedDataSources[nestedObject.dataSourceId] === "undefined") {
                this.log("this._nestDataSource does not contain nestedObject.dataSourceId = '" + nestedObject.dataSourceId + "'");
                return;
            }

            nestedObject.removeOnChangeCallback(this._nestDataSourceChangedRef);
            nestedObject._ownerPropName = null;
            delete this._nestedDataSources[nestedObject.dataSourceId];
            this._unWireCount++;
        }
    }, {
        key: "_unWireForDestruction",
        value: function _unWireForDestruction(nestedObject) {
            this._unWire(nestedObject);
            nestedObject.removeAllCallbacks();
        }
    }, {
        key: "_raiseOnChangeCallbacks",
        value: function _raiseOnChangeCallbacks(source, oldValue, newValue) {
            if (this._shouldIgnore(source)) {
                return;
            }

            this._eventer.raiseEvent({
                object: this,
                source: source,
                oldValue: oldValue,
                newValue: newValue
            });

            this.log("DataSourceBase._raiseOnChangeCallbacks: " + source);
        }
    }, {
        key: "forceUpdate",
        value: function forceUpdate() {
            this._eventer.raiseEvent({
                object: this,
                source: "",
                oldValue: this,
                newValue: this,
                forceUpdate: true
            });
        }
    }, {
        key: "_setValueAndRaiseOnChange",
        value: function _setValueAndRaiseOnChange(property, newValue) {
            if (typeof this[property] !== 'undefined' && this[property] === newValue) {
                return;
            }

            var oldValue = this[property];
            this[property] = newValue;
            this._raiseOnChangeCallbacks(property, oldValue, newValue);
        }
    }, {
        key: "dataSourceId",
        get: function get() {
            return this._dataSourceId;
        }
    }, {
        key: "ownerPropName",
        get: function get() {
            return this._ownerPropName;
        }
    }, {
        key: "numCallbacks",
        get: function get() {
            return this._eventer.numCallbacks;
        }
    }, {
        key: "debug",
        get: function get() {
            return this._debug;
        },
        set: function set(value) {
            this._debug = value;
        }
    }, {
        key: "toIgnore",
        get: function get() {
            return this._toIgnore;
        }
    }]);

    return DataSourceBase;
}();

DataSourceBase.nextId = 1;
exports.default = DataSourceBase;