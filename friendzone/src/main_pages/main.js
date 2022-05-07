import React, { useState, useEffect } from "react";
import Axios from 'axios';
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NavigationBar from './Navbar';

import "./main.css";

export default function Main(){

    // const [userData, setUserData] = useState("");
    // const navigate = useNavigate();
    // useEffect(() => {
    //     console.log("navigate");
    //     authinfo();
    //   }, []);

    //   const authinfo = () => {
    //     Axios.get('http://127.0.0.1:8080/api/main', {withCredentials: true}).then((response) => {
    //         console.log(response);
    //         if (response.data) {
    //             setUserData(response.data.user.name);
    //         } else {
    //             console.log("ERROR USER NOT LOG IN");
    //         }
    //     })
    //   }

    const [isOpen, setIsOpen] = React.useState(false)
    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }

    return (
        <>
        <div className="">
            <NavigationBar admin={false} />
        </div>
            {/* <button onClick={toggleDrawer}>Show</button>
            <Drawer open={isOpen} onClose={toggleDrawer} direction='left' className='bla bla bla'>
                <div>Hello World</div>
            </Drawer> */}
        </>
    )
}
