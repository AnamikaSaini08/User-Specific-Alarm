import './App.css';
import React, { useState } from 'react';
import Navbar from './navbar/Navbar';
import ItemBody from './card/ItemBody';
import {Route,Routes} from 'react-router-dom';
import MyLogin from './form/LoginForm';
import Register from './registration/registration';
import AlarmHome from './Alarm/alarmHome';
import {} from '../node_modules/bootstrap/dist/css/bootstrap.min.css'

//login, register, home
function App() {
  const isLogedin = false;
  return (
    <div>
      {
        isLogedin ? <MyLogin/> :  <AlarmHome/>
      }
    </div>
  )
}

export default App;
