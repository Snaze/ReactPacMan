import React from 'react';
import ReactDOM from 'react-dom';
import Player from './Player';
import {default as PlayerModel} from "../model/actors/Player";
import Direction from "../utils/Direction";
import {default as LocationModel} from "../model/Location";
import Level from "../model/Level";

it('renders without crashing', () => {
    const div = document.createElement('div');
    const level = new Level();
    const player = new PlayerModel(Direction.LEFT,
        new LocationModel(-1, -1), level, PlayerModel.MR_PAC_MAN);

    ReactDOM.render(<Player dataSource={player} />, div);
});
