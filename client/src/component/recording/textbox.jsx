import React, { Component } from "react";
import "./recording.css";
import Button from "react-bootstrap/Button";
import { Redirect } from "react-router";
import "./fonts.css";

class Textbox extends Component {
	state = { savedtext: [], toEdit: false };

	// componentDidMount() {
	// 	this.saveText();
	// 	setInterval(this.saveText, 5000);
	// }

	// saveText() {
	// 	this.state.savedtext.push([this.props.transcript, ["emotion"]]);
	// 	this.setState({ savedtext: this.state.savedtext, text: "" });
	// 	console.log(this.state.savedtext);
	// 	console.log(this.state.text);
	// }

	render() {
		const { toEdit } = this.state;
		if (toEdit) {
			return (
				<Redirect
					to={{
						pathname: "/edit",
						state: { text: this.props.transcript },
					}}
				/>
			);
		}
		return (
			<React.Fragment>
				<div className={"textbox"}>
					<h1>Speech Transcription</h1>

					<p className="fontChange">{this.props.transcript}</p>
					{/* <Recorder
						record={true}
						title={"New recording"}
						audioURL={this.state.audioDetails.url}
						showUIAudio
						handleAudioStop={(data) => this.handleAudioStop(data)}
						handleOnChange={(value) =>
							this.handleOnChange(value, "firstname")
						}
						handleAudioUpload={(data) =>
							this.handleAudioUpload(data)
						}
						handleRest={() => this.handleRest()}
					/> */}

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
