import Navbar from "react-bootstrap/Navbar";

const Nav = () => {
	return (
		<>
			<Navbar bg="primary" variant="dark">
				<Navbar.Brand href="/">Emotive Writing</Navbar.Brand>
				<Navbar.Toggle />
				<Navbar.Collapse className="justify-content-end">
					<Navbar.Text>
						Your Link to your chatroom is:{" "}
						<a href="#login">emotivewriting.com/dfsdfs</a>
					</Navbar.Text>
				</Navbar.Collapse>
			</Navbar>
		</>
	);
};
export default Nav;
