import React, {Component} from 'react';
import {ScatterChart, Scatter, XAxis, YAxis, CartesianGrid } from "../../node_modules/recharts/umd/Recharts";
import NeuralNetwork from "../model/ai/ann/NeuralNetwork";
import MathUtil from "../model/ai/MathUtil";
import "./NeuralNetworkTest.css";
import ActivationFunctions from "../model/ai/ann/ActivationFunctions";
import ArrayUtils from "../utils/ArrayUtils";
// import {assert} from "../utils/Assert";

class NeuralNetworkTest extends Component {

    /**
     * Life Cycle Step 1
     * @param props
     */
    constructor(props) {
        super(props);

        this._numOutputs = 2;
        this._numInputs = 2;

        // this._neuralNetwork.setWeights([[[-45.42877134937925,0.06307931678138425,86.16102782528077],[1.0979752237380247,43.93067987200524,-86.27794022812651]],[[10.168778876191363,-9.997238479805933,0.552376336368361],[19.20396670170233,-13.954600932323425,12.059486933582416],[11.620645753000291,-11.462057255950354,0.6045539499607651]],[[-3.302596057655691,-5.123564179398088,-3.7756837144896305,4.960726472470421],[3.219538642433655,5.088310440177473,3.899255941522516,-4.940265049557309]]]);

        this.state = {
            epochs: 0,
            error: 1000000,
            dataOutOfRange: [],
            dataInRange: [],
            // weights: JSON.stringify(this._neuralNetwork.getWeights())
            weights: "",
            maxEpochs: 100,
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
            testType: "xor"
        };

        this._testData = {};
    }

    static distance(predicted, expected) {
        if (predicted.length === 2) {
            return Math.sqrt(Math.pow((predicted[0] - expected[0]), 2.0) + Math.pow((predicted[1] - expected[1]), 2.0));
        }

        return Math.sqrt(Math.pow((predicted[0] - expected[0]), 2));
    }

    static getRandomPoint(minX, maxX, minY, maxY) {
        let toRet = [
            MathUtil.getRandomArbitrary(minX, maxX),
            MathUtil.getRandomArbitrary(minY, maxY)
        ];

        if (toRet.length !== 2) {
            throw new Error("WTF");
        }

        return toRet;
    }

    isGreen(point) {
        if (this.state.testType === "xor") {

            return ((point[0] >= 0 && point[1] >= 0) || (point[0] < 0 && point[1] < 0));

        } else if (this.state.testType === "circle") {

            let distance = MathUtil.distance(point, [0, 0]);
            return (distance < 5.0 && distance >= 0);

        }

        return false;
    }

    getExpectedValue(point) {

        let falseValue = null;

        if (this.state.activationFunction === "sigmoid") {
            falseValue = 0.0;
        } else if (this.state.activationFunction === "tanh") {
            falseValue = -1.0;
        } else {
            throw new Error("Unknown activation function");
        }

        let toRet = [falseValue, falseValue];
        // let distance = MathUtil.distance(point, [0, 0]);

        // This is kind of lame but its easy to read
        if (this.isGreen(point)) {
            toRet[0] = 1.0;
        } else {
            toRet[1] = 1.0;
        }
        // } else if (distance < 4.0 && distance >= 2.0) {
        //     toRet[1] = 1.0;
        // } else if (distance < 6.0 && distance >= 4.0) {
        //     toRet[2] = 1.0;
        // } else if (distance < 8.0 && distance >= 6.0) {
        //     toRet[3] = 1.0;
        // } else if (distance < 10.0 && distance >= 8.0) {
        //     toRet[4] = 1.0;
        // } else {
        //     toRet[5] = 1.0;
        // }

        return toRet;
    }

    static isPredictionGreen(prediction) {
        let maxIndex = MathUtil.argMax(prediction);

        switch (maxIndex) {
            case 0:
            // case 2:
            // case 4:
                return true;
            default:
                return false;
        }
    }

    /**
     * Life Cycle Step 2
     */
    componentWillMount() {
        // this.trainAndTest();
    }

    trainAndTest() {
        let error = this.trainNetwork();

        this.testData(error);
    }

    trainNetwork() {
        let error = Number.POSITIVE_INFINITY;
        let inputs = [];
        let expected = [];
        let greenCount = 0;
        let redCount = 0;
        let trainDataInRange = [];
        let trainDataOutOfRange = [];

        for (let i = 0; i < this.state.trainingSetSize; i++) {
            let randomPoint1 = NeuralNetworkTest.getRandomPoint(-10, 10, -10, 10);

            // this is so lame
            if (i % 2 === 0) {
                while (!this.isGreen(randomPoint1)) {
                    randomPoint1 = NeuralNetworkTest.getRandomPoint(-10, 10, -10, 10);
                }

                trainDataInRange.push({
                    x: randomPoint1[0],
                    y: randomPoint1[1]
                });
            } else {
                while (this.isGreen(randomPoint1)) {
                    randomPoint1 = NeuralNetworkTest.getRandomPoint(-10, 10, -10, 10);
                }

                trainDataOutOfRange.push({
                    x: randomPoint1[0],
                    y: randomPoint1[1]
                });
            }

            inputs.push(randomPoint1);
            let expectedValue = this.getExpectedValue(randomPoint1);
            expected.push(expectedValue);

            if (this.isGreen(randomPoint1)) {
                greenCount++;
            } else {
                redCount++;
            }
        }

        alert (`redCount = ${redCount}, greenCount = ${greenCount}`);

        let range = ArrayUtils.range(inputs.length);
        let numToTake = Math.floor(inputs.length * 0.8);
        let trainRangeIndices = ArrayUtils.take(range, numToTake, 0);
        let testRangeIndices = ArrayUtils.take(range, 1000000, numToTake);

        this._testData["inputs"] = ArrayUtils.select(inputs, testRangeIndices);
        this._testData["expected"] = ArrayUtils.select(expected, testRangeIndices);

        inputs = ArrayUtils.select(inputs, trainRangeIndices);
        expected = ArrayUtils.select(expected, trainRangeIndices);

        // alert (`maxEpochs = ${this.state.maxEpochs}`);

        this._neuralNetwork.train(inputs, expected,
            this.state.miniBatchSize, this.state.normalize,
            this.state.maxEpochs, null, this.state.minWeightDelta, this.state.cacheMinErrorNetwork);

        let theWeights = this._neuralNetwork.getWeights();

        this.setState({
            weights: JSON.stringify(theWeights),
            trainDataInRange: trainDataInRange,
            trainDataOutOfRange: trainDataOutOfRange
        });

        return error;
    }

    testData(error) {
        let dataOutOfRange = [];
        let dataInRange = [];

        for (let i = 0; i < this._testData.inputs.length; i++) {

            let randomPoint = this._testData.inputs[i];
            // console.log(`randomPoint = ${randomPoint}`);
            let normalizedPoint = [randomPoint];
            if (this.state.normalize) {
                normalizedPoint = this._neuralNetwork.normalize([randomPoint]);
            }
            // console.log(`normalizedPoint = ${normalizedPoint}`);
            let prediction = this._neuralNetwork.feedForward(normalizedPoint);
            let theDataSet = null;

            if (NeuralNetworkTest.isPredictionGreen(prediction[0])) {
                theDataSet = dataInRange;
            } else {
                theDataSet = dataOutOfRange;
            }

            theDataSet.push({
                x: randomPoint[0],
                y: randomPoint[1],
                prediction: prediction
            });
        }

        this.setState({
            epochs: this._neuralNetwork.epochs,
            error: error,
            dataOutOfRange: dataOutOfRange,
            dataInRange: dataInRange
        });
    }

    getNumCorrect(data, inRange=true) {
        let numCorrect = 0;

        data.forEach(function (point) {
            let tempPoint = [point.x, point.y];

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

    getStyle(point, inRange=true) {
        let tempPoint = [point.x, point.y];

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

    getData(theRange, keyName) {
        let toRet = [];
        let index = 0;
        let inRange = keyName.toLowerCase() === "inrange";

        theRange.forEach(function (point) {
            toRet.push(<tr key={keyName + index.toString()} style={this.getStyle(point, inRange)}>
                <td style={{textAlign: "left", border: "solid 1px black"}}>
                    {point.x}
                </td>
                <td style={{textAlign: "left", border: "solid 1px black"}}>
                    {point.y}
                </td>
                <td style={{textAlign: "left", border: "solid 1px black"}}>
                    {point.prediction[0][0].toFixed(4)}, {point.prediction[0][1].toFixed(4)}
                </td>
            </tr>);

            index++;
        }.bind(this));

        return toRet;
    }

    getDataAsTable(theRange, keyName) {
        return (<table cellSpacing={0} style={{border: "solid 1px black"}}>
            <thead>
                <tr>
                    <th>
                        x
                    </th>
                    <th>
                        y
                    </th>
                    <th>
                        prediction
                    </th>
                </tr>
            </thead>
            <tbody>
            {this.getData(theRange, keyName)}
            </tbody>
        </table>);
    }

    getDetailDiv(title, theRange) {
        let inRange = theRange === this.state.dataInRange;
        let numCorrect = this.getNumCorrect(theRange, inRange);
        let length = theRange.length;
        let percentCorrect = (numCorrect / length) * 100;

        return (<div>
            {title}:&nbsp;{numCorrect}&nbsp;/&nbsp;{length}&nbsp;=&nbsp;{percentCorrect}&nbsp;%
        </div>);
    }

    tableOnChange(e) {

        switch (e.target.name) {
            case "txtMaxEpochs":
                let maxEpochs = null;
                if (e.target.value !== "null") {
                    try {
                        maxEpochs = parseInt(e.target.value, 10);
                    } catch (e) {

                    }
                }
                this.setState({
                    maxEpochs: maxEpochs
                });
                break;
            case "txtMinWeightDelta":
                let minWeightDelta = null;
                if (e.target.value !== "null") {
                    try {
                        minWeightDelta = parseInt(e.target.value, 10);
                    } catch (e) {

                    }
                }
                this.setState({
                    minWeightDelta: minWeightDelta
                });
                break;
            case "txtMiniBatchSize":
                let miniBatchSize = null;
                if (e.target.value !== "null") {
                    try {
                        miniBatchSize = parseInt(e.target.value, 10);
                    } catch (e) {

                    }
                }
                this.setState({
                    miniBatchSize: miniBatchSize
                });
                break;
            case "txtCacheMinErrorNetwork":
                let cacheMinErrorNetwork = e.target.value === "true";
                this.setState({
                    cacheMinErrorNetwork: cacheMinErrorNetwork
                });
                break;
            case "txtLearningRate":
                let learningRate = parseInt(e.target.value, 10);
                this.setState({
                    learningRate: learningRate
                });
                break;
            case "txtNormalize":
                let normalize = e.target.value === "true";
                this.setState({
                    normalize: normalize
                });
                break;
            case "txtTrainingSetSize":
                let trainingSetSize = 2000;
                try {
                    trainingSetSize = parseInt(e.target.value, 10);
                } catch (e) {

                }
                this.setState({
                    trainingSetSize: trainingSetSize
                });
                break;
            case "txtHiddenLayers":
                let hiddenLayers = e.target.value;

                this.setState({
                    hiddenLayers: hiddenLayers
                });
                break;
            case "ddlActivationFunction":
                let activationFunction = e.target.value;

                this.setState({
                    activationFunction: activationFunction
                });
                break;
            default:
                break;
        }

    }

    createLayersArray() {
        let toRet = [this._numInputs];

        if (this.state.hiddenLayers !== "") {
            let innerArray = this.state.hiddenLayers.split(/,\s/);

            ArrayUtils.extend(toRet, innerArray, function (item) { return parseInt(item, 10); });
        }
        ArrayUtils.extend(toRet, [this._numOutputs]);

        return toRet;
    }

    btnClick(e) {
        let layersArray = this.createLayersArray();

        this._neuralNetwork = new NeuralNetwork(layersArray,
            true,
            ActivationFunctions[this.state.activationFunction],
            this.state.learningRate);

        this.trainAndTest();
        // this.forceUpdate();
    }

    /**
     * Life Cycle Step 3
     * @returns {XML}
     */
    render() {
        return (<div className="NeuralNetworkTest">
            <h4 style={{textAlign: "center"}}>
                You should be looking at a bull's eye.
            </h4>
            <div className="NeuralNetworkTestChart">
                <table>
                    <tbody>
                        <tr>
                            <td style={{verticalAlign: "top"}}>
                                <table style={{textAlign: "center"}}>
                                    <tbody>
                                        <tr>
                                            <td>
                                                Train Data:
                                            </td>
                                            <td>
                                                Predictions:
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <ScatterChart width={400} height={400} margin={{top: 0, right: 25, left: 25, bottom: 25}} >
                                                    <XAxis dataKey={'x'} allowDecimals={false} type="number" />
                                                    <YAxis dataKey={'y'} allowDecimals={false} />
                                                    <Scatter name='Out of Range' data={this.state.trainDataOutOfRange} fill='red' />
                                                    <Scatter name='In Range' data={this.state.trainDataInRange} fill='green' />
                                                    <CartesianGrid />
                                                </ScatterChart>
                                            </td>
                                            <td>
                                                <ScatterChart width={400} height={400} margin={{top: 0, right: 25, left: 25, bottom: 25}} >
                                                    <XAxis dataKey={'x'} allowDecimals={false} type="number" />
                                                    <YAxis dataKey={'y'} allowDecimals={false} />
                                                    <Scatter name='Out of Range' data={this.state.dataOutOfRange} fill='red' />
                                                    <Scatter name='In Range' data={this.state.dataInRange} fill='green' />
                                                    <CartesianGrid />
                                                </ScatterChart>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td style={{verticalAlign: "top", display: "none"}}>
                                <textarea cols={30} rows={25} defaultValue={this.state.weights} />
                            </td>
                            <td style={{verticalAlign: "top"}}>
                                <table onChange={(e) => this.tableOnChange(e)}>
                                    <tbody>
                                        <tr>
                                            <td className="NeuralNetworkRightCell">
                                                Activation Function:
                                            </td>
                                            <td className="NeuralNetworkLeftCell">
                                                <select name="ddlActivationFunction" value={this.state.activationFunction}
                                                        onChange={(e) => this.tableOnChange(e)}>
                                                    <option value="tanh">tanh</option>
                                                    <option value="sigmoid">sigmoid</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="NeuralNetworkRightCell">
                                                Max Epochs:
                                            </td>
                                            <td className="NeuralNetworkLeftCell">
                                                <input type="text" name="txtMaxEpochs" defaultValue={this.state.maxEpochs} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="NeuralNetworkRightCell">
                                                Min Weight Delta:
                                            </td>
                                            <td className="NeuralNetworkLeftCell">
                                                <input type="text" name="txtMinWeightDelta" defaultValue={this.state.minWeightDelta} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="NeuralNetworkRightCell">
                                                Mini Batch Size:
                                            </td>
                                            <td className="NeuralNetworkLeftCell">
                                                <input type="text" name="txtMiniBatchSize" defaultValue={this.state.miniBatchSize} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="NeuralNetworkRightCell">
                                                Cache Min. Error Network:
                                            </td>
                                            <td className="NeuralNetworkLeftCell">
                                                <input type="text" name="txtCacheMinErrorNetwork" defaultValue={this.state.cacheMinErrorNetwork} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="NeuralNetworkRightCell">
                                                Learning Rate:
                                            </td>
                                            <td className="NeuralNetworkLeftCell">
                                                <input type="text" name="txtLearningRate" defaultValue={this.state.learningRate} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="NeuralNetworkRightCell">
                                                Normalize:
                                            </td>
                                            <td className="NeuralNetworkLeftCell">
                                                <input type="text" name="txtNormalize" defaultValue={this.state.normalize} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="NeuralNetworkRightCell">
                                                Training Set Size:
                                            </td>
                                            <td className="NeuralNetworkLeftCell">
                                                <input type="text" name="txtTrainingSetSize" defaultValue={this.state.trainingSetSize} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="NeuralNetworkRightCell">
                                                Hidden Layers:
                                            </td>
                                            <td className="NeuralNetworkLeftCell">
                                                <input type="text" name="txtHiddenLayers" defaultValue={this.state.hiddenLayers} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="NeuralNetworkRightCell">
                                            </td>
                                            <td className="NeuralNetworkLeftCell">
                                                <button style={{width: "100%"}} onClick={(e) => this.btnClick(e)}>Train</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div>
                <div>
                    Epochs: {this.state.epochs}
                </div>
                <div>
                    Error: {this.state.error}
                </div>
                <div>
                    <table>
                        <tbody>
                            <tr>
                                <td style={{verticalAlign: "top"}}>
                                    {this.getDetailDiv("Out of Range", this.state.dataOutOfRange)}
                                    <div>
                                        {this.getDataAsTable(this.state.dataOutOfRange, "outOfRange")}
                                    </div>
                                </td>
                                <td style={{verticalAlign: "top"}}>
                                    {this.getDetailDiv("In Range", this.state.dataInRange)}
                                    <div>
                                        {this.getDataAsTable(this.state.dataInRange, "inRange")}
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>);
    }

    /**
     * Life Cycle Step 4
     */
    componentDidMount() {


    }

}

export default NeuralNetworkTest;