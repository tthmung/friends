import React, { useState, useEffect } from "react";
import Axios from 'axios';
import { useNavigate } from "react-router-dom";

import "./style.css";

export default function Main(){

    const [userData, setUserData] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        Axios.get('http://127.0.0.1:8080/api/auth', {}).then((response) => {
            console.log(response);
            if (response.data.user) {
                setUserData(response.data.user.name);
            } else {
                navigate('/');
            }
        })
      }, []);

    return (
        <p>Hello World {userData}</p>
    )
}
