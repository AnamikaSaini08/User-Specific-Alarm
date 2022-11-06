import styles from './Navbar.module.css';
import {Link, useNavigate} from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const handleLogout = ()=>{
    localStorage.removeItem('login');
    navigate("/login");
  }
  return (
    <div className={styles.container}>
      <div className={styles.navbarItem}>
        <Link to="/" className={styles.textLink}>Home</Link>
      </div>
      <div className={styles.navbarItem}>
        <Link to="/login" className={styles.textLink}>Login</Link>
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