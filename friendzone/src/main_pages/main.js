import React, { useState, useEffect } from "react";
import Axios from 'axios';
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NavigationBar from './Navbar';

import "./main.css";

export default function Main() {

    const [userData, setUserData] = useState();
    const [emailData, setEmailData] = useState();
    const [admin, setAdmin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!userData) {
            authinfo();
        }
    }, []);

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

    return (
        <>
            <div className="">
                <NavigationBar admin={admin} user={userData} email={emailData} />
            </div>
        </>
    )
}
