import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import EditPanel from "./editPanel";
import SettingsPanel from "./settingsPanel";
import Nav from "../nav";
class Edit extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		Edit.bind(this);

		return (
			<React.Fragment>
				<Nav />
				<EditPanel text={this.props.location.state.text} />
				<SettingsPanel />
				<Button
					href="/recording"
					className={"doneBtn"}
					variant="primary"
				>
					Done
				</Button>
			</React.Fragment>
		);
	}
}

export default Edit;
