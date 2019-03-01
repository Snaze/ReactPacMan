'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _NeuralNetworkNode = require('./NeuralNetworkNode');

var _NeuralNetworkNode2 = _interopRequireDefault(_NeuralNetworkNode);

var _NeuralNetworkNode3 = require('../../model/ai/ann/NeuralNetworkNode');

var _NeuralNetworkNode4 = _interopRequireDefault(_NeuralNetworkNode3);

var _NeuralNetworkNodeDS = require('../../model/NeuralNetworkNodeDS');

var _NeuralNetworkNodeDS2 = _interopRequireDefault(_NeuralNetworkNodeDS);

var _EdgeStore = require('../../model/ai/ann/EdgeStore');

var _EdgeStore2 = _interopRequireDefault(_EdgeStore);

var _ActivationFunctions = require('../../model/ai/ann/ActivationFunctions');

var _ActivationFunctions2 = _interopRequireDefault(_ActivationFunctions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO: there is a code smell here.  You need to isolate that stuff as much as possible
var createNNN = function createNNN() {
    var edgeStore = new _EdgeStore2.default([3, 3, 3], true, _ActivationFunctions2.default.sigmoid);
    return new _NeuralNetworkNode4.default(0, 0, edgeStore, 3, 3);
};

it('renders without crashing', function () {
    var div = document.createElement('div');
    var nnnModel = createNNN();
    var nnnDS = new _NeuralNetworkNodeDS2.default(nnnModel);

    _reactDom2.default.render(_react2.default.createElement(_NeuralNetworkNode2.default, {
        dataSource: nnnDS,
        centerX: 16, centerY: 16, radius: 8, highlightStroke: "aqua", strokeWidth: 5, stroke: "green" }), div);
});