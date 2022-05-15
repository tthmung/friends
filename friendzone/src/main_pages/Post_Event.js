import React, { useState, useEffect } from "react";
import Axios from 'axios';
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NavigationBar from './Navbar';
import DateTimePicker from 'react-datetime-picker';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Calendar2 } from 'react-bootstrap-icons';

import "./main.css";


export default function Post_Event(props) {

    const [userData, setUserData] = useState();
    const [admin, setAdmin] = useState(false);
    const navigate = useNavigate();

    // All the requirement informations to post an event
    const [emailData, setEmailData] = useState();
    const [timeValue, setTimeValue] = useState(new Date());
    const [title, setTitle] = useState('');
    const [cat, setCat] = useState('');
    const [subCat, setSubCat] = useState('');
    const [location, setLocation] = useState('');
    const [slot, setSlot] = useState(1);
    const [description, setDescription] = useState('');

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
        });
    }

    useEffect(() => {
        if (!userData) {
            authinfo();
        }
    }, []);


    const Category = [
        'Academic',
        'Active',
        'Carpool',
        'Clubs',
        'Creative',
        'Gaming',
        'Volunteer',
        'Other'
    ];

    const academicsubcat = [
        'Study Group',
        'Homework',
        'Tutoring',
        'Other'
    ];

    const activesubcat = [
        'Winter Sports',
        'Water Sports',
        'Racquet Sports',
        'Team Sports',
        'Other'
    ];

    const carpoolsubcat = [
        'Short Distances',
        'Long Distances',
        'Other'
    ];

    const creativeSubcat = [
        'Art',
        'Music',
        'Other'
    ];

    const gamingSubcat = [
        'Video Games',
        'Board Games',
        'Card Games',
        'Other'
    ];

    const volunteerSubcat = [
        'Michigan Tech',
        'Community',
        'Other'
    ];

    var subCategories = [];

    if (cat === 'Academic') {
        subCategories = academicsubcat;
    } else if (cat === 'Active') {
        subCategories = activesubcat;
    } else if (cat === 'Carpool') {
        subCategories = carpoolsubcat;
    } else if (cat === 'Creative') {
        subCategories = creativeSubcat;
    } else if (cat === 'Gaming') {
        subCategories = gamingSubcat;
    } else if (cat === 'Volunteer') {
        subCategories = volunteerSubcat;
    } else {
        subCategories = [];
    }

    // Execute when sign up form is complete
    const handleSubmit = (e) => {
        // Prevent page refresh
        e.preventDefault();

        // POST request to post the events
        Axios.post('http://127.0.0.1:8080/api/postevent', {
            email: emailData,
            title: title,
            description: description,
            time: timeValue.toISOString().slice(0, 19).replace('T', ' '),
            location: location,
            slots: slot,
            category: cat,
            subcategory: subCat
        }, { withCredentials: true }).then((err) => {
            console.log(err);
        });

        // Navigate to main page
        navigate('/main');
    }

    return (
        <>
            <NavigationBar admin={admin} user={userData} email={emailData} />
            <div className="background">
                <div className="postForm">
                    <Form className="mainForm" onSubmit={handleSubmit}>
                        <Form.Group controlId="formGridEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" placeholder={emailData} disabled readOnly />
                        </Form.Group>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text" onChange={e => setTitle(e.target.value)} placeholder="Event Title" required />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>Location</Form.Label>
                                <Form.Control type="text" onChange={e => setLocation(e.target.value)} placeholder="Location" required />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group controlId="formGridState">
                                <Form.Label>Slot</Form.Label>
                                <Form.Control type="number" onChange={e => setSlot(e.target.value)} min="1" defaultValue="1" required />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>Category</Form.Label>
                                <Form.Group as={Col} controlId="formGridState">
                                    <Form.Select defaultValue="" onChange={e => setCat(e.target.value)} required>
                                        <option></option>
                                        {Category.map((item, i) => { return <option key={i} value={item}>{item}</option> })}
                                    </Form.Select>
                                </Form.Group>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>Sub Category</Form.Label>
                                <Form.Select defaultValue="" onChange={e => setSubCat(e.target.value)} required>
                                    <option></option>
                                    {subCategories.map((item, i) => { return <option key={i} value={item}>{item}</option> })}
                                </Form.Select>
                            </Form.Group>
                        </Row>

                        <Form.Label>Date Time</Form.Label>
                        <Row className="mb-3">
                            <DateTimePicker
                            onChange={setTimeValue}
                            value={timeValue}
                            calendarIcon={<Calendar2 />}
                            disableClock={true}
                            minDate={new Date()}
                            required />
                        </Row>

                        <Row className="mb-3">
                            <Form.Group controlId="formGridState">
                                <Form.Label>Description</Form.Label>
                                <Form.Control type="text" placeholder="Short Description" onChange={e => setDescription(e.target.value)} required />
                            </Form.Group>
                        </Row>

                        <Form.Group as={Row} className="mb-3">
                            <Col sm={{ span: 10, offset: 0 }}>
                                <Button type="submit">Submit</Button>
                            </Col>
                        </Form.Group>
                    </Form>
                </div>
            </div>
        </>
    )
}
