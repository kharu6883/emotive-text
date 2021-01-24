import React, { useState, useEffect } from "react";
import Webcam from "react-webcam";
import axios from "axios";

const videoConstraints = {
	width: 300,
	height: 300,
	facingMode: "user",
};

const WebcamCapture = () => {
	const webcamRef = React.useRef(null);
	const [imgSrc, setImgSrc] = React.useState(null);

	const capture = React.useCallback(() => {
		const imageSrc = webcamRef.current.getScreenshot();
		setImgSrc(imageSrc);
		// console.log(src={imgSrc} );
	}, [webcamRef, setImgSrc]);

	useEffect(async () => {
		const interval = setInterval(() => {
			capture();

			// axios({
			// 	method: "post",
			// 	url: "http://localhost5000/image",
			// 	data: {
			// 		img: imgSrc,
			// 	},
			// });
		}, 5000);

		// returned function will be called on component unmount
		return () => {
			clearTimeout(this.interval);
		};
	}, []);

	return (
		<>
			<Webcam
				audio={false}
				ref={webcamRef}
				screenshotFormat="image/jpeg"
				videoConstraints={videoConstraints}
			/>
			{imgSrc && <img src={imgSrc} />}
		</>
	);
};

export default WebcamCapture;
