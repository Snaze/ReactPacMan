import React from 'react';
import PropTypes from 'prop-types';
import DataSourceComponent from "./DataSourceComponent";
import {default as PointsModel} from "./model/Points";
import Cell from "./Cell";
import Entity from "./Entity";

class Points extends DataSourceComponent {
    static modifierScoreMapping = {
        "ghost_kill": {
            200: Entity.MODIFIER_BIG_SCORE_200,
            400: Entity.MODIFIER_BIG_SCORE_400,
            800: Entity.MODIFIER_BIG_SCORE_800,
            1600: Entity.MODIFIER_BIG_SCORE_1600
        },
        "power_up": {
            100: Entity.MODIFIER_ROW_SCORE_100,
            200: Entity.MODIFIER_ROW_SCORE_200,
            500: Entity.MODIFIER_ROW_SCORE_500 ,
            700: Entity.MODIFIER_ROW_SCORE_700,
            1000: Entity.MODIFIER_ROW_SCORE_1000,
            2000: Entity.MODIFIER_ROW_SCORE_2000,
            5000: Entity.MODIFIER_ROW_SCORE_5000
        }
    };

    get points() {
        return this.dataSource;
    }

    getEntityStyle(currentGridLocation) {
        let toRet = {
            display: "none"
        };

        if (this.points.pointsState === PointsModel.POINTS_STATE_INVISIBLE) {
            // console.log("component - invisible");
            return toRet;
        }

        if (currentGridLocation.isValid) {
            // let cellModel = this.level.gameMatrix[spawnLocation.y][spawnLocation.x];
            let cellLocation = Cell.getCellLocation(currentGridLocation);

            toRet.display = "block";
            toRet.position = "absolute";
            toRet.top =  (cellLocation.y - 2) + "px";
            toRet.left = (cellLocation.x - 2) + "px";
            toRet.pointerEvents = "none";

            if (this.points.pointsState === PointsModel.POINTS_STATE_FADE) {
                let transitionStr = "top 2s, left 2s, opacity 2s";
                toRet.webKitTransition = transitionStr; /* Safari */
                toRet.transition = transitionStr;
                toRet.top =  (cellLocation.y - 16) + "px";
                toRet.left = (cellLocation.x + 16) + "px";
                toRet.opacity = 0;

                // console.log("component - fade");
            }
        }

        return toRet;
    }

    getPointsDesignator() {
        switch (this.points.pointsType) {
            case PointsModel.POINTS_TYPE_GHOST_KILL:
                return Entity.DESIGNATOR_BIG_SCORE;
            case PointsModel.POINTS_TYPE_POWER_UP:
                return Entity.DESIGNATOR_ROW_SCORE;
            default:
                return Entity.DESIGNATOR_NONE;
        }
    }

    getPointsModifier() {
        switch (this.points.pointsType) {
            case PointsModel.POINTS_TYPE_GHOST_KILL:
                let toRet = Points.modifierScoreMapping["ghost_kill"][this.points.amount];
                if (typeof(toRet) === "undefined") {
                    return Entity.MODIFIER_NO_MODIFIER;
                }
                return toRet;
            case PointsModel.POINTS_TYPE_POWER_UP:
                let toRet2 = Points.modifierScoreMapping["power_up"][this.points.amount];
                if (typeof(toRet2) === "undefined") {
                    return Entity.MODIFIER_NO_MODIFIER;
                }
                return toRet2;
            default:
                return Entity.MODIFIER_NO_MODIFIER;

        }
    }

    render() {
        return (<div className="Points" style={this.getEntityStyle(this.points.location)}>
            <Entity designator={this.getPointsDesignator()}
                    modifier={this.getPointsModifier()}
                    animating={true} />
        </div>);
    }
}

Points.propTypes = {
    dataSource: PropTypes.instanceOf(PointsModel).isRequired
};

export default Points;
