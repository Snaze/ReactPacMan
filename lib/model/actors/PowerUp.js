"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ActorBase2 = require("./ActorBase");

var _ActorBase3 = _interopRequireDefault(_ActorBase2);

var _Points = require("../Points");

var _Points2 = _interopRequireDefault(_Points);

var _Direction = require("../../utils/Direction");

var _Direction2 = _interopRequireDefault(_Direction);

var _moment = require("../../../node_modules/moment/moment");

var _moment2 = _interopRequireDefault(_moment);

var _SoundPlayer = require("../../utils/SoundPlayer");

var _SoundPlayer2 = _interopRequireDefault(_SoundPlayer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var cherry = 100;
var strawberry = 200;
var orange = 500;
var pretzel = 700;
var apple = 1000;
var pear = 2000;
var banana = 5000;
var validPowerUps = [cherry, strawberry, orange, pretzel, apple, pear, banana];

var powerUpNameMap = {
    "cherry": cherry,
    "strawberry": strawberry,
    "orange": orange,
    "pretzel": pretzel,
    "apple": apple,
    "pear": pear,
    "banana": banana
};

var life_duration = 30; // seconds
var blink_time = 20;

var PowerUp = function (_ActorBase) {
    _inherits(PowerUp, _ActorBase);

    _createClass(PowerUp, null, [{
        key: "POWER_UP_CHERRY",
        get: function get() {
            return cherry;
        }
    }, {
        key: "POWER_UP_STRAWBERRY",
        get: function get() {
            return strawberry;
        }
    }, {
        key: "POWER_UP_ORANGE",
        get: function get() {
            return orange;
        }
    }, {
        key: "POWER_UP_PRETZEL",
        get: function get() {
            return pretzel;
        }
    }, {
        key: "POWER_UP_APPLE",
        get: function get() {
            return apple;
        }
    }, {
        key: "POWER_UP_PEAR",
        get: function get() {
            return pear;
        }
    }, {
        key: "POWER_UP_BANANA",
        get: function get() {
            return banana;
        }
    }]);

    function PowerUp(level, powerUpType) {
        _classCallCheck(this, PowerUp);

        var _this = _possibleConstructorReturn(this, (PowerUp.__proto__ || Object.getPrototypeOf(PowerUp)).call(this, level));

        if (validPowerUps.indexOf(powerUpType) < 0) {
            throw new Error("Invalid Power up");
        }

        _this._powerUpType = powerUpType;
        _this._spawnLocation = _this.location.clone();
        _this._prevLocation = _this.location.clone();
        _this._destinationLocation = _this.location.clone();
        _this._points = _this._wireUp("_points", new _Points2.default(_Points2.default.POINTS_TYPE_POWER_UP));
        _this._points.amount = powerUpType;
        _this._cellTransitionDuration = 0.6;
        _this._isAlive = false;
        _this._blink = false;

        _this._lifeExpirationTime = null;
        _this._blinkTime = null;
        return _this;
    }

    _createClass(PowerUp, [{
        key: "resetLocations",
        value: function resetLocations() {
            this.location.set(-1, -1);
            this._spawnLocation.set(-1, -1);
            this._prevLocation.set(-1, -1);
            this._destinationLocation.set(-1, -1);
        }
    }, {
        key: "_getRandomLocation",
        value: function _getRandomLocation() {
            var toRet = this.location;

            while (toRet.equals(this.location)) {
                toRet = this.level.getRandomActiveCellLocation();
            }

            return toRet;
        }
    }, {
        key: "getNextDirection",
        value: function getNextDirection() {

            if (!this.location.isValid) {
                return _Direction2.default.NONE;
            }

            if (!this._destinationLocation.isValid) {
                this._destinationLocation = this.location.clone();
            }

            if (this._destinationLocation.equals(this.location) || this.prevLocation.equals(this.location)) {
                // THIS CHECK HERE IS SO THEY DONT GET STUCK ON PARTIAL BORDER
                this._destinationLocation = this._getRandomLocation();
            }

            var fromCellId = this.location.toCellId();
            var toCellId = this._destinationLocation.toCellId();

            return this.level.floydWarshall.getDirection(fromCellId, toCellId);
        }
    }, {
        key: "executeActorStep",
        value: function executeActorStep(e) {
            var toRet = _get(PowerUp.prototype.__proto__ || Object.getPrototypeOf(PowerUp.prototype), "executeActorStep", this).call(this, e);

            this.points.timerTick(e);

            return toRet;
        }
    }, {
        key: "timerTick",
        value: function timerTick(e) {
            var theDirection = this.getNextDirection();

            this._prevLocation.setWithLocation(this.location);
            this.moveInDirection(theDirection);

            if (this.isAlive) {
                var now = (0, _moment2.default)();

                if (this._lifeExpirationTime <= now) {
                    this.isAlive = false;
                    this.moveBackToSpawn();
                    this.blink = false;
                } else if (now > this._blinkTime) {
                    this.blink = true;
                } else {
                    this.blink = false;
                }
            }
        }
    }, {
        key: "setPowerUpTypeByName",
        value: function setPowerUpTypeByName(name) {
            this.powerUpType = powerUpNameMap[name.toLowerCase()];
        }
    }, {
        key: "spawn",
        value: function spawn() {
            var powerUps = this.level.powerUps;
            var powerUpIndex = Math.floor(Math.random() * powerUps.length);
            var randomPowerUp = this.level.powerUps[powerUpIndex];

            this.setPowerUpTypeByName(randomPowerUp);
            this.isAlive = true;
            this.location.setWithLocation(this.level.getRandomPowerUpSpawnLocation());
            var now = (0, _moment2.default)();
            this._blinkTime = now.clone().add(blink_time, "s");
            this._lifeExpirationTime = now.clone().add(life_duration, "s");
        }
    }, {
        key: "pickUp",
        value: function pickUp(thePlayer) {
            this.points.show(this.location);
            thePlayer.score += this.powerUpValue;
            _SoundPlayer2.default.instance.play(_SoundPlayer2.default.instance.eatfruit);
            this.isAlive = false;
            this.moveBackToSpawn();
        }
    }, {
        key: "toFeatureVector",


        /**
         * This will return the feature vector that can be used to train machine learning algorithms
         *
         * @returns {Array}
         */
        value: function toFeatureVector() {

            var lifeExpirationTime = 0;
            if (!!this._lifeExpirationTime && this._lifeExpirationTime > (0, _moment2.default)()) {
                lifeExpirationTime = this._lifeExpirationTime.clone().diff((0, _moment2.default)(), "ms");
            }
            var blinkTime = 0;
            if (!!this._blinkTime && this._blinkTime > (0, _moment2.default)()) {
                blinkTime = this._blinkTime.clone().diff((0, _moment2.default)(), "ms");
            }

            var toRet = [];
            var delta = this.location.getDelta(this.prevLocation);

            toRet.push(this.location.x); // location                 0
            toRet.push(this.location.y); // location                 1
            toRet.push(delta.x); //                          2
            toRet.push(delta.y); //                          3
            toRet.push(this.isAlive ? 1 : 0); // isAlive                  4
            toRet.push(this.prevLocation.x); // prevLocation             5
            toRet.push(this.prevLocation.y); // prevLocation             6
            toRet.push(_Direction2.default.directionToDecimal(this.direction)); // direction      7
            toRet.push(this._destinationLocation.x); // destination location x   8
            toRet.push(this._destinationLocation.y); // destination location x   9
            toRet.push(this._blink ? 1 : 0); // blink                    10
            toRet.push(this._powerUpType); // powerUpType              11
            toRet.push(lifeExpirationTime); // life expiration time     12
            toRet.push(blinkTime); // blink time               13

            return toRet;
        }

        /**
         * This will change the state of the PowerUp back to the state represented by the feature vector
         *
         * @param featureVector {Array} The state you wish to go back to
         */

    }, {
        key: "setFeatureVector",
        value: function setFeatureVector(featureVector) {
            var locationX = featureVector[0],
                locationY = featureVector[1];
            this.location.set(locationX, locationY);
            this.isAlive = featureVector[4] === 1;
            var prevLocation = this.location.clone();
            prevLocation.set(featureVector[5], featureVector[6]);
            this._prevLocation = prevLocation;
            this._direction = _Direction2.default.decimalToDirection(featureVector[7]);
            var destinationLocation = this.location.clone();
            destinationLocation.set(featureVector[8], featureVector[9]);
            this._destinationLocation = destinationLocation;
            this._blink = featureVector[10] === 1;
            this._powerUpType = featureVector[11];
            this._lifeExpirationTime = (0, _moment2.default)().add(featureVector[12]);
            this._blinkTime = (0, _moment2.default)().add(featureVector[13]);
        }
    }, {
        key: "prevLocation",
        get: function get() {
            return this._prevLocation;
        }
    }, {
        key: "points",
        get: function get() {
            return this._points;
        }
    }, {
        key: "powerUpType",
        get: function get() {
            return this._powerUpType;
        },
        set: function set(value) {
            if (validPowerUps.indexOf(value) < 0) {
                throw new Error("Invalid Power up");
            }

            this.points.amount = value;

            this._setValueAndRaiseOnChange("_powerUpType", value);
        }
    }, {
        key: "powerUpValue",
        get: function get() {
            return this.powerUpType;
        }
    }, {
        key: "blink",
        get: function get() {
            return this._blink;
        },
        set: function set(value) {
            this._setValueAndRaiseOnChange("_blink", value);
        }
    }], [{
        key: "trainingFeatureIndices",
        get: function get() {
            if (PowerUp._trainingFeatureIndices === null) {
                PowerUp._trainingFeatureIndices = [2, // delta x
                3, // delta y
                4, // isAlive
                11, // powerUpType
                10 // blink
                ];
            }

            return PowerUp._trainingFeatureIndices;
        }
    }, {
        key: "featureVectorLength",
        get: function get() {
            return 14;
        }
    }]);

    return PowerUp;
}(_ActorBase3.default);

PowerUp._trainingFeatureIndices = null;
exports.default = PowerUp;