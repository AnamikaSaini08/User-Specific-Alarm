import './App.css';
import React, { useState } from 'react';
import Navbar from './navbar/Navbar';
import ItemBody from './card/ItemBody';
import {Route,Routes} from 'react-router-dom';
import MyLogin from './form/LoginForm';
import Register from './registration/registration';
import Home from './home/home';

//login, register, home
function App() {
  const isLogedin = false;
  return (
    <div>
      {
        isLogedin ? <MyLogin></MyLogin> :  <Home></Home>
      }
    </div>
  )
}

export default App;
