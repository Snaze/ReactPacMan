'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

require('./index.css');

var _App = require('./App');

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_reactDom2.default.render(_react2.default.createElement(_App2.default, null), document.getElementById('root'));

// import NeuralNetworkTest from "./tests/NeuralNetworkTest";
// ReactDOM.render(
//     <NeuralNetworkTest />,
//     document.getElementById("root")
// );

// import NeuralNetwork from "./ai/ann/NeuralNetwork";
// import {default as NeuralNetworkModel} from "./model/ai/ann/NeuralNetwork";
// import NeuralNetworkDS from "./model/NeuralNetworkDS";
// let nn = new NeuralNetworkModel([8, 8, 3], true);
// let nnDS = new NeuralNetworkDS(nn);
// ReactDOM.render(
//     <NeuralNetwork dataSource={nnDS} height={512} width={512} />,
//     document.getElementById("root")
// );

// import NeuralNetworkVisualizerTest from "./tests/NeuralNetworkVisualizerTest";
//
// ReactDOM.render(
//     <NeuralNetworkVisualizerTest />,
//     document.getElementById("root")
// );

// import CellTest from "./tests/CellTest";
// ReactDOM.render(
//   <CellTest />,
//   document.getElementById('root')
// );

// import LevelTest from "./tests/LevelTest";
// ReactDOM.render(
//     <LevelTest />,
//     document.getElementById('root')
// );

// import EntityAnimationTest from "./tests/EntityAnimationTest";
// ReactDOM.render(
//   <EntityAnimationTest />,
//   document.getElementById('root')
// );

// import Modal from "./Modal";
// ReactDOM.render(
//   <Modal />,
//   document.getElementById('root')
// );

// import ModalTest from "./tests/ModalTest";
// ReactDOM.render(
//     <ModalTest />,
//     document.getElementById('root')
// );


// import MainMenu from "./menus/MainMenu";
// import {default as MainMenuModel} from "./model/menus/MainMenu";
//
// function onSelectionCallback(e) {
//     alert("Selected Player " + e.selectedValue);
// }
//
// let mmm = new MainMenuModel();
//
// ReactDOM.render(
//     <MainMenu onSelectionCallback={onSelectionCallback} dataSource={mmm} />,
//     document.getElementById('root')
// );

// import CountDownMenuModelTest from "./tests/CountDownMenuTest";
// ReactDOM.render(
//     <CountDownMenuModelTest />,
//     document.getElementById('root')
// );