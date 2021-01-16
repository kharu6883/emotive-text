import React from "react";
import Video from "./video";
import Textbox from "./textbox";
import Button from "react-bootstrap/Button";
import "./recording.css";
import Nav from "../nav";
const Recording = () => {
	return (
		<React.Fragment>
			<Nav />
			<Video />
			<Textbox />
			<Button className={"doneBtn"} variant="primary">
				Done
			</Button>
		</React.Fragment>
	);
};

export default Recording;
