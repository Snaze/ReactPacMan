import ActorBase from "./ActorBase";
import _ from "../../../node_modules/lodash/lodash";
import GhostBrainManual from "./GhostBrains/GhostBrainManual";
import Player from "./Player";

const red = 0;
const blue = 1;
const pink = 2;
const orange = 3;
const valid_color = [red, blue, pink, orange];

class Ghost extends ActorBase {

    static get RED() { return red; }
    static get BLUE() { return blue; }
    static get PINK() { return pink; }
    static get ORANGE() { return orange; }

    static colorIsValid(color) {
        return valid_color.indexOf(color) > -1;
    }

    constructor(level, color, player) {
        super(level);

        if (!Ghost.colorIsValid(color)) {
            throw new Error ("Invalid Color");
        }

        if (!(player instanceof Player)) {
            throw new Error ("Invalid Player");
        }

        this._player = player;
        this._color = color;
        switch(this._color) {
            case Ghost.RED:
                this.location.setWithLocation(level.ghostRedLocation);
                break;
            case Ghost.BLUE:
                this.location.setWithLocation(level.ghostBlueLocation);
                break;
            case Ghost.PINK:
                this.location.setWithLocation(level.ghostPinkLocation);
                break;
            case Ghost.ORANGE:
                this.location.setWithLocation(level.ghostOrangeLocation);
                break;
            default:
                throw new Error("Unknown Ghost color detected");
        }
        this._spawnLocation = this.location.clone();
        this._ghostBrain = new GhostBrainManual();
    }

    _nestedDataSourceChanged(e) {

        if (_.startsWith(e.source, "_ghostRedLocation") && this.color === Ghost.RED) {
            this._spawnLocation.setWithLocation(this.level.ghostRedLocation);
            if (this.editMode) {
                this.location.setWithLocation(this._spawnLocation);
            }
        } else if (_.startsWith(e.source, "_ghostBlueLocation") && this.color === Ghost.BLUE) {
            this._spawnLocation.setWithLocation(this.level.ghostBlueLocation);
            if (this.editMode) {
                this.location.setWithLocation(this._spawnLocation);
            }
        } else if (_.startsWith(e.source, "_ghostPinkLocation") && this.color === Ghost.PINK) {
            this._spawnLocation.setWithLocation(this.level.ghostPinkLocation);
            if (this.editMode) {
                this.location.setWithLocation(this._spawnLocation);
            }
        } else if (_.startsWith(e.source, "_ghostOrangeLocation") && this.color === Ghost.ORANGE) {
            this._spawnLocation.setWithLocation(this.level.ghostOrangeLocation);
            if (this.editMode) {
                this.location.setWithLocation(this._spawnLocation);
            }
        }

        super._nestedDataSourceChanged(e);
    }

    get color() {
        return this._color;
    }

    get player() {
        return this._player;
    }

    canMoveInDirection(sourceLocation, direction) {
        let theCell = this.level.getCellByLocation(sourceLocation);
        let hasSolidBorder = theCell.getSolidBorder(direction);
        // let hasPartialBorder = theCell.getPartialBorder(direction);

        return !hasSolidBorder;
    }

    timerTick(e) {
        let theDirection = this._ghostBrain.getNextDirection(this, this.player, this.level);
        this.cellTransitionDuration = this._ghostBrain.cellTransitionDuration;
        this.moveInDirection(theDirection);
    }
}

export default Ghost;