import React from "react";
import Button from "react-bootstrap/Button";
import EditPanel from "./editPanel";
import SettingsPanel from "./settingsPanel";
import Nav from "../nav";
const Edit = () => {
	return (
		<React.Fragment>
			<Nav />
			<EditPanel />
			<SettingsPanel />
			<Button href="/recording" className={"doneBtn"} variant="primary">
				Done
			</Button>
		</React.Fragment>
	);
};

export default Edit;
