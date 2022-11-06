import './App.css';
import React, { useState } from 'react';
import Navbar from './navbar/Navbar';
import {Route,Routes, BrowserRouter} from 'react-router-dom';
import MyLogin from './login/LoginForm';
import Register from './registration/registration';
import AlarmHome from './Alarm/alarmHome';
import {} from '../node_modules/bootstrap/dist/css/bootstrap.min.css';

//login, register, home
function App() {
  return (
    <div>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<AlarmHome/>} />
        <Route path="/login" element = {<MyLogin/>} />  
        <Route path="/register" element = {<Register/>} />  
      </Routes>
    </div>
  )
}

export default App;
