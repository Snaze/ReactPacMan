import Direction from "../utils/Direction";
import Location from "./Location";
import DataSourceBase from "./DataSourceBase";
import GameTimer from "../model/GameTimer";
import moment from "../../node_modules/moment/moment";
import KeyEventer from "../utils/KeyEventer";
// import {default as document} from "../utils/DocumentStub";

const mr_pac_man = 0;
const mrs_pac_man = 1;
const valid_gender = [mr_pac_man, mrs_pac_man];

class Player extends DataSourceBase {

    static get MR_PAC_MAN() { return mr_pac_man; }
    static get MRS_PAC_MAN() { return mrs_pac_man; }

    static genderIsValid(theGender) {
        return valid_gender.indexOf(theGender) > -1;
    }

    constructor(direction, location, gender, moveInDirectionCallback, playerSpawnLocation) {
        super();

        if (!Direction.isValid(direction)) {
            throw new Error ("Invalid direction");
        }

        if (!(location instanceof Location)) {
            throw new Error ("Invalid Location");
        }

        if (!Player.genderIsValid(gender)) {
            throw new Error ("Invalid gender");
        }

        this._locationOnChangeCallbackRef = (e) => this._locationOnChangeCallback(e);
        this._direction = direction;
        this._location = location;
        this._location.addOnChangeCallback(this._locationOnChangeCallbackRef);
        this._gender = gender;
        this._cellTransitionDuration = 0.25; // seconds
        this._moveInDirectionCallback = moveInDirectionCallback;
        this._timerCallbackHandle = (e) => this.timerCallback(e);
        GameTimer.instance.addCallback(this._timerCallbackHandle);
        this._keyEventer = new KeyEventer();
        this._keyEventer.bindEvents(document.body, null, null);
        this._editMode = false;
        this._lastTick = moment();
        this._spawnLocation = null;
    }

    timerCallback(e) {
        // console.log("timer tick");

        let currentMoment = moment();
        let lastTickPlusDuration = this._lastTick.clone().add(this._cellTransitionDuration, "s");

        if (currentMoment.isAfter(lastTickPlusDuration)) {

            let newDirection = this.direction;

            if (this._keyEventer.lastArrowPressed !== null) {
                if (this._keyEventer.lastArrowPressed === Direction.UP) {
                    newDirection = Direction.UP;
                } else if (this._keyEventer.lastArrowPressed === Direction.DOWN) {
                    newDirection = Direction.DOWN;
                } else if (this._keyEventer.lastArrowPressed === Direction.LEFT) {
                    newDirection = Direction.LEFT;
                } else if (this._keyEventer.lastArrowPressed === Direction.RIGHT) {
                    newDirection = Direction.RIGHT;
                }
            }

            this.attemptToMoveInDirection(newDirection);
            this._lastTick = moment();
        }
    }

    attemptToMoveInDirection(direction) {
        let prevX = this.location.x;
        let prevY = this.location.y;

        this._moveInDirectionCallback(this, direction);
        if (this.location.isEqualTo(prevX, prevY)) {
            this._moveInDirectionCallback(this, this._direction);
        }
    }

    removeAllCallbacks() {
        super.removeAllCallbacks();

        this._location.removeOnChangeCallback(this._locationOnChangeCallbackRef);
        this._keyEventer.unBindEvents();
        GameTimer.instance.removeCallback(this._timerCallbackHandle);
    }

    _locationOnChangeCallback(e) {
        this._raiseOnChangeCallbacks("_location." + e.source);

        // TODO: FIXME this is kindof a hack
        if ((this._spawnLocation === null) && e.object.isValid) {
            this._spawnLocation = e.object.clone();
        }
    }

    get direction() {
        return this._direction;
    }

    set direction(value) {
        this._setValueAndRaiseOnChange("_direction", value);
    }

    get location() {
        return this._location;
    }

    set location(value) {
        this._setValueAndRaiseOnChange("_location", value);
    }

    get gender() {
        return this._gender;
    }

    set gender(value) {
        this._setValueAndRaiseOnChange("_gender", value);
    }

    get cellTransitionDuration() {
        return this._cellTransitionDuration;
    }

    set cellTransitionDuration(value) {
        this._setValueAndRaiseOnChange("_cellTransitionDuration", value);
    }

    get editMode() {
        return this._editMode;
    }

    set editMode(value) {
        this._setValueAndRaiseOnChange("_editMode", value);

        if (value) {
            if ((this._spawnLocation !== null) && this._spawnLocation.isValid) {
                this.location.setWithLocation(this._spawnLocation);
            }
            GameTimer.instance.removeCallback(this._timerCallbackHandle);
        } else {
            GameTimer.instance.addCallback(this._timerCallbackHandle);
        }
    }

    get spawnLocation() {
        return this._spawnLocation;
    }

    set spawnLocation(value) {
        this._spawnLocation = value;
    }
}

export default Player;