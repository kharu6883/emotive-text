import React, { Component } from "react";
import Nav from "./nav";
import Button from "react-bootstrap/Button";

class Launch extends Component {
	state = {};

	componentDidMount() {}
	render() {
		return (
			<React.Fragment>
				<Nav />
				<h1>hello</h1>
				<h2>Introduction </h2>
				<Button
					href="/recording"
					className={"doneBtn"}
					variant="primary"
				>
					Start a call
				</Button>{" "}
			</React.Fragment>
		);
	}
}

export default Launch;
