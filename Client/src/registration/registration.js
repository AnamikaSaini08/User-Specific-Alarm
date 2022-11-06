import React, {useState, useEffect} from "react";
import styles from './registration.module.css';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../apiCall/serverApi';

const Register = ()=>{
  const navigate = useNavigate();
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [confirmpassword,setConfirmpassword]=useState('');
  const [name,setName]=useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
const handleSubmit = (event)=>{
  event.preventDefault();
  console.log(email, password);
  const params = {
    "name": name,
    "email": email,
    "phoneno": phoneNumber,
    "password": password,
    "confirmpassword": confirmpassword,
  };
  console.log('params', params);
  const response = registerUser(params);
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
  setEmail('');
  setPassword('');
}

useEffect(()=>{
  const loginData = localStorage.getItem('login');
  if(loginData && JSON.parse(loginData).login){
    navigate("/");
  }
},[]);
  return(
<div className={styles.formContainer}>
<h1 className={styles.login}>Registration</h1>
  <form className={styles.formMain}>
    <div className="red">
    {/* "name": "AS",
    "email": "as@gmail.com",
    "phoneno": "7398721305",
    "password": "12345",
    "confirmpassword": "12345", */}
    <input 
      type="text" 
      name="name" 
      placeholder="Name" 
      className={styles.inputs}
      onChange={event => setName(event.target.value)}
      value={name}/>
      <br></br>
    <input 
      type="email" 
      name="email" 
      placeholder="Email Register" 
      className={styles.inputs}
      onChange={event => setEmail(event.target.value)}
      value={email}/>
      <br/>

      <input 
      type="number" 
      name="phoneno" 
      placeholder="Phone Number" 
      className={styles.inputs}
      onChange={event => setPhoneNumber(event.target.value)}
      value={phoneNumber}/>
      <br/>

    <input 
      type="password" 
      name="password" 
      placeholder="Password" 
      className={styles.inputs}
      onChange={event => setPassword(event.target.value)}
      value={password} 
      /><br/>

    <input 
      type="password" 
      name="confirmPassword" 
      placeholder="Confirm Password" 
      className={styles.inputs}
      onChange={event => setConfirmpassword(event.target.value)}
      value={confirmpassword} 
      /><br/>
    <button className={styles.button} onClick={handleSubmit} >Register</button>
    </div>
  </form>
</div>
  );
}
export default Register;
