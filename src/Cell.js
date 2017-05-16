import React, { Component } from 'react';
import './Cell.css';
import Dot from "./model/Dot";

class Cell extends Component {

    constructor(props) {
        super(props);

        this.state = {hover: false};
    }

    get cellId() {
        return this.props.y + "_" + this.props.x;
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    style() {
        let toRet = {
            borderLeft : this.props.borderLeft ? "Solid 2px #87CEEB": "none",
            borderRight : this.props.borderRight ? "Solid 2px #87CEEB": "none",
            borderTop : this.props.borderTop ? "Solid 2px #87CEEB": "none",
            borderBottom : this.props.borderBottom ? "Solid 2px #87CEEB": "none",
            verticalAlign : "middle",
            textAlign : "center",
            backgroundColor: this.state.hover ? "#AED6F1" : "Black"
        };

        let width = 24;
        if (this.props.borderLeft) {
            width -= 2;
        }
        if (this.props.borderRight) {
            width -= 2;
        }

        let height = 24;
        if (this.props.borderTop) {
            height -= 2;
        }
        if (this.props.borderBottom) {
            height -= 2;
        }

        toRet.width = width + "px";
        toRet.height = height + "px";

        return toRet;
    }

    getDot() {
        if (this.props.dotType === Dot.LITTLE) {
            return (<span>.</span>);
        }

        if (this.props.dotType === Dot.BIG) {
            return (<span>O</span>);
        }

        return <span></span>;
    }

    onMouseEnter(e) {
        this.setState({hover: true});
    }

    onMouseLeave(e) {
        this.setState({hover: false});
    }

    render() {
        return (
            <td className="Cell"
                data-cell_id={this.cellId}
                key={this.cellId}
                style={this.style()}
                onMouseEnter={(e) => this.onMouseEnter(e)}
                onMouseLeave={(e) => this.onMouseLeave(e)}
                onClick={(e) => this.props.onClick(e)}>
                {this.getDot()}
            </td>
        );
    }
}

export default Cell;