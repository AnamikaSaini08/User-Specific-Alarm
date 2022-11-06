import './App.css';
import React, { useState } from 'react';
import Navbar from './navbar/Navbar';
import ItemBody from './card/ItemBody';
import {Route,Routes, BrowserRouter} from 'react-router-dom';
import MyLogin from './form/LoginForm';
import Register from './registration/registration';
import AlarmHome from './Alarm/alarmHome';
import {} from '../node_modules/bootstrap/dist/css/bootstrap.min.css';

//login, register, home
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" exact>       <AlarmHome/>           </Route>
        <Route path="/login">        <MyLogin/>          </Route>
      </Routes>
    </div>
    // <BrowserRouter>
    //   <Route path="/" exact>       <AlarmHome/>           </Route>
    //   <Route path="/login" exact>       <MyLogin/>           </Route>
    // </BrowserRouter>
    // <div>
    //   {
    //     isLogedin ? <MyLogin/> :  <AlarmHome/>
    //   }
    // </div>
  )
}

export default App;
