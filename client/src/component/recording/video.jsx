import React from "react";
import Webcam from "react-webcam";

const videoConstraints = {
	width: 300,
	height: 300,
	facingMode: "user",
};

const WebcamComponent = () => {
	return (
		<>
			{/* <Webcam
				audio={false}
				height={720}
				screenshotFormat="image/jpeg"
				width={1280}
				videoConstraints={videoConstraints}
			/>
			<button>Capture photo</button> */}
			<WebcamCapture />
			<div
				style={{ height: "300px", width: "300px", background: "grey" }}
			>
				Video Box
			</div>
		</>
	);
};
export default WebcamComponent;

const WebcamCapture = () => {
	const webcamRef = React.useRef(null);
	const [imgSrc, setImgSrc] = React.useState(null);

	const capture = React.useCallback(() => {
		const imageSrc = webcamRef.current.getScreenshot();
		setImgSrc(imageSrc);
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
