import React from "react";
import Webcam from "react-webcam";

const videoConstraints = {
	width: 300,
	height: 300,
	facingMode: "user",
};

// class WebcamComponent extends Component {
// 	// state = { isRecording: false, blobURL: "", isBlocked: false };
// 	componentDidMount() {
// 		// navigator.getUserMedia(
// 		// 	{ audio: true },
// 		// 	() => {
// 		// 		console.log("Permission Granted");
// 		// 		this.setState({ isBlocked: false });
// 		// 	},
// 		// 	() => {
// 		// 		console.log("Permission Denied");
// 		// 		this.setState({ isBlocked: true });
// 		// 	}
// 		// );
// 	}

// 	// start = () => {
// 	// 	if (this.state.isBlocked) {
// 	// 		console.log("Permission Denied");
// 	// 	} else {
// 	// 		Mp3Recorder.start()
// 	// 			.then(() => {
// 	// 				this.setState({ isRecording: true });
// 	// 			})
// 	// 			.catch((e) => console.error(e));
// 	// 	}
// 	// };
// 	// stop = () => {
// 	// 	Mp3Recorder.stop()
// 	// 		.getMp3()
// 	// 		.then(([buffer, blob]) => {
// 	// 			const blobURL = URL.createObjectURL(blob);
// 	// 			this.setState({ blobURL, isRecording: false });
// 	// 			console.log(this.state.blobURL);
// 	// 		})
// 	// 		.catch((e) => console.log(e));
// 	// };

// 	render() {
// 		return (
// 			<React.Fragment>
// 				<WebcamCapture />
// 				{/* <button onClick={this.start} disabled={this.state.isRecording}>
// 					Record
// 				</button>
// 				<button onClick={this.stop} disabled={!this.state.isRecording}>
// 					Stop
// 				</button>
// 				<audio src={this.state.blobURL} controls="controls" /> */}
// 			</React.Fragment>
// 		);
// 	}
// }
// export default WebcamComponent;

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

export default WebcamCapture;
