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
    const [users, setUsers] = useState([]);

    // User states
    const [userData, setUserData] = useState();
    const [emailData, setEmailData] = useState();
    const [admin, setAdmin] = useState(false);

    // Error message
    const [errorMessage, setErrorMessage] = useState('');

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

    // Get the users that signed up for the specified event
    const getSignedUpUsers = () => {
        Axios.get('http://127.0.0.1:8080/api/getusers/' + props.id,
            { withCredentials: true }).then((response) => {
                if (response.data.result) {
                    setUsers(response.data.result);
                }
            });
    }

    useEffect(() => {
        if (!userData) {
            authinfo();
        }
        getEventById();
        getSignedUpUsers();
    }, []);

    const editEvent = (e) => {
        // TODO: Render event edit page, replace the current page
    }

    // Create post request to join an event
    const joinEvent = () => {
        if (event.email === emailData) {
            alert("Can't join own event");
        } else {
            Axios.post('http://127.0.0.1:8080/api/joinevent',
                {
                    id: event.id,
                    email: emailData,
                    comment: ''
                }, { withCredentials: true }).then((response) => {
                    getSignedUpUsers();
                    if (response.data.message) {
                        alert(response.data.message);
                    }
                });
        }
    }

    // Create post request to leave an event
    const leaveEvent = () => {
        if (event.email === emailData) {
            alert("Can't leave own event");
        } else {
            Axios.post('http://127.0.0.1:8080/api/leaveevent', {
                id: event.id,
                email: emailData
            }, { withCredentials: true }).then((response) => {
                getSignedUpUsers();
                if (response.data.message) {
                    alert(response.data.message);
                }
            });
        }
    }

    // Report an event
    const reportEvent = () => {
        if (event.email === emailData) {
            alert("Can't leave own event");
        } else {
            Axios.post('http://127.0.0.1:8080/api/reportevent', {
                id: event.id,
                email: emailData,
                comment: ''
            }, { withCredentials: true });
        }
    }

    return (
        <>
            <NavigationBar admin={admin} user={userData} email={emailData} />
            <div className="main_page">
                <Container fluid="md">
                    <Row>
                        <Col>
                            <h1>{event.title}</h1>
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
                                        <td>{event.sign_up}</td>
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
                        </Col>
                        <Col className="middle-col">
                            <Col>
                                <button className="main-function-button edit-button" onClick={editEvent}>Edit</button>
                            </Col>
                            <div className="joinLeave">
                                <Col>
                                    <button className="main-function-button" onClick={joinEvent}>Join</button>
                                </Col>
                                <Col>
                                    <button className="main-function-button" onClick={leaveEvent}>Leave</button>
                                </Col>
                            </div>
                            <div className="">
                                <Col>
                                    <button className="main-function-button report-alert" onClick={reportEvent}>Report</button>
                                </Col>
                            </div>
                        </Col>
                        <Col>
                            <h1>Signed Up List</h1>
                            <Table>
                                <tbody>
                                    {users.map((user) => (<tr><td key={user.email}>{user.email}</td></tr>))}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}
