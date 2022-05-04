import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Login from './login_page/login'
import SignUp from './login_page/signup'
import Main from './main_pages/main';

function App() {
  return (
    <Router>
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route path="/sign-in" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/main" element={<Main />} />
            </Routes>
    </Router>
  )
}
export default App;
