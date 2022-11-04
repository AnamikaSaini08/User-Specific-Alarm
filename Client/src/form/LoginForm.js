import React, {useState} from "react";
import styles from './login.module.css';
const MyLogin = ()=>{
  const serverUrl = 'http://localhost:4004';
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
const handleSubmit = (event)=>{
  event.preventDefault();
  console.log(email, password);
  const params = {
    email: email,
    password: password
  };
  console.log('params', params);
  const response = fetch(`${serverUrl}/login`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(params)
  })
  response.then(x=> console.log('x----->',x)).then(y=> console.log('y---->',y));
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
