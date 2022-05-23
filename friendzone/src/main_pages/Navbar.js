import React from "react";
import Navbar from "react-bootstrap/NavBar";
import Axios from 'axios';
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";
import { Calendar3WeekFill, Bell, PersonLinesFill } from 'react-bootstrap-icons';

// NavigationBar with dropdowns and homepage
function NavigationBar(props) {

    const navigate = useNavigate();

    // Logout function
    const logout = () => {
        // GET request to logout then navigate to login page
        Axios.get('/api/logout', { withCredentials: true });
        navigate("/");
    }

    const profilePage = () => {
        navigate("/profile", { state: { email: props.email } });
    }

    return (
        <div>
            <Navbar className="Navbar" bg="dark" variant="dark" expand="lg" fixed="top">
                <Container fluid="md">
                    <Navbar.Brand href="/main" className="main-logo">
                        <Calendar3WeekFill /> {' '}
                        𝔽𝕣𝕚𝕖𝕟𝕕 ℤ𝕠𝕟𝕖 {/* Special font form https://loremipsum.io/font-generator/ */}
                    </Navbar.Brand>

                </Container>
                <Navbar.Collapse href="#notfication" className="justify-content-end">
                    <Nav>
                        <Navbar.Brand href="#Notfication">
                            <Bell />
                        </Navbar.Brand>
                        <NavDropdown id="collasible-nav-dropdown"
                            drop="start"
                            menuVariant="dark"
                            title={
                                <span>
                                    < PersonLinesFill />
                                </span>
                            }>
                            <NavDropdown.Item onClick={profilePage}>Profile</NavDropdown.Item>
                            <NavDropdown.Item href="/postEvent">Post Event</NavDropdown.Item>
                            {props.admin ? <NavDropdown.Item href="#Report">View Report</NavDropdown.Item> : ''}
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={logout}>Sign Out</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>

            </Navbar>

        </div>
    );
}

export default NavigationBar;
