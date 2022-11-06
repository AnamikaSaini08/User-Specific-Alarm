import React, {useState} from "react";
import styles from './registration.module.css';
import { registerUser } from '../apiCall/serverApi';

const Register = ()=>{
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
  registerUser(params);
  setEmail('');
  setPassword('');
}
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
