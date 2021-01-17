import React, { Component } from "react";
// import React, { useState } from "react";
import SpeechRecognition, {
	useSpeechRecognition,
} from "react-speech-recognition";
import WebcamCapture from "./video";
import Textbox from "./textbox";

const Dictaphone = () => {
	const { transcript, resetTranscript } = useSpeechRecognition();

	if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
		return null;
	}

	// const [text, setText] = useState(0);
	// const [currenttext, setText] = useState(0);

	const editTranscript = () => {};

	return (
		<div>
			<WebcamCapture />
			<button
				onClick={() => {
					SpeechRecognition.startListening({ continuous: true });
				}}
			>
				Start
			</button>
			<button
				onClick={() => {
					SpeechRecognition.stopListening({ continuous: false });
				}}
			>
				Stop
			</button>
			<button onClick={resetTranscript}>Reset</button>
			<Textbox transcript={transcript} />
		</div>
	);
};
export default Dictaphone;
