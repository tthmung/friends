import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NavigationBar from './Navbar';

import './main.css';

export default function Profile() {

    const location = useLocation();

    return (
        <>
            <NavigationBar />
            <div>
                {location.state.email}
            </div>
        </>
    )
}
