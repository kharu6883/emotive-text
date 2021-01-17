import React, { Component } from "react";
import Nav from "../nav";
import Button from "react-bootstrap/Button";
import "./launch.css";

class Launch extends Component {
	state = {};

	componentDidMount() {}
	render() {
		return (
			<React.Fragment>
				<div className="title">Emotive Writing</div>
				<div className="intro">
					<h1>Welcome to Emotive Writing!</h1>
					<h2>Introduction </h2>
				</div>
				<div className="userInput">
					<Button
						href="/recording"
						className="startCallBtn"
						variant="primary"
					>
						Start a call
					</Button>
					<form className="code">
						<input
							className="code-input"
							placeholder="Enter code"
						></input>
						<Button
							type="submit"
							value="submit"
							className="submitBtn"
							variant="primary"
						>
							Submit
						</Button>
					</form>
				</div>
				<div className="images">images</div>
			</React.Fragment>
		);
	}
}

export default Launch;
