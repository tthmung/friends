import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NavigationBar from './Navbar';

import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';

import LeadingIcon from './Component'
import './main.css';

export default function Profile() {

    const location = useLocation();

    const [userInfo, setUserInfo] = useState([]);    // User states
    const [myEvent, setMyEvent] = useState([]);
    const [joinedEvent, setJoinedEvent] = useState([]);

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

    // Get the user information
    const getUserInfo = () => {
        Axios.post('http://127.0.0.1:8080/api/getUser', {
            email: location.state.email
        }, { withCredentials: true }).then((response) => {
            if (response.data.result) {
                setUserInfo(response.data.result);
            }
        });
    }

    // Get the event posted by the user
    const getMyEvent = () => {
        Axios.post('http://127.0.0.1:8080/api/myevent', {
            email: location.state.email
        }, { withCredentials: true }).then((response) => {
            if (response.data.result) {
                setMyEvent(response.data.result);
            }
        });
    }

    // Get the event joined by the user
    const getJoinedEvnet = () => {
        Axios.post('http://127.0.0.1:8080/api/joinedevent', {
            email: location.state.email
        }, { withCredentials: true }).then((response) => {
            if (response.data.result) {
                setJoinedEvent(response.data.result);
            }
        });
    }

    useEffect(() => {
        if (!userData) {
            authinfo();
        }
        getUserInfo();
        getMyEvent();
        getJoinedEvnet();
    }, [])


    const nevigateEvent = (e) => {
        navigate('/main/' + e);
    }
    return (
        <>
            <NavigationBar admin={admin} user={userData} email={emailData} />

            <Container>
                <Row>
                    <Col xs={6} md={4}>
                        {emailData === userInfo.email ? <Button>EDIT</Button> : ""}
                    </Col>
                    <Col xs={6} md={4}>
                        <h1 className="profileTitle">{userInfo.name}</h1>
                        <h4 className="profileTitle">{userInfo.email}</h4>
                        <p className="profileTitle">Introduction: {userInfo.introduction}</p>
                    </Col>
                </Row>
            </Container>
            <Container>
                <Row>
                    <Col className="joinedEvent">
                        <h4>Joined Events</h4>
                        <ListGroup>
                            {joinedEvent.map((event) => {
                                return (
                                    <ListGroup.Item as="li" key={event.id} action onClick={() => nevigateEvent(event.id)} className="d-flex justify-content-between align-items-start profile_list">
                                        <div className="mas-2 me-auto">
                                            <div className="fw-bold">
                                                <LeadingIcon cat={event.category} /> {event.title}
                                            </div>
                                        </div>
                                    </ListGroup.Item>
                                )
                            })}
                        </ListGroup>
                    </Col>
                    <Col>
                        <div className="myEvent">
                            <h4>My Events</h4>
                            <ListGroup>
                                {myEvent.map((event) => {
                                    return (
                                        <ListGroup.Item as="li" key={event.id} action onClick={() => nevigateEvent(event.id)} className="d-flex justify-content-between align-items-start profile_list">
                                            <div className="mas-2 me-auto">
                                                <div className="fw-bold">
                                                    <LeadingIcon cat={event.category} /> {event.title}
                                                </div>
                                            </div>
                                        </ListGroup.Item>
                                    )
                                })}
                            </ListGroup>
                        </div>

                    </Col>
                </Row>
            </Container>
        </>
    )
}
