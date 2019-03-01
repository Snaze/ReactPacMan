"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

require("./Entity.css");

require("./images/PacManSprites.png");

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _GameTimer = require("./model/GameTimer");

var _GameTimer2 = _interopRequireDefault(_GameTimer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/** DESIGNATORS **/
var mrs_pac_man = "mrs_pac_man";
var pac_man = "pac_man";
var red_ghost = "red_ghost";
var orange_ghost = "orange_ghost";
var pink_ghost = "pink_ghost";
var blue_ghost = "blue_ghost";
var scared_ghost = "scared_ghost";
var dead_ghost = "dead_ghost";
var flash_ghost = "flash_ghost";
var power_up = "power_up";
var act = "act";
var eyes = "eyes";
var heart = "heart";
var tiny_icon = "tiny_icon";
var swan = "swan";
var big_score = "big_score";
var row_score = "row_score";
var none = "none";

/** MODIFIERS **/
var direction_left = "direction_left";
var direction_left_paused = "direction_left_paused";
var direction_up = "direction_up";
var direction_up_paused = "direction_up_paused";
var direction_right = "direction_right";
var direction_right_paused = "direction_right_paused";
var direction_down = "direction_down";
var direction_down_paused = "direction_down_paused";
var dead = "dead";
var dead_paused = "dead_paused";

var power_up_cherry = "power_up_cherry";
var power_up_strawberry = "power_up_strawberry";
var power_up_peach = "power_up_peach";
var power_up_pretzel = "power_up_pretzel";
var power_up_apple = "power_up_apple";
var power_up_pear = "power_up_pear";
var power_up_banana = "power_up_banana";
var power_up_key = "power_up_key";

var tiny_icon_potion = "tiny_icon_potion";
var tiny_icon_life = "tiny_icon_life";

var big_score_200 = "big_score_200";
var big_score_400 = "big_score_400";
var big_score_800 = "big_score_800";
var big_score_1600 = "big_score_1600";

var row_score_100 = "row_score_100";
var row_score_200 = "row_score_200";
var row_score_500 = "row_score_500";
var row_score_700 = "row_score_700";
var row_score_1000 = "row_score_1000";
var row_score_2000 = "row_score_2000";
var row_score_5000 = "row_score_5000";

var no_modifier = "no_modifier";

// TODO: You could have probably done all these animations in CSS
// which would have been cleaner.  I'll plan on doing that in the future.
var frame_mappings = {
    mrs_pac_man: {
        direction_left: ["MrsPacManEntity PacManLeft"],
        direction_left_paused: ["MrsPacManEntity PacManLeftPaused"],
        direction_up: ["MrsPacManEntity PacManUp"],
        direction_up_paused: ["MrsPacManEntity PacManUpPaused"],
        direction_right: ["MrsPacManEntity PacManRight"],
        direction_right_paused: ["MrsPacManEntity PacManRightPaused"],
        direction_down: ["MrsPacManEntity PacManDown"],
        direction_down_paused: ["MrsPacManEntity PacManDownPaused"],
        dead: ["MrsPacManEntity PacManDead"],
        dead_paused: ["MrsPacManEntity PacManDeadPaused"]
    },
    pac_man: {
        direction_left: ["PacManEntity PacManLeft"],
        direction_left_paused: ["PacManEntity PacManLeftPaused"],
        direction_up: ["PacManEntity PacManUp"],
        direction_up_paused: ["PacManEntity PacManUpPaused"],
        direction_right: ["PacManEntity PacManRight"],
        direction_right_paused: ["PacManEntity PacManRightPaused"],
        direction_down: ["PacManEntity PacManDown"],
        direction_down_paused: ["PacManEntity PacManDownPaused"],
        dead: ["PacManEntity PacManDead"],
        dead_paused: ["PacManEntity PacManDeadPaused"]
    },
    red_ghost: {
        direction_left: ["Entity RowEntity GhostRedLeft1", "Entity RowEntity GhostRedLeft2"],
        direction_up: ["Entity RowEntity GhostRedUp1", "Entity RowEntity GhostRedUp2"],
        direction_right: ["Entity RowEntity GhostRedRight1", "Entity RowEntity GhostRedRight2"],
        direction_down: ["Entity RowEntity GhostRedDown1", "Entity RowEntity GhostRedDown2"]
    },
    orange_ghost: {
        direction_left: ["Entity RowEntity GhostOrangeLeft1", "Entity RowEntity GhostOrangeLeft2"],
        direction_up: ["Entity RowEntity GhostOrangeUp1", "Entity RowEntity GhostOrangeUp2"],
        direction_right: ["Entity RowEntity GhostOrangeRight1", "Entity RowEntity GhostOrangeRight2"],
        direction_down: ["Entity RowEntity GhostOrangeDown1", "Entity RowEntity GhostOrangeDown2"]
    },
    pink_ghost: {
        direction_left: ["Entity RowEntity GhostPinkLeft1", "Entity RowEntity GhostPinkLeft2"],
        direction_up: ["Entity RowEntity GhostPinkUp1", "Entity RowEntity GhostPinkUp2"],
        direction_right: ["Entity RowEntity GhostPinkRight1", "Entity RowEntity GhostPinkRight2"],
        direction_down: ["Entity RowEntity GhostPinkDown1", "Entity RowEntity GhostPinkDown2"]
    },
    blue_ghost: {
        direction_left: ["Entity RowEntity GhostBlueLeft1", "Entity RowEntity GhostBlueLeft2"],
        direction_up: ["Entity RowEntity GhostBlueUp1", "Entity RowEntity GhostBlueUp2"],
        direction_right: ["Entity RowEntity GhostBlueRight1", "Entity RowEntity GhostBlueRight2"],
        direction_down: ["Entity RowEntity GhostBlueDown1", "Entity RowEntity GhostBlueDown2"]
    },
    scared_ghost: {
        direction_left: ["Entity RowEntity GhostScared1", "Entity RowEntity GhostScared2"],
        direction_up: ["Entity RowEntity GhostScared1", "Entity RowEntity GhostScared2"],
        direction_right: ["Entity RowEntity GhostScared1", "Entity RowEntity GhostScared2"],
        direction_down: ["Entity RowEntity GhostScared1", "Entity RowEntity GhostScared2"]
    },
    dead_ghost: {
        direction_left: ["Entity RowEntity GhostDead1", "Entity RowEntity GhostDead2"],
        direction_up: ["Entity RowEntity GhostDead1", "Entity RowEntity GhostDead2"],
        direction_right: ["Entity RowEntity GhostDead1", "Entity RowEntity GhostDead2"],
        direction_down: ["Entity RowEntity GhostDead1", "Entity RowEntity GhostDead2"]
    },
    flash_ghost: {
        direction_left: ["Entity RowEntity GhostScared1", "Entity RowEntity GhostDead2"],
        direction_up: ["Entity RowEntity GhostScared1", "Entity RowEntity GhostDead2"],
        direction_right: ["Entity RowEntity GhostScared1", "Entity RowEntity GhostDead2"],
        direction_down: ["Entity RowEntity GhostScared1", "Entity RowEntity GhostDead2"]
    },
    power_up: {
        power_up_cherry: ["Entity RowEntity Cherry"],
        power_up_strawberry: ["Entity RowEntity Strawberry"],
        power_up_peach: ["Entity RowEntity Peach"],
        power_up_pretzel: ["Entity RowEntity Pretzel"],
        power_up_apple: ["Entity RowEntity Apple"],
        power_up_pear: ["Entity RowEntity Pear"],
        power_up_banana: ["Entity RowEntity Banana"],
        power_up_key: ["Entity RowEntity Key"]
    },
    act: {
        no_modifier: ["Entity ActEntity ActOpen", "Entity ActEntity ActMid", "Entity ActEntity ActClosed"]
    },
    eyes: {
        direction_left: ["Entity RowEntity EyesLeft"],
        direction_up: ["Entity RowEntity EyesUp"],
        direction_right: ["Entity RowEntity EyesRight"],
        direction_down: ["Entity RowEntity EyesDown"]
    },
    heart: {
        no_modifier: ["Entity RowEntity Heart"]
    },
    tiny_icon: {
        tiny_icon_potion: ["Entity TinyIcon Potion"],
        tiny_icon_life: ["Entity TinyIcon Life"]
    },
    swan: {
        no_modifier: ["Entity Swan SwanUp", "Entity Swan SwanDown"]
    },
    big_score: {
        big_score_200: ["Entity BigScore BigScore200"],
        big_score_400: ["Entity BigScore BigScore400"],
        big_score_800: ["Entity BigScore BigScore800"],
        big_score_1600: ["Entity BigScore BigScore1600"]
    },
    row_score: {
        row_score_100: ["Entity RowEntity Score100"],
        row_score_200: ["Entity RowEntity Score200"],
        row_score_500: ["Entity RowEntity Score500"],
        row_score_700: ["Entity RowEntity Score700"],
        row_score_1000: ["Entity RowEntity Score1000"],
        row_score_2000: ["Entity RowEntity Score2000"],
        row_score_5000: ["Entity RowEntity Score5000"]
    },
    none: {
        no_modifier: ["EntityInvisible"]
    }
};

var Entity = function (_Component) {
    _inherits(Entity, _Component);

    _createClass(Entity, null, [{
        key: "DESIGNATOR_MRS_PAC_MAN",
        get: function get() {
            return mrs_pac_man;
        }
    }, {
        key: "DESIGNATOR_PAC_MAN",
        get: function get() {
            return pac_man;
        }
    }, {
        key: "DESIGNATOR_RED_GHOST",
        get: function get() {
            return red_ghost;
        }
    }, {
        key: "DESIGNATOR_ORANGE_GHOST",
        get: function get() {
            return orange_ghost;
        }
    }, {
        key: "DESIGNATOR_PINK_GHOST",
        get: function get() {
            return pink_ghost;
        }
    }, {
        key: "DESIGNATOR_BLUE_GHOST",
        get: function get() {
            return blue_ghost;
        }
    }, {
        key: "DESIGNATOR_SCARED_GHOST",
        get: function get() {
            return scared_ghost;
        }
    }, {
        key: "DESIGNATOR_DEAD_GHOST",
        get: function get() {
            return dead_ghost;
        }
    }, {
        key: "DESIGNATOR_FLASH_GHOST",
        get: function get() {
            return flash_ghost;
        }
    }, {
        key: "DESIGNATOR_POWER_UP",
        get: function get() {
            return power_up;
        }
    }, {
        key: "DESIGNATOR_ACT",
        get: function get() {
            return act;
        }
    }, {
        key: "DESIGNATOR_EYES",
        get: function get() {
            return eyes;
        }
    }, {
        key: "DESIGNATOR_HEART",
        get: function get() {
            return heart;
        }
    }, {
        key: "DESIGNATOR_TINY_ICON",
        get: function get() {
            return tiny_icon;
        }
    }, {
        key: "DESIGNATOR_SWAN",
        get: function get() {
            return swan;
        }
    }, {
        key: "DESIGNATOR_BIG_SCORE",
        get: function get() {
            return big_score;
        }
    }, {
        key: "DESIGNATOR_ROW_SCORE",
        get: function get() {
            return row_score;
        }
    }, {
        key: "DESIGNATOR_NONE",
        get: function get() {
            return none;
        }
    }, {
        key: "MODIFIER_DIRECTION_UP",
        get: function get() {
            return direction_up;
        }
    }, {
        key: "MODIFIER_DIRECTION_UP_PAUSED",
        get: function get() {
            return direction_up_paused;
        }
    }, {
        key: "MODIFIER_DIRECTION_LEFT",
        get: function get() {
            return direction_left;
        }
    }, {
        key: "MODIFIER_DIRECTION_LEFT_PAUSED",
        get: function get() {
            return direction_left_paused;
        }
    }, {
        key: "MODIFIER_DIRECTION_RIGHT",
        get: function get() {
            return direction_right;
        }
    }, {
        key: "MODIFIER_DIRECTION_RIGHT_PAUSED",
        get: function get() {
            return direction_right_paused;
        }
    }, {
        key: "MODIFIER_DIRECTION_DOWN",
        get: function get() {
            return direction_down;
        }
    }, {
        key: "MODIFIER_DIRECTION_DOWN_PAUSED",
        get: function get() {
            return direction_down_paused;
        }
    }, {
        key: "MODIFIER_DEAD",
        get: function get() {
            return dead;
        }
    }, {
        key: "MODIFIER_DEAD_PAUSED",
        get: function get() {
            return dead_paused;
        }
    }, {
        key: "MODIFIER_POWER_UP_CHERRY",
        get: function get() {
            return power_up_cherry;
        }
    }, {
        key: "MODIFIER_POWER_UP_STRAWBERRY",
        get: function get() {
            return power_up_strawberry;
        }
    }, {
        key: "MODIFIER_POWER_UP_PEACH",
        get: function get() {
            return power_up_peach;
        }
    }, {
        key: "MODIFIER_POWER_UP_PRETZEL",
        get: function get() {
            return power_up_pretzel;
        }
    }, {
        key: "MODIFIER_POWER_UP_APPLE",
        get: function get() {
            return power_up_apple;
        }
    }, {
        key: "MODIFIER_POWER_UP_PEAR",
        get: function get() {
            return power_up_pear;
        }
    }, {
        key: "MODIFIER_POWER_UP_BANANA",
        get: function get() {
            return power_up_banana;
        }
    }, {
        key: "MODIFIER_POWER_UP_KEY",
        get: function get() {
            return power_up_key;
        }
    }, {
        key: "MODIFIER_TINY_ICON_POTION",
        get: function get() {
            return tiny_icon_potion;
        }
    }, {
        key: "MODIFIER_TINY_ICON_LIFE",
        get: function get() {
            return tiny_icon_life;
        }
    }, {
        key: "MODIFIER_BIG_SCORE_200",
        get: function get() {
            return big_score_200;
        }
    }, {
        key: "MODIFIER_BIG_SCORE_400",
        get: function get() {
            return big_score_400;
        }
    }, {
        key: "MODIFIER_BIG_SCORE_800",
        get: function get() {
            return big_score_800;
        }
    }, {
        key: "MODIFIER_BIG_SCORE_1600",
        get: function get() {
            return big_score_1600;
        }
    }, {
        key: "MODIFIER_ROW_SCORE_100",
        get: function get() {
            return row_score_100;
        }
    }, {
        key: "MODIFIER_ROW_SCORE_200",
        get: function get() {
            return row_score_200;
        }
    }, {
        key: "MODIFIER_ROW_SCORE_500",
        get: function get() {
            return row_score_500;
        }
    }, {
        key: "MODIFIER_ROW_SCORE_700",
        get: function get() {
            return row_score_700;
        }
    }, {
        key: "MODIFIER_ROW_SCORE_1000",
        get: function get() {
            return row_score_1000;
        }
    }, {
        key: "MODIFIER_ROW_SCORE_2000",
        get: function get() {
            return row_score_2000;
        }
    }, {
        key: "MODIFIER_ROW_SCORE_5000",
        get: function get() {
            return row_score_5000;
        }
    }, {
        key: "MODIFIER_NO_MODIFIER",
        get: function get() {
            return no_modifier;
        }
    }]);

    function Entity(props) {
        _classCallCheck(this, Entity);

        var _this = _possibleConstructorReturn(this, (Entity.__proto__ || Object.getPrototypeOf(Entity)).call(this, props));

        _this._tickHandler = function (e) {
            return _this.gameTimerTick(e);
        };

        _this.state = {
            stepNumber: 0
        };
        return _this;
    }

    _createClass(Entity, [{
        key: "gameTimerTick",
        value: function gameTimerTick(e) {

            this.setState({
                stepNumber: e[_GameTimer2.default.TIME_250MS]
            });
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps, oldProps) {
            if (!this.props.animating && nextProps.animating) {
                _GameTimer2.default.instance.addCallback(this._tickHandler);
            } else if (this.props.animating && !nextProps.animating) {
                _GameTimer2.default.instance.removeCallback(this._tickHandler);
            }
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            if (this.props.animating) {
                _GameTimer2.default.instance.addCallback(this._tickHandler);
            }
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            _GameTimer2.default.instance.removeCallback(this._tickHandler);
        }
    }, {
        key: "getModifier",
        value: function getModifier() {
            if ((this.props.designator === Entity.DESIGNATOR_MRS_PAC_MAN || this.props.designator === Entity.DESIGNATOR_PAC_MAN) && !this.props.animating) {
                switch (this.props.modifier) {
                    case direction_left:
                        return direction_left_paused;
                    case direction_up:
                        return direction_up_paused;
                    case direction_right:
                        return direction_right_paused;
                    case direction_down:
                        return direction_down_paused;
                    case dead:
                        return dead_paused;
                    default:
                        throw new Error("Unknown Modifier");
                }
            }

            return this.props.modifier;
        }
    }, {
        key: "currentClassName",
        value: function currentClassName() {
            var frames = frame_mappings[this.props.designator][this.getModifier()];
            if (typeof frames === "undefined") {
                throw new Error("Invalid Mapping Detected between " + this.props.designator + " and " + this.props.modifier);
            }

            var frameNumber = this.state.stepNumber % frames.length;
            var toRet = frames[frameNumber];
            if (this.props.blink) {
                toRet += " EntityBlink";
            }
            return toRet;
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement("div", { className: this.currentClassName() });
        }
    }]);

    return Entity;
}(_react.Component);

Entity.propTypes = {
    designator: _propTypes2.default.string.isRequired,
    modifier: _propTypes2.default.string.isRequired,
    animating: _propTypes2.default.bool,
    blink: _propTypes2.default.bool
};

Entity.defaultProps = {
    animating: true,
    blink: false
};

exports.default = Entity;