'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _NeuralNetworkNodeDetail = require('./NeuralNetworkNodeDetail');

var _NeuralNetworkNodeDetail2 = _interopRequireDefault(_NeuralNetworkNodeDetail);

var _NeuralNetworkNode = require('../../model/ai/ann/NeuralNetworkNode');

var _NeuralNetworkNode2 = _interopRequireDefault(_NeuralNetworkNode);

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
    return new _NeuralNetworkNode2.default(0, 0, edgeStore, 3, 3);
};

it("basic test", function () {
    var div = document.createElement('div');
    var nnnModel = createNNN();
    var nnnDS = new _NeuralNetworkNodeDS2.default(nnnModel);
    nnnDS.activationInput = [1.0];
    nnnDS.error = [1.0];
    nnnDS.weights = [1.0];
    nnnDS.output = [1.0];

    _reactDom2.default.render(_react2.default.createElement(_NeuralNetworkNodeDetail2.default, {
        dataSource: nnnDS }), div);
});