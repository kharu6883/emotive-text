import React, { Component, useEffect } from "react";

// import React, { Component, useState, useEffect } from "react";

import "./recording.css";
import Button from "react-bootstrap/Button";
import { Redirect } from "react-router";
import "./fonts.css";
import axios from "axios";
class Textbox extends Component {
	state = { text: "", toEdit: false };

	// getEmotion = () => {
	// 	console.log("clicked");

	// 	axios
	// 		.get("")
	// 		.then((response) => {
	// 			console.log(response);
	// 		})
	// 		.catch((error) => {
	// 			console.log(error);
	// 		});
	// };

	// 	async componentDidMount() {

	// 		  console.log("SDf")
	// 		  }, 30000);
	// 		}
	//   }

	// useEffect( () => {
	// 	const interval = setInterval(() => {
	// 		console.log("work plz")
	// 	}, 5000);

	// 	return () => {
	// 		clearTimeout(this.interval);
	// 	};
	// }, []);
	// componentDidMount() {
	// 	this.timer = setInterval(console.log("hsdfsdfi"), 5000);
	// }

	// componentWillUnmount() {
	// 	clearInterval(this.timer);
	// }

	// 	const interval = setInterval(function() {
	// console.log("SDF")	  }, 5000);

	//  clearInterval(interval);

	render() {
		const { toEdit } = this.state;
		if (toEdit) {
			return (
				<Redirect
					to={{
						pathname: "/edit",
						state: { text: this.props.text },
					}}
				/>
			);
		}

		const addFont = () => {
			return <span className="neutral">{this.props.text}</span>;
		};

		return (
			<React.Fragment>
				<div className="textbox">
					<h1>Speech Transcription</h1>
					<p className={this.props.emotion}>{addFont()}</p>
					<Button
						variant="outline-light"
						onClick={() => {
							this.setState({
								toEdit: true,
							});
						}}
						className="mr-3 editBtn"
					>
						Edit
					</Button>
				</div>
			</React.Fragment>
		);
	}
}

export default Textbox;
