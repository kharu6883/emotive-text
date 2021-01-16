import Launch from "./component/launch.jsx";
import Recording from "./component/recording/recording.jsx";
import Edit from "./component/edit/edit.jsx";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" exact component={Launch} />
				<Route path="/recording" component={Recording} />
				<Route path="/edit" component={Edit} />
			</Switch>
		</BrowserRouter>
	);
}

export default App;
