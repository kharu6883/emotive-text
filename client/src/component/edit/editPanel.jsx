import React, { Component } from "react";
import "./edit.css";
import Button from "react-bootstrap/Button";

class editPanel extends Component {
	render() {
		// let text;
		// if (this.props.location) {
		// 	text = this.props.location.state.transcript;
		// } else {
		// 	console.log(this.props.location);
		// 	text = "hello";
		// }
		return (
			<React.Fragment>
				<div className={"editPnl"}>{this.props.text}</div>
			</React.Fragment>
		);
	}
}

export default editPanel;
