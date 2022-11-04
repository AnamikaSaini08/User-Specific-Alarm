import './App.css';
import React, { useState } from 'react';
import Navbar from './navbar/Navbar';
import ItemBody from './card/ItemBody';
import {Route,Routes} from 'react-router-dom';
import MyLogin from './form/LoginForm';
import Register from './registration/registration';

function App() {
  const [category,setCategory]=useState('Home');
  return (
    <div className="App">
      <Navbar setCategory={setCategory} category={category}/>
      <Routes>
        <Route path="/" element={<ItemBody setCategory={setCategory} category={category}/>} />
        <Route path="/home" element={<ItemBody setCategory={setCategory} category={category}/>} />
        <Route path="/mobile" element={<ItemBody setCategory={setCategory} category={category}/>} />
        <Route path="/laptop" element={<ItemBody setCategory={setCategory} category={category}/>} />
        <Route path="/cloth" element={<ItemBody setCategory={setCategory} category={category}/>} />
        <Route path="/camera" element={<ItemBody setCategory={setCategory} category={category}/>} />
        <Route path="/book" element={<ItemBody setCategory={setCategory} category={category}/>} />
        <Route path="/login" element = {<MyLogin/>} />
        <Route path="/register" element = {<Register/>} />
      </Routes>
    </div>
  );
}

export default App;
