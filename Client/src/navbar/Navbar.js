import styles from './Navbar.module.css';
import {Link, useNavigate} from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const handleLogout = ()=>{
    localStorage.removeItem('login');
    navigate("/login");
  }
  const isLogin = ()=>{
    const loginData = localStorage.getItem('login');
    if(!loginData){
      navigate('/login');
    }
    else{
          navigate('/');
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles.navbarItem}>
        <Link to="/" className={styles.textLink}>Home</Link>
      </div>
      <div className={styles.navbarItem} onClick={isLogin}>
       Login
      </div>
      <div className={styles.navbarItem}>
        <Link to="/register" className={styles.textLink}>Register</Link>
      </div>
      <div className={styles.navbarItem} onClick={handleLogout}>
        Logout
      </div>
    </div>
  );
}

export default Navbar;