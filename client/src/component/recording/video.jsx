import React from "react";
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

	return (
		<>
			<Webcam
				audio={false}
				ref={webcamRef}
				screenshotFormat="image/jpeg"
				videoConstraints={videoConstraints}
			/>
			<button onClick={capture}>Capture photo</button>
			{imgSrc && <img src={imgSrc} />}
		</>
	);
};

export default WebcamCapture;
