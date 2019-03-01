"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _DataSourceBase3 = require("./DataSourceBase");

var _DataSourceBase4 = _interopRequireDefault(_DataSourceBase3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

it("The Entire LifeCycle of DataSourceBase", function () {
    var toTest = new _DataSourceBase4.default();

    var propertyName = "_value";
    var valueToSet = "valueToSet";
    var valueRetrieved = null;
    var valueSource = null;
    var functionCalled = false;
    var theCallback = function theCallback(data) {
        valueRetrieved = data.object[propertyName];
        valueSource = data.source;
        functionCalled = true;
    };

    toTest.addOnChangeCallback(theCallback);
    toTest._setValueAndRaiseOnChange(propertyName, valueToSet);

    expect(valueRetrieved).toBe(valueToSet);
    expect(valueSource).toBe(propertyName);
    expect(functionCalled).toBe(true);

    toTest.removeOnChangeCallback(theCallback);
    functionCalled = false;
    toTest._setValueAndRaiseOnChange(propertyName, valueToSet);
    expect(functionCalled).toBe(false);
});

var Child = function (_DataSourceBase) {
    _inherits(Child, _DataSourceBase);

    function Child() {
        _classCallCheck(this, Child);

        var _this = _possibleConstructorReturn(this, (Child.__proto__ || Object.getPrototypeOf(Child)).call(this));

        _this._childProp = "Child Prop";
        return _this;
    }

    _createClass(Child, [{
        key: "childProp",
        get: function get() {
            return this._childProp;
        },
        set: function set(value) {
            this._setValueAndRaiseOnChange("_childProp", value);
        }
    }]);

    return Child;
}(_DataSourceBase4.default);

var Parent = function (_DataSourceBase2) {
    _inherits(Parent, _DataSourceBase2);

    function Parent() {
        _classCallCheck(this, Parent);

        var _this2 = _possibleConstructorReturn(this, (Parent.__proto__ || Object.getPrototypeOf(Parent)).call(this));

        _this2._test = "test";
        _this2._child = _this2._wireUp("_child", new Child());
        return _this2;
    }

    _createClass(Parent, [{
        key: "test",
        get: function get() {
            return this._test;
        },
        set: function set(value) {
            this._setValueAndRaiseOnChange("_test");
        }
    }, {
        key: "child",
        get: function get() {
            return this._child;
        },
        set: function set(value) {
            this._setValueAndRaiseOnChange("_child");
        }
    }]);

    return Parent;
}(_DataSourceBase4.default);

it("test changing the child prop", function () {
    // SETUP
    var parent = new Parent();
    var childPropToSet = "TEST VALUE";
    var functionDidFireCorrectly = false;
    var myOnChangeFunction = function myOnChangeFunction(e) {
        if (e.source === "_child._childProp" && e.newValue === childPropToSet) {
            functionDidFireCorrectly = true;
        }
    };
    parent.addOnChangeCallback(myOnChangeFunction);

    // CALL
    parent.child.childProp = childPropToSet;

    // ASSERT
    expect(functionDidFireCorrectly).toBe(true);
});

it("test unwiring child prop", function () {
    // SETUP
    var parent = new Parent();
    var child = parent.child;
    expect(child.numCallbacks).toBe(1);
    expect(child._ownerPropName).toBe("_child");

    // CALL
    parent.removeAllCallbacks();

    // ASSERT
    expect(child.numCallbacks).toBe(0);
    expect(child._ownerPropName).toBe(null);
});