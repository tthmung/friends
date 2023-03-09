import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Axios from 'axios';
import Login from './login_page/login'
import SignUp from './login_page/signup'
import Main from './main_pages/main';
import Profile from './main_pages/Profile';
import Post_Event from './main_pages/Post_Event';
import Notfication from './main_pages/Notification';
import DetailEvent from './main_pages/DetailEvent';
import Report from './main_pages/Report';


function App() {

  useEffect(() => {
    document.title = "Friend Zone";
    getEvents();
  }, [])

  const [events, setEvents] = useState([]);

  // GET request to get all the events
  const getEvents = () => {
    Axios.get('http://127.0.0.1:8080/api/events', { withCredentials: true }).then((response) => {
      if (response.data.events) {
        setEvents(response.data.events);
      }
    });
  }

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/main" element={<Main events={events} />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/postEvent' element={<Post_Event />} />
        <Route path='/Notification' element={<Notfication />} />
        <Route path='/report' element={<Report />} />
        {events.map((event) => {
          return (
            <Route path={'/main/' + event.id} element={<DetailEvent id={event.id} />} />
          )
        })}
      </Routes>
    </Router>
  )
}
export default App;
