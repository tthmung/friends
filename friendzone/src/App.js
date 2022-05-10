import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Login from './login_page/login'
import SignUp from './login_page/signup'
import Main from './main_pages/main';
import Profile from './main_pages/Profile';
import Post_Event from './main_pages/Post_Event';
import Notfication from './main_pages/Notification';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/main" element={<Main />} />
        <Route path='/profile' element={<Profile />}/>
        <Route path='/postEvent' element={<Post_Event />}/>
        <Route path='/Notification' element={<Notfication />}/>
      </Routes>
    </Router>
  )
}
export default App;
