import { React, useState } from "react";
// import Video from "./video";
import Textbox from "./textbox";
import VidAudioBox from "./vidaudiobox";

import Button from "react-bootstrap/Button";

import "./recording.css";
import Nav from "../nav";
const Recording = () => {
	const [emotion, setEmotion] = useState("neutral");
	const [text, setText] = useState("");

	return (
		<>
			<Nav />
			{/* <Video /> */}
			<Textbox emotion={emotion} text={text} />
			<VidAudioBox setEmotion={setEmotion} setText={setText} />
			<Button className={"doneBtn"} variant="primary">
				Done
			</Button>
		</>
	);
};

export default Recording;
