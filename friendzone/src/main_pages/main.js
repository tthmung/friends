import React, { useState, useEffect } from "react";
import Axios from 'axios';
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NavigationBar from './Navbar';

import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';

import { Calculator, Controller, Palette, Globe2, SuitClubFill, PeopleFill, Building, Activity, Search, FilterCircle } from "react-bootstrap-icons";

import "./main.css";


// Find the icon associated with the category
function LeadingIcon(props) {
    const cat = props.cat;
    if (cat === 'Academic') {
        return <Calculator />;
    } else if (cat === 'Active') {
        return <Globe2 />;
    } else if (cat === 'Carpool') {
        return <PeopleFill />;
    } else if (cat === 'Clubs') {
        return <SuitClubFill />
    } else if (cat === 'Creative') {
        return <Palette />;
    } else if (cat === 'Gaming') {
        return <Controller />;
    } else if (cat === 'Volunteer') {
        return <Building />;
    } else {
        return <Activity />;
    }
}

export default function Main() {

    // User states
    const [userData, setUserData] = useState();
    const [emailData, setEmailData] = useState();
    const [admin, setAdmin] = useState(false);

    // Events states
    const [events, setEvents] = useState([]);

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

    // GET request to get all the events
    const getEvents = () => {
        Axios.get('http://127.0.0.1:8080/api/events', { withCredentials: true }).then((response) => {
            if (response.data.events) {
                console.log(response.data.events);
                setEvents(response.data.events);
            }
        });
    }

    useEffect(() => {
        if (!userData) {
            authinfo();
        }
        getEvents();
    }, []);

    const alertUser = () => {
        alert('You clicked');
    }

    return (
        <>
            <NavigationBar admin={admin} user={userData} email={emailData} />
            <div className="main_page">
                <div className="subNav">
                    <Search width="40" />
                    {new Date().toLocaleDateString()}
                    <FilterCircle width="40" />
                </div>
                <ListGroup>
                    {events.map((event, i) => {
                        return (<ListGroup.Item as="li" action onClick={alertUser} className="d-flex justify-content-between align-items-start list_view">
                            <div className="mas-2 me-auto">
                                <LeadingIcon cat={event.category} />
                                <div className="fw-bold">{event.title}</div>
                                {event.location}, {event.time}
                            </div>
                            <Badge bg="success" pill>
                                {event.slots}
                            </Badge>
                        </ListGroup.Item>)
                    })}
                </ListGroup>
            </div>
        </>
    )
}
