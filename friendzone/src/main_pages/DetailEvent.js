import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NavigationBar from './Navbar';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';

import './main.css';

export default function DetailEvent(props) {

    const [event, setEvent] = useState([]);
    // User states
    const [userData, setUserData] = useState();
    const [emailData, setEmailData] = useState();
    const [admin, setAdmin] = useState(false);

    const navigate = useNavigate();

    // Check if user is authenticated
    const authinfo = () => {
        Axios.get('http://127.0.0.1:8080/api/main', { withCredentials: true }).then((response) => {
            if (response.data.result) {
                setEmailData(response.data.result.email);
                setUserData(response.data.result.name);
                setAdmin(response.data.result.admin);
            } else {
                console.log("ERROR USER NOT LOG IN");
                navigate('/');
            }
        })
    }

    // Get the specified event
    const getEventById = () => {
        Axios.get('http://127.0.0.1:8080/api/getevent/' + props.id,
            { withCredentials: true }).then((response) => {
                if (response.data.event) {
                    setEvent(response.data.event);
                }
            });
    }

    useEffect(() => {
        if (!userData) {
            authinfo();
        }
        getEventById();
    }, []);

    const editEvent = () => {
        // TODO: Edit an event if it's the owner
    }

    const joinEvent = () => {
        // TODO: Join an event
    }

    const leaveEvent = () => {
        // TODO: Leave an event
    }

    const reportEvent = () => {
        // TODO: Report an event
    }

    return (
        <>
            <NavigationBar admin={admin} user={userData} email={emailData} />
            <div className="main_page">
                <Container fluid="md">
                    <Row>
                        <Col>
                            <h1>{event.title}</h1>
                            <Row>
                                <Table>
                                    <tbody>
                                        <tr>
                                            <td>Email:</td>
                                            <td><Link to=''
                                                onClick={() => window.location = 'mailto:' + event.email}>
                                                {event.email}

                                            </Link></td>
                                        </tr>
                                        <tr>
                                            <td>Time:</td>
                                            <td>{event.time}</td>
                                        </tr>
                                        <tr>
                                            <td>Location:</td>
                                            <td>{event.location}</td>
                                        </tr>
                                        <tr>
                                            <td>Category:</td>
                                            <td>{event.category}</td>
                                        </tr>
                                        <tr>
                                            <td>Subcategory:</td>
                                            <td>{event.subcategory}</td>
                                        </tr>
                                        <tr>
                                            <td>Slot:</td>
                                            <td>{event.slots}</td>
                                        </tr>
                                        <tr>
                                            <td>Signed Up:</td>
                                            <td>12</td>
                                        </tr>
                                        <tr>
                                            <td>Reported:</td>
                                            <td>{event.reported}</td>
                                        </tr>
                                        <tr>
                                            <td>Date Created:</td>
                                            <td>{event.date_created}</td>
                                        </tr>
                                        <tr>
                                            <td>Description:</td>
                                            <td>{event.description}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Row>
                        </Col>
                        <Col>
                            <Col>
                            <button className="main-function">Edit</button>
                            </Col>
                            <Col>
                            <button className="main-function">Join</button>
                            </Col>
                            <Col>
                            <button className="main-function">Leave</button>
                            </Col>
                            <Col>
                            <button className="main-function">Report</button>
                            </Col>

                        </Col>
                        <Col>
                            <h1>Signed Up List</h1>
                            <p>LIST OF EMAIL HERE</p>
                            <p>LIST OF EMAIL HERE</p>
                            <p>LIST OF EMAIL HERE</p>
                            <p>LIST OF EMAIL HERE</p>
                            <p>LIST OF EMAIL HERE</p>
                            <p>LIST OF EMAIL HERE</p>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}
