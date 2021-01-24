import React, { Component, useState, useEffect } from "react";
// import React, { useState } from "react";
import SpeechRecognition, {
	useSpeechRecognition,
} from "react-speech-recognition";
import WebcamCapture from "./video";
import Textbox from "./textbox";
import axios from "axios";

const Dictaphone = ({ setEmotion, setText }) => {
	const {
		transcript,
		finalTranscript,
		resetTranscript,
	} = useSpeechRecognition();

	useEffect(() => {
		setText(transcript);
	});
	// const [send, setSend] = useState(false);
	// const [here, setHere] = useState(<Textbox transcript={""} />);
	// const [text, setText] = useState("default");
	// useEffect(() => {
	// 	const interval = setInterval(() => {
	// 		console.log("transcript", transcript);
	// 		// setText(transcript);
	// 		resetTranscript();
	// 	}, 5000);

	// 	return () => {
	// 		clearTimeout(this.interval);
	// 	};
	// }, []);

	if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
		return null;
	}

	const getEmotion = () => {
		axios
			.get("http://localhost:5000/get-emotion")
			.then((res) => {
				console.log(res.data.emotion);
				setEmotion(res.data.emotion);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	// const [text, setText] = useState(0);
	// const [currenttext, setText] = useState(0);

	// const editTranscript = () => {};

	// console.log("SDF", send);
	// if (send === true) {
	// 	setSend(false);
	// 	console.log("TRUE");
	// 	setHere(<Textbox transcript={transcript} />);
	// } else {
	// 	setHere(<Textbox transcript={""} />);
	// }

	return (
		<div>
			<WebcamCapture />
			<button
				onClick={() => {
					getEmotion();
				}}
			>
				click
			</button>
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
			{/* <p>{text}</p> */}
		</div>
	);
};
export default Dictaphone;

// {
// 	useEffect(async () => {
// 		const interval = setInterval(() => {

// 			resetTranscript();
// 		}, 5000);

// 		return () => {
// 			clearTimeout(this.interval);
// 		};
// 	}, []);
// }

// <Textbox
// 	transcript={
// 		send
// 			? () => {
// 					send = false;
// 					return transcript;
// 			  }
// 			: "no"
// 	}
// />
