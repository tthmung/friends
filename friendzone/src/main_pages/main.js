import React, { useState, useEffect } from "react";
import Axios from 'axios';
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NavigationBar from './Navbar';

import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';

import { Calculator, Controller, Palette, Globe2, SuitClubFill } from "react-bootstrap-icons";
import { PeopleFill, Building, Activity, Search, FilterCircle } from "react-bootstrap-icons";

import LeadingIcon from "./Component";
import "./main.css";


// Find the icon associated with the category

export default function Main(props) {

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

    useEffect(() => {
        if (!userData) {
            authinfo();
        }
    }, []);

    const alertUser = (e) => {
        navigate('/main/' + e);
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
                    {props.events.map((event) => {
                        return (
                            <ListGroup.Item as="li" key={event.id} action onClick={() => alertUser(event.id)} className="d-flex justify-content-between align-items-start list_view">
                                <div className="mas-2 me-auto">
                                    <LeadingIcon cat={event.category} />
                                    <div className="fw-bold">{event.title}</div>
                                    {event.location}, {event.time}
                                </div>
                                <Badge bg="success" pill>
                                    Signed Up: {event.sign_up}
                                </Badge>
                            </ListGroup.Item>
                        )
                    })}
                </ListGroup>
            </div>
        </>
    )
}
