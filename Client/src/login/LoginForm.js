import React, {useState} from "react";
import {login, fetchData} from '../apiCall/serverApi';
import {useNavigate} from 'react-router-dom';
import styles from './login.module.css';

const MyLogin = ()=>{
  const navigate = useNavigate();
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
const handleSubmit = async (event)=>{
  // JSON.parse(localStorage.getItem('login')).login
  event.preventDefault();
  console.log(email, password);
  const params = {
    email: email,
    password: password
  };
  console.log('params', params);
  const response = login(params);
  console.log('response1', response);
  response.then(data => {
        console.log('this is data------>',data);
        if(data.token){
          const token = data.token;
          localStorage.setItem('login', JSON.stringify({
            login: true,
            token: token
          }))
          navigate("/");
        }
  })
  const data = fetchData()
  data.then(data => {
    console.log('this is data 1------>',data);
  })
  setEmail('');
  setPassword('');
}
  return(
<div className={styles.formContainer}>
<h1 className={styles.login}>Login Page</h1>
  <form className={styles.formMain}>
    <div className="red">
  
    <input 
      type="email" 
      name="email" 
      placeholder="Email" 
      className={styles.inputs}
      onChange={event => setEmail(event.target.value)}
      value={email}
      /><br/>

    <input 
      type="password" 
      name="password" 
      placeholder="Password" 
      className={styles.inputs}
      onChange={event => setPassword(event.target.value)}
      value={password} 
      /><br/>
    <button className={styles.button} onClick={handleSubmit} >Login</button>
    </div>
  </form>
</div>
  );
}
export default MyLogin;
