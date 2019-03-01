"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Recharts = require("../../node_modules/recharts/umd/Recharts");

var _NeuralNetwork = require("../model/ai/ann/NeuralNetwork");

var _NeuralNetwork2 = _interopRequireDefault(_NeuralNetwork);

var _MathUtil = require("../model/ai/MathUtil");

var _MathUtil2 = _interopRequireDefault(_MathUtil);

require("./NeuralNetworkTest.css");

var _ActivationFunctions = require("../model/ai/ann/ActivationFunctions");

var _ActivationFunctions2 = _interopRequireDefault(_ActivationFunctions);

var _WeightInitializer = require("../model/ai/ann/WeightInitializer");

var _WeightInitializer2 = _interopRequireDefault(_WeightInitializer);

var _ArrayUtils = require("../utils/ArrayUtils");

var _ArrayUtils2 = _interopRequireDefault(_ArrayUtils);

var _NeuralNetworkParameter = require("../model/ai/ann/NeuralNetworkParameter");

var _NeuralNetworkParameter2 = _interopRequireDefault(_NeuralNetworkParameter);

var _NeuralNetworkVisualizer = require("../ai/ann/NeuralNetworkVisualizer");

var _NeuralNetworkVisualizer2 = _interopRequireDefault(_NeuralNetworkVisualizer);

var _NeuralNetworkDS = require("../model/NeuralNetworkDS");

var _NeuralNetworkDS2 = _interopRequireDefault(_NeuralNetworkDS);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import {assert} from "../utils/Assert";

var NeuralNetworkTest = function (_Component) {
    _inherits(NeuralNetworkTest, _Component);

    /**
     * Life Cycle Step 1
     * @param props
     */
    function NeuralNetworkTest(props) {
        _classCallCheck(this, NeuralNetworkTest);

        var _this = _possibleConstructorReturn(this, (NeuralNetworkTest.__proto__ || Object.getPrototypeOf(NeuralNetworkTest)).call(this, props));

        _this._numOutputs = 2;
        _this._numInputs = 5;
        _this._nnCallbackRef = function (e) {
            return _this._nnCallback(e);
        };

        // this._neuralNetwork.setWeights([[[-45.42877134937925,0.06307931678138425,86.16102782528077],[1.0979752237380247,43.93067987200524,-86.27794022812651]],[[10.168778876191363,-9.997238479805933,0.552376336368361],[19.20396670170233,-13.954600932323425,12.059486933582416],[11.620645753000291,-11.462057255950354,0.6045539499607651]],[[-3.302596057655691,-5.123564179398088,-3.7756837144896305,4.960726472470421],[3.219538642433655,5.088310440177473,3.899255941522516,-4.940265049557309]]]);

        _this.state = {
            epochs: 0,
            error: 1000000,
            dataOutOfRange: [],
            dataInRange: [],
            // weights: JSON.stringify(this._neuralNetwork.getWeights())
            weights: "",
            maxEpochs: 20,
            minWeightDelta: null,
            miniBatchSize: 10,
            cacheMinErrorNetwork: false,
            learningRate: 0.15,
            normalize: true,
            trainingSetSize: 2000,
            hiddenLayers: "6, 6",
            activationFunction: "tanh",
            trainDataOutOfRange: [],
            trainDataInRange: [],
            testType: "xor",
            greenCount: 0,
            redCount: 0,
            showDetail: false,
            includeBias: true,
            weightInitialization: "COMPRESSED_NORMAL",
            showVisualizer: false,
            neuralNetworkDS: null,
            backPropType: "sgd"
        };

        _this._testData = {};
        return _this;
    }

    _createClass(NeuralNetworkTest, [{
        key: "isGreen",
        value: function isGreen(point) {
            var distance = _MathUtil2.default.distance([point[0], point[1]], [0, 0]);

            switch (this.state.testType) {
                case "xor":
                    return point[0] >= 0 && point[1] >= 0 || point[0] < 0 && point[1] < 0;
                case "circle":
                    return distance < 5.0 && distance >= 0;
                case "bullseye":
                    return distance < 2.0 && distance >= 0 || distance < 6.0 && distance >= 4 || distance < 10.0 && distance >= 8;
                default:
                    throw new Error("Unknown test type");
            }
        }
    }, {
        key: "getExpectedValue",
        value: function getExpectedValue(point) {

            var falseValue = null;
            var trueValue = null;

            falseValue = -1.0;
            trueValue = 1.0;

            if (this.state.activationFunction === "sigmoid") {
                falseValue = 0.0;
                trueValue = 1.0;
            } else if (this.state.activationFunction === "tanh") {
                falseValue = -1.0;
                trueValue = 1.0;
            } else if (this.state.activationFunction === "relu") {
                falseValue = 0;
                trueValue = 1.0;
            } else if (this.state.activationFunction === "lrelu") {
                falseValue = 0;
                trueValue = 1.0;
            } else {
                throw new Error("Unknown activation function");
            }

            var toRet = [falseValue, falseValue];
            // let distance = MathUtil.distance(point, [0, 0]);

            // This is kind of lame but its easy to read

            if (this.isGreen(point)) {
                toRet[0] = trueValue;
            } else {
                toRet[1] = trueValue;
            }

            return toRet;
        }
    }, {
        key: "componentWillMount",


        /**
         * Life Cycle Step 2
         */
        value: function componentWillMount() {
            // this.trainAndTest();
        }
    }, {
        key: "trainAndTest",
        value: function trainAndTest() {
            this.trainNetwork();
        }
    }, {
        key: "epochFinished",
        value: function epochFinished(nn) {
            this.setState({
                epochs: nn.epochs
            });

            if (nn.epochs % 5 === 0 || nn.epochs === 1) {
                this.testData();
            }
        }
    }, {
        key: "trainingFinished",
        value: function trainingFinished(nn) {
            this.testData();
        }
    }, {
        key: "trainNetwork",
        value: function trainNetwork() {
            var inputs = [];
            var expected = [];
            var greenCount = 0;
            var redCount = 0;
            var trainDataInRange = [];
            var trainDataOutOfRange = [];
            var toPushTo = void 0;

            // alert(this._neuralNetwork.getWeights());

            for (var i = 0; i < this.state.trainingSetSize; i++) {
                var randomPoint1 = NeuralNetworkTest.getRandomPoint(-10, 10, -10, 10);

                // this is so lame
                if (i % 2 === 0) {
                    while (!this.isGreen(randomPoint1)) {
                        randomPoint1 = NeuralNetworkTest.getRandomPoint(-10, 10, -10, 10);
                    }

                    toPushTo = trainDataInRange;
                } else {
                    while (this.isGreen(randomPoint1)) {
                        randomPoint1 = NeuralNetworkTest.getRandomPoint(-10, 10, -10, 10);
                    }

                    toPushTo = trainDataOutOfRange;
                }

                toPushTo.push({
                    x: randomPoint1[0],
                    y: randomPoint1[1],
                    x2: randomPoint1[2],
                    y2: randomPoint1[3],
                    d: randomPoint1[4]
                });

                inputs.push(randomPoint1);
                var expectedValue = this.getExpectedValue(randomPoint1);
                expected.push(expectedValue);

                if (this.isGreen(randomPoint1)) {
                    greenCount++;
                } else {
                    redCount++;
                }
            }

            // alert (`redCount = ${redCount}, greenCount = ${greenCount}`);

            var range = _ArrayUtils2.default.range(inputs.length);
            var numToTake = Math.floor(inputs.length * 0.8);
            var trainRangeIndices = _ArrayUtils2.default.take(range, numToTake, 0);
            var testRangeIndices = _ArrayUtils2.default.take(range, 1000000, numToTake);

            this._testData["inputs"] = _ArrayUtils2.default.selectByIndices(inputs, testRangeIndices);
            this._testData["expected"] = _ArrayUtils2.default.selectByIndices(expected, testRangeIndices);

            inputs = _ArrayUtils2.default.selectByIndices(inputs, trainRangeIndices);
            expected = _ArrayUtils2.default.selectByIndices(expected, trainRangeIndices);

            var nnp = new _NeuralNetworkParameter2.default();
            nnp.inputs = inputs;
            nnp.expectedOutputs = expected;
            nnp.miniBatchSize = this.state.miniBatchSize;
            nnp.normalizeInputs = this.state.normalize;
            nnp.maxEpochs = this.state.maxEpochs;
            nnp.minError = null;
            nnp.minWeightDelta = this.state.minWeightDelta;
            nnp.cacheMinError = this.state.cacheMinErrorNetwork;
            // nnp.epochCompleteCallback = (e) => this.epochFinished(e);
            // nnp.finishedTrainingCallback = (e) => this.trainingFinished(e);

            // alert (`maxEpochs = ${this.state.maxEpochs}`);
            // this.testData(error);
            this._neuralNetwork.train(nnp);

            var theWeights = this._neuralNetwork.getWeights();

            this.setState({
                weights: JSON.stringify(theWeights),
                trainDataInRange: trainDataInRange,
                trainDataOutOfRange: trainDataOutOfRange,
                greenCount: greenCount,
                redCount: redCount
            });
        }
    }, {
        key: "testData",
        value: function testData() {
            var dataOutOfRange = [];
            var dataInRange = [];

            for (var i = 0; i < this._testData.inputs.length; i++) {

                var randomPoint = this._testData.inputs[i];
                var prediction = this._neuralNetwork.predict([randomPoint]);
                var theDataSet = null;

                if (NeuralNetworkTest.isPredictionGreen(prediction[0])) {
                    theDataSet = dataInRange;
                } else {
                    theDataSet = dataOutOfRange;
                }

                theDataSet.push({
                    x: randomPoint[0],
                    y: randomPoint[1],
                    x2: randomPoint[2],
                    y2: randomPoint[3],
                    prediction: prediction,
                    d: randomPoint[4]
                });
            }

            this.setState({
                error: 0,
                dataOutOfRange: dataOutOfRange,
                dataInRange: dataInRange
            });
        }
    }, {
        key: "getNumCorrect",
        value: function getNumCorrect(data) {
            var inRange = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            var numCorrect = 0;

            data.forEach(function (point) {
                var tempPoint = [point.x, point.y];

                if (inRange) {
                    if (this.isGreen(tempPoint)) {
                        numCorrect++;
                    }
                } else {
                    if (!this.isGreen(tempPoint)) {
                        numCorrect++;
                    }
                }
            }.bind(this));

            return numCorrect;
        }
    }, {
        key: "getStyle",
        value: function getStyle(point) {
            var inRange = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            var tempPoint = [point.x, point.y];

            if (inRange) {
                if (this.isGreen(tempPoint)) {
                    return {
                        color: "black"
                    };
                } else {
                    return {
                        color: "red"
                    };
                }
            } else {
                if (this.isGreen(tempPoint)) {
                    return {
                        color: "red"
                    };
                } else {
                    return {
                        color: "black"
                    };
                }
            }
        }
    }, {
        key: "getData",
        value: function getData(theRange, keyName) {
            var toRet = [];
            var index = 0;
            var inRange = keyName.toLowerCase() === "inrange";

            theRange.forEach(function (point) {
                toRet.push(_react2.default.createElement(
                    "tr",
                    { key: keyName + index.toString(), style: this.getStyle(point, inRange) },
                    _react2.default.createElement(
                        "td",
                        { style: { textAlign: "left", border: "solid 1px black" } },
                        point.x
                    ),
                    _react2.default.createElement(
                        "td",
                        { style: { textAlign: "left", border: "solid 1px black" } },
                        point.y
                    ),
                    _react2.default.createElement(
                        "td",
                        { style: { textAlign: "left", border: "solid 1px black" } },
                        point.prediction[0][0].toFixed(4),
                        ", ",
                        point.prediction[0][1].toFixed(4)
                    )
                ));

                index++;
            }.bind(this));

            return toRet;
        }
    }, {
        key: "getDataAsTable",
        value: function getDataAsTable(theRange, keyName) {
            if (!this.state.showDetail) {
                return null;
            }

            return _react2.default.createElement(
                "table",
                { cellSpacing: 0, style: { border: "solid 1px black" } },
                _react2.default.createElement(
                    "thead",
                    null,
                    _react2.default.createElement(
                        "tr",
                        null,
                        _react2.default.createElement(
                            "th",
                            null,
                            "x"
                        ),
                        _react2.default.createElement(
                            "th",
                            null,
                            "y"
                        ),
                        _react2.default.createElement(
                            "th",
                            null,
                            "prediction"
                        )
                    )
                ),
                _react2.default.createElement(
                    "tbody",
                    null,
                    this.getData(theRange, keyName)
                )
            );
        }
    }, {
        key: "getDetailDiv",
        value: function getDetailDiv(title, theRange) {
            var inRange = theRange === this.state.dataInRange;
            var numCorrect = this.getNumCorrect(theRange, inRange);
            var length = theRange.length;
            var percentCorrect = numCorrect / length * 100;

            return _react2.default.createElement(
                "div",
                null,
                title,
                ":\xA0",
                numCorrect,
                "\xA0/\xA0",
                length,
                "\xA0=\xA0",
                percentCorrect,
                "\xA0%"
            );
        }
    }, {
        key: "tableOnChange",
        value: function tableOnChange(e) {

            switch (e.target.name) {
                case "txtMaxEpochs":
                    var maxEpochs = null;
                    if (e.target.value !== "null") {
                        try {
                            maxEpochs = parseInt(e.target.value, 10);
                        } catch (e) {}
                    }
                    this.setState({
                        maxEpochs: maxEpochs
                    });
                    break;
                case "txtMinWeightDelta":
                    var minWeightDelta = null;
                    if (e.target.value !== "null") {
                        try {
                            minWeightDelta = parseInt(e.target.value, 10);
                        } catch (e) {}
                    }
                    this.setState({
                        minWeightDelta: minWeightDelta
                    });
                    break;
                case "txtMiniBatchSize":
                    var miniBatchSize = null;
                    if (e.target.value !== "null") {
                        try {
                            miniBatchSize = parseInt(e.target.value, 10);
                        } catch (e) {}
                    }
                    this.setState({
                        miniBatchSize: miniBatchSize
                    });
                    break;
                case "txtCacheMinErrorNetwork":
                    var cacheMinErrorNetwork = e.target.value === "true";
                    this.setState({
                        cacheMinErrorNetwork: cacheMinErrorNetwork
                    });
                    break;
                case "txtLearningRate":
                    var learningRate = parseFloat(e.target.value);
                    this.setState({
                        learningRate: learningRate
                    });
                    break;
                case "txtNormalize":
                    var normalize = e.target.value === "true";
                    this.setState({
                        normalize: normalize
                    });
                    break;
                case "txtTrainingSetSize":
                    var trainingSetSize = 2000;
                    try {
                        trainingSetSize = parseInt(e.target.value, 10);
                    } catch (e) {}
                    this.setState({
                        trainingSetSize: trainingSetSize
                    });
                    break;
                case "txtHiddenLayers":
                    var hiddenLayers = e.target.value;

                    this.setState({
                        hiddenLayers: hiddenLayers
                    });
                    break;
                case "ddlActivationFunction":
                    var activationFunction = e.target.value;

                    this.setState({
                        activationFunction: activationFunction
                    });
                    break;
                case "ddlTestType":
                    var testType = e.target.value;

                    this.setState({
                        testType: testType
                    });
                    break;
                case "ddlShowDetail":
                    var showDetail = e.target.value === "true";

                    this.setState({
                        showDetail: showDetail
                    });
                    break;
                case "ddlIncludeBias":
                    var includeBias = e.target.value === "true";

                    this.setState({
                        includeBias: includeBias
                    });
                    break;
                case "ddlWeightInitialization":
                    var weightInitialization = e.target.value;

                    this.setState({
                        weightInitialization: weightInitialization
                    });
                    break;
                case "ddlShowVisualizer":
                    var showVisualizer = e.target.value === "true";

                    this.setState({
                        showVisualizer: showVisualizer
                    });
                    break;
                case "ddlBackPropType":
                    var backPropType = e.target.value;

                    this.setState({
                        backPropType: backPropType
                    });
                    break;
                default:
                    break;
            }
        }
    }, {
        key: "createLayersArray",
        value: function createLayersArray() {
            var toRet = [this._numInputs];

            if (this.state.hiddenLayers !== "") {
                var innerArray = this.state.hiddenLayers.split(/[,\s]/);
                innerArray = _ArrayUtils2.default.filter(innerArray, function (item) {
                    return item !== "" && item !== " ";
                });

                _ArrayUtils2.default.extend(toRet, innerArray, function (item) {
                    return parseInt(item, 10);
                });
            }
            _ArrayUtils2.default.extend(toRet, [this._numOutputs]);

            return toRet;
        }
    }, {
        key: "_nnCallback",
        value: function _nnCallback(e) {
            if (e.type === _NeuralNetwork2.default.NEURAL_NETWORK_EPOCH_COMPLETE) {
                this.epochFinished(this._neuralNetwork);
            } else if (e.type === _NeuralNetwork2.default.NEURAL_NETWORK_TRAINING_COMPLETE) {
                this.trainingFinished(this._neuralNetwork);
            }
        }
    }, {
        key: "btnClick",
        value: function btnClick(e) {
            if (e.target.name === "btnTrain") {
                var layersArray = this.createLayersArray();

                this._neuralNetwork = new _NeuralNetwork2.default(layersArray, this.state.includeBias, _ActivationFunctions2.default[this.state.activationFunction], this.state.learningRate, _WeightInitializer2.default[this.state.weightInitialization], null, false, 1e-3, this.state.backPropType);

                this._neuralNetwork.callback = this._nnCallbackRef;

                this.setState({
                    _neuralNetworkDS: new _NeuralNetworkDS2.default(this._neuralNetwork),
                    showVisualizer: false
                });

                this.trainAndTest();

                // this.forceUpdate();
            } else if (e.target.name === "btnStop") {
                this._neuralNetwork.stopTimer();
            }
        }
    }, {
        key: "getVisualizer",
        value: function getVisualizer() {
            if (this.state.showVisualizer) {
                return _react2.default.createElement(_NeuralNetworkVisualizer2.default, { dataSource: this.state._neuralNetworkDS });
            }

            return null;
        }

        /**
         * Life Cycle Step 3
         * @returns {XML}
         */

    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                "div",
                { className: "NeuralNetworkTest" },
                _react2.default.createElement(
                    "h4",
                    { style: { textAlign: "center" } },
                    "Neural Network Tester"
                ),
                _react2.default.createElement(
                    "h5",
                    { style: { textAlign: "center" } },
                    "Input Nodes (",
                    this._numInputs,
                    "): x, y, x^2, y^2, distance from origin",
                    _react2.default.createElement("br", null),
                    "Output Nodes (2): true / false"
                ),
                _react2.default.createElement(
                    "div",
                    { className: "NeuralNetworkTestChart" },
                    _react2.default.createElement(
                        "table",
                        null,
                        _react2.default.createElement(
                            "tbody",
                            null,
                            _react2.default.createElement(
                                "tr",
                                null,
                                _react2.default.createElement(
                                    "td",
                                    { style: { verticalAlign: "top", textAlign: "left" } },
                                    _react2.default.createElement(
                                        "table",
                                        { style: { textAlign: "center" } },
                                        _react2.default.createElement(
                                            "tbody",
                                            null,
                                            _react2.default.createElement(
                                                "tr",
                                                null,
                                                _react2.default.createElement(
                                                    "td",
                                                    null,
                                                    _react2.default.createElement(
                                                        "table",
                                                        null,
                                                        _react2.default.createElement(
                                                            "tbody",
                                                            null,
                                                            _react2.default.createElement(
                                                                "tr",
                                                                null,
                                                                _react2.default.createElement(
                                                                    "td",
                                                                    { colSpan: 2 },
                                                                    "Train Data:"
                                                                )
                                                            ),
                                                            _react2.default.createElement(
                                                                "tr",
                                                                null,
                                                                _react2.default.createElement(
                                                                    "td",
                                                                    null,
                                                                    "Red Count: ",
                                                                    this.state.redCount
                                                                ),
                                                                _react2.default.createElement(
                                                                    "td",
                                                                    null,
                                                                    "Green Count: ",
                                                                    this.state.greenCount
                                                                )
                                                            )
                                                        )
                                                    )
                                                ),
                                                _react2.default.createElement(
                                                    "td",
                                                    null,
                                                    "Predictions:"
                                                )
                                            ),
                                            _react2.default.createElement(
                                                "tr",
                                                null,
                                                _react2.default.createElement(
                                                    "td",
                                                    null,
                                                    _react2.default.createElement(
                                                        _Recharts.ScatterChart,
                                                        { width: 400, height: 400,
                                                            margin: { top: 0, right: 25, left: 25, bottom: 25 } },
                                                        _react2.default.createElement(_Recharts.XAxis, { dataKey: 'x', allowDecimals: false, type: "number" }),
                                                        _react2.default.createElement(_Recharts.YAxis, { dataKey: 'y', allowDecimals: false }),
                                                        _react2.default.createElement(_Recharts.Scatter, { name: "Out of Range", data: this.state.trainDataOutOfRange,
                                                            fill: "red" }),
                                                        _react2.default.createElement(_Recharts.Scatter, { name: "In Range", data: this.state.trainDataInRange, fill: "green" }),
                                                        _react2.default.createElement(_Recharts.CartesianGrid, null)
                                                    )
                                                ),
                                                _react2.default.createElement(
                                                    "td",
                                                    null,
                                                    _react2.default.createElement(
                                                        _Recharts.ScatterChart,
                                                        { width: 400, height: 400,
                                                            margin: { top: 0, right: 25, left: 25, bottom: 25 } },
                                                        _react2.default.createElement(_Recharts.XAxis, { dataKey: 'x', allowDecimals: false, type: "number" }),
                                                        _react2.default.createElement(_Recharts.YAxis, { dataKey: 'y', allowDecimals: false }),
                                                        _react2.default.createElement(_Recharts.Scatter, { name: "Out of Range", data: this.state.dataOutOfRange, fill: "red" }),
                                                        _react2.default.createElement(_Recharts.Scatter, { name: "In Range", data: this.state.dataInRange, fill: "green" }),
                                                        _react2.default.createElement(_Recharts.CartesianGrid, null)
                                                    )
                                                )
                                            )
                                        )
                                    )
                                ),
                                _react2.default.createElement(
                                    "td",
                                    { style: { verticalAlign: "top", display: "none" } },
                                    _react2.default.createElement("textarea", { cols: 30, rows: 25, defaultValue: this.state.weights })
                                ),
                                _react2.default.createElement(
                                    "td",
                                    { style: { verticalAlign: "top" } },
                                    _react2.default.createElement(
                                        "table",
                                        { onChange: function onChange(e) {
                                                return _this2.tableOnChange(e);
                                            } },
                                        _react2.default.createElement(
                                            "tbody",
                                            null,
                                            _react2.default.createElement(
                                                "tr",
                                                null,
                                                _react2.default.createElement(
                                                    "td",
                                                    { className: "NeuralNetworkRightCell" },
                                                    "Test Type:"
                                                ),
                                                _react2.default.createElement(
                                                    "td",
                                                    { className: "NeuralNetworkLeftCell" },
                                                    _react2.default.createElement(
                                                        "select",
                                                        { name: "ddlTestType", value: this.state.testType,
                                                            onChange: function onChange(e) {
                                                                return _this2.tableOnChange(e);
                                                            } },
                                                        _react2.default.createElement(
                                                            "option",
                                                            { value: "xor" },
                                                            "xor"
                                                        ),
                                                        _react2.default.createElement(
                                                            "option",
                                                            { value: "circle" },
                                                            "circle"
                                                        ),
                                                        _react2.default.createElement(
                                                            "option",
                                                            { value: "bullseye" },
                                                            "Bull's Eye"
                                                        )
                                                    )
                                                )
                                            ),
                                            _react2.default.createElement(
                                                "tr",
                                                null,
                                                _react2.default.createElement(
                                                    "td",
                                                    { className: "NeuralNetworkRightCell" },
                                                    "Activation Function:"
                                                ),
                                                _react2.default.createElement(
                                                    "td",
                                                    { className: "NeuralNetworkLeftCell" },
                                                    _react2.default.createElement(
                                                        "select",
                                                        { name: "ddlActivationFunction", value: this.state.activationFunction,
                                                            onChange: function onChange(e) {
                                                                return _this2.tableOnChange(e);
                                                            } },
                                                        _react2.default.createElement(
                                                            "option",
                                                            { value: "tanh" },
                                                            "tanh"
                                                        ),
                                                        _react2.default.createElement(
                                                            "option",
                                                            { value: "sigmoid" },
                                                            "sigmoid"
                                                        ),
                                                        _react2.default.createElement(
                                                            "option",
                                                            { value: "relu" },
                                                            "relu"
                                                        ),
                                                        _react2.default.createElement(
                                                            "option",
                                                            { value: "lrelu" },
                                                            "lrelu"
                                                        )
                                                    )
                                                )
                                            ),
                                            _react2.default.createElement(
                                                "tr",
                                                null,
                                                _react2.default.createElement(
                                                    "td",
                                                    { className: "NeuralNetworkRightCell" },
                                                    "Weight Init Type:"
                                                ),
                                                _react2.default.createElement(
                                                    "td",
                                                    { className: "NeuralNetworkLeftCell" },
                                                    _react2.default.createElement(
                                                        "select",
                                                        { name: "ddlWeightInitialization", value: this.state.weightInitialization,
                                                            onChange: function onChange(e) {
                                                                return _this2.tableOnChange(e);
                                                            } },
                                                        _react2.default.createElement(
                                                            "option",
                                                            { value: "COMPRESSED_NORMAL" },
                                                            "Compressed Gaussian"
                                                        ),
                                                        _react2.default.createElement(
                                                            "option",
                                                            { value: "GENERIC_NORMAL" },
                                                            "Gaussian"
                                                        ),
                                                        _react2.default.createElement(
                                                            "option",
                                                            { value: "FAN_IN_FAN_OUT" },
                                                            "Fan-in / Fan-out"
                                                        )
                                                    )
                                                )
                                            ),
                                            _react2.default.createElement(
                                                "tr",
                                                null,
                                                _react2.default.createElement(
                                                    "td",
                                                    { className: "NeuralNetworkRightCell" },
                                                    "Back Prop Type:"
                                                ),
                                                _react2.default.createElement(
                                                    "td",
                                                    { className: "NeuralNetworkLeftCell" },
                                                    _react2.default.createElement(
                                                        "select",
                                                        { name: "ddlBackPropType", value: this.state.backPropType,
                                                            onChange: function onChange(e) {
                                                                return _this2.tableOnChange(e);
                                                            } },
                                                        _react2.default.createElement(
                                                            "option",
                                                            { value: "sgd" },
                                                            "SGD"
                                                        ),
                                                        _react2.default.createElement(
                                                            "option",
                                                            { value: "rmsprop" },
                                                            "RMSProp"
                                                        ),
                                                        _react2.default.createElement(
                                                            "option",
                                                            { value: "adam" },
                                                            "ADAM"
                                                        ),
                                                        _react2.default.createElement(
                                                            "option",
                                                            { value: "adammatrix" },
                                                            "ADAM Matrix"
                                                        )
                                                    )
                                                )
                                            ),
                                            _react2.default.createElement(
                                                "tr",
                                                null,
                                                _react2.default.createElement(
                                                    "td",
                                                    { className: "NeuralNetworkRightCell" },
                                                    "Include Bias:"
                                                ),
                                                _react2.default.createElement(
                                                    "td",
                                                    { className: "NeuralNetworkLeftCell" },
                                                    _react2.default.createElement(
                                                        "select",
                                                        { name: "ddlIncludeBias", value: this.state.includeBias.toString(),
                                                            onChange: function onChange(e) {
                                                                return _this2.tableOnChange(e);
                                                            } },
                                                        _react2.default.createElement(
                                                            "option",
                                                            { value: "true" },
                                                            "true"
                                                        ),
                                                        _react2.default.createElement(
                                                            "option",
                                                            { value: "false" },
                                                            "false"
                                                        )
                                                    )
                                                )
                                            ),
                                            _react2.default.createElement(
                                                "tr",
                                                null,
                                                _react2.default.createElement(
                                                    "td",
                                                    { className: "NeuralNetworkRightCell" },
                                                    "Max Epochs:"
                                                ),
                                                _react2.default.createElement(
                                                    "td",
                                                    { className: "NeuralNetworkLeftCell" },
                                                    _react2.default.createElement("input", { type: "text", name: "txtMaxEpochs", defaultValue: this.state.maxEpochs })
                                                )
                                            ),
                                            _react2.default.createElement(
                                                "tr",
                                                null,
                                                _react2.default.createElement(
                                                    "td",
                                                    { className: "NeuralNetworkRightCell" },
                                                    "Min Weight Delta:"
                                                ),
                                                _react2.default.createElement(
                                                    "td",
                                                    { className: "NeuralNetworkLeftCell" },
                                                    _react2.default.createElement("input", { type: "text", name: "txtMinWeightDelta",
                                                        defaultValue: this.state.minWeightDelta })
                                                )
                                            ),
                                            _react2.default.createElement(
                                                "tr",
                                                null,
                                                _react2.default.createElement(
                                                    "td",
                                                    { className: "NeuralNetworkRightCell" },
                                                    "Mini Batch Size:"
                                                ),
                                                _react2.default.createElement(
                                                    "td",
                                                    { className: "NeuralNetworkLeftCell" },
                                                    _react2.default.createElement("input", { type: "text", name: "txtMiniBatchSize",
                                                        defaultValue: this.state.miniBatchSize })
                                                )
                                            ),
                                            _react2.default.createElement(
                                                "tr",
                                                null,
                                                _react2.default.createElement(
                                                    "td",
                                                    { className: "NeuralNetworkRightCell" },
                                                    "Cache Min. Error Network:"
                                                ),
                                                _react2.default.createElement(
                                                    "td",
                                                    { className: "NeuralNetworkLeftCell" },
                                                    _react2.default.createElement("input", { type: "text", name: "txtCacheMinErrorNetwork",
                                                        defaultValue: this.state.cacheMinErrorNetwork })
                                                )
                                            ),
                                            _react2.default.createElement(
                                                "tr",
                                                null,
                                                _react2.default.createElement(
                                                    "td",
                                                    { className: "NeuralNetworkRightCell" },
                                                    "Learning Rate:"
                                                ),
                                                _react2.default.createElement(
                                                    "td",
                                                    { className: "NeuralNetworkLeftCell" },
                                                    _react2.default.createElement("input", { type: "text", name: "txtLearningRate",
                                                        defaultValue: this.state.learningRate })
                                                )
                                            ),
                                            _react2.default.createElement(
                                                "tr",
                                                null,
                                                _react2.default.createElement(
                                                    "td",
                                                    { className: "NeuralNetworkRightCell" },
                                                    "Normalize:"
                                                ),
                                                _react2.default.createElement(
                                                    "td",
                                                    { className: "NeuralNetworkLeftCell" },
                                                    _react2.default.createElement("input", { type: "text", name: "txtNormalize", defaultValue: this.state.normalize })
                                                )
                                            ),
                                            _react2.default.createElement(
                                                "tr",
                                                null,
                                                _react2.default.createElement(
                                                    "td",
                                                    { className: "NeuralNetworkRightCell" },
                                                    "Training Set Size:"
                                                ),
                                                _react2.default.createElement(
                                                    "td",
                                                    { className: "NeuralNetworkLeftCell" },
                                                    _react2.default.createElement("input", { type: "text", name: "txtTrainingSetSize",
                                                        defaultValue: this.state.trainingSetSize })
                                                )
                                            ),
                                            _react2.default.createElement(
                                                "tr",
                                                null,
                                                _react2.default.createElement(
                                                    "td",
                                                    { className: "NeuralNetworkRightCell" },
                                                    "Hidden Layers:"
                                                ),
                                                _react2.default.createElement(
                                                    "td",
                                                    { className: "NeuralNetworkLeftCell" },
                                                    _react2.default.createElement("input", { type: "text", name: "txtHiddenLayers",
                                                        defaultValue: this.state.hiddenLayers })
                                                )
                                            ),
                                            _react2.default.createElement(
                                                "tr",
                                                null,
                                                _react2.default.createElement(
                                                    "td",
                                                    { className: "NeuralNetworkRightCell" },
                                                    "Show Detail:"
                                                ),
                                                _react2.default.createElement(
                                                    "td",
                                                    { className: "NeuralNetworkLeftCell" },
                                                    _react2.default.createElement(
                                                        "select",
                                                        { name: "ddlShowDetail", value: this.state.showDetail.toString(),
                                                            onChange: function onChange(e) {
                                                                return _this2.tableOnChange(e);
                                                            } },
                                                        _react2.default.createElement(
                                                            "option",
                                                            { value: "true" },
                                                            "true"
                                                        ),
                                                        _react2.default.createElement(
                                                            "option",
                                                            { value: "false" },
                                                            "false"
                                                        )
                                                    )
                                                )
                                            ),
                                            _react2.default.createElement(
                                                "tr",
                                                null,
                                                _react2.default.createElement(
                                                    "td",
                                                    { className: "NeuralNetworkRightCell" },
                                                    "Show Visualizer:"
                                                ),
                                                _react2.default.createElement(
                                                    "td",
                                                    { className: "NeuralNetworkLeftCell" },
                                                    _react2.default.createElement(
                                                        "select",
                                                        { name: "ddlShowVisualizer", value: this.state.showVisualizer.toString(),
                                                            onChange: function onChange(e) {
                                                                return _this2.tableOnChange(e);
                                                            } },
                                                        _react2.default.createElement(
                                                            "option",
                                                            { value: "true" },
                                                            "true"
                                                        ),
                                                        _react2.default.createElement(
                                                            "option",
                                                            { value: "false" },
                                                            "false"
                                                        )
                                                    )
                                                )
                                            ),
                                            _react2.default.createElement(
                                                "tr",
                                                null,
                                                _react2.default.createElement("td", { className: "NeuralNetworkRightCell" }),
                                                _react2.default.createElement(
                                                    "td",
                                                    { className: "NeuralNetworkLeftCell" },
                                                    _react2.default.createElement(
                                                        "button",
                                                        { name: "btnTrain", style: { width: "100%" }, onClick: function onClick(e) {
                                                                return _this2.btnClick(e);
                                                            } },
                                                        "Train"
                                                    )
                                                )
                                            ),
                                            _react2.default.createElement(
                                                "tr",
                                                null,
                                                _react2.default.createElement("td", { className: "NeuralNetworkRightCell" }),
                                                _react2.default.createElement(
                                                    "td",
                                                    { className: "NeuralNetworkLeftCell" },
                                                    _react2.default.createElement(
                                                        "button",
                                                        { name: "btnStop", style: { width: "100%" }, onClick: function onClick(e) {
                                                                return _this2.btnClick(e);
                                                            } },
                                                        "Stop"
                                                    )
                                                )
                                            )
                                        )
                                    )
                                )
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    "div",
                    null,
                    _react2.default.createElement(
                        "div",
                        null,
                        "Epochs: ",
                        this.state.epochs
                    ),
                    _react2.default.createElement(
                        "div",
                        null,
                        "Error: ",
                        this.state.error
                    ),
                    _react2.default.createElement(
                        "div",
                        null,
                        _react2.default.createElement(
                            "table",
                            null,
                            _react2.default.createElement(
                                "tbody",
                                null,
                                _react2.default.createElement(
                                    "tr",
                                    null,
                                    _react2.default.createElement(
                                        "td",
                                        { style: { verticalAlign: "top" } },
                                        this.getDetailDiv("Out of Range", this.state.dataOutOfRange),
                                        _react2.default.createElement(
                                            "div",
                                            null,
                                            this.getDataAsTable(this.state.dataOutOfRange, "outOfRange")
                                        )
                                    ),
                                    _react2.default.createElement(
                                        "td",
                                        { style: { verticalAlign: "top" } },
                                        this.getDetailDiv("In Range", this.state.dataInRange),
                                        _react2.default.createElement(
                                            "div",
                                            null,
                                            this.getDataAsTable(this.state.dataInRange, "inRange")
                                        )
                                    )
                                )
                            )
                        )
                    ),
                    _react2.default.createElement(
                        "div",
                        null,
                        this.getVisualizer()
                    )
                )
            );
        }

        /**
         * Life Cycle Step 4
         */

    }, {
        key: "componentDidMount",
        value: function componentDidMount() {}
    }], [{
        key: "distance",
        value: function distance(predicted, expected) {
            if (predicted.length === 2) {
                return Math.sqrt(Math.pow(predicted[0] - expected[0], 2.0) + Math.pow(predicted[1] - expected[1], 2.0));
            }

            return Math.sqrt(Math.pow(predicted[0] - expected[0], 2));
        }
    }, {
        key: "getRandomPoint",
        value: function getRandomPoint(minX, maxX, minY, maxY) {
            var toRet = [_MathUtil2.default.getRandomArbitrary(minX, maxX), _MathUtil2.default.getRandomArbitrary(minY, maxY)];

            toRet.push(Math.pow(toRet[0], 2));
            toRet.push(Math.pow(toRet[1], 2));
            toRet.push(_MathUtil2.default.distance([toRet[0], toRet[1]], [0, 0]));

            return toRet;
        }
    }, {
        key: "isPredictionGreen",
        value: function isPredictionGreen(prediction) {
            var maxIndex = _MathUtil2.default.argMax(prediction);

            switch (maxIndex) {
                case 0:
                    return true;
                default:
                    return false;
            }
        }
    }]);

    return NeuralNetworkTest;
}(_react.Component);

exports.default = NeuralNetworkTest;