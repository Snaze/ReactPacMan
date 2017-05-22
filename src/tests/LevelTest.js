import React, {Component} from 'react';
import Level from "../Level";
import {default as LevelModel} from "../model/Level";
import LevelFactory from "../model/LevelFactory";

class LevelTest extends Component {

    constructor(props) {
        super(props);

        this.state = {
            level: LevelFactory.createLevel("Level1")
        };
    }

    render() {
        return (
            <table style={{backgroundColor: "black"}}>
                <tbody>
                <tr>
                    <td>
                        <table>
                            <tbody>
                            <tr>
                                <td>
                                    <Level dataSource={this.state.level} />
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td >
                    </td>
                </tr>
                <tr>
                    <td >
                    </td>
                </tr>
                <tr>
                    <td >
                    </td>
                </tr>
                <tr>
                    <td >
                    </td>
                </tr>
                <tr>
                    <td >
                    </td>
                </tr>
                <tr>
                    <td >
                    </td>
                </tr>
                </tbody>
            </table>
        );
    }
}

export default LevelTest;
