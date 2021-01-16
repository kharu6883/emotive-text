import React, { Component } from "react";
import "./recording.css";
import Button from "react-bootstrap/Button";

const Textbox = () => {
	return (
		<React.Fragment>
			<div className={"textbox"}>
				<h1>hello</h1>
				<h2>Introduction </h2>

				<Button
					variant="outline-light"
					href="/edit"
					className="mr-3 editBtn"
				>
					Edit
				</Button>
			</div>
		</React.Fragment>
	);
};

export default Textbox;
