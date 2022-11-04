import styles from './Navbar.module.css';
import data from '../dataCenter';
import {Link} from "react-router-dom";

function Navbar(props) {
    const {categories,items,users, NavbarItem} = data;
    const {category,setCategory} = props;
    // console.log('navbar props',props);
  return (
    <div className={styles.container}>
      {
          NavbarItem.map(currentCategory => {
            // <div className={"btn-group pull-right" + (this.props.showBulkActions ? ' show' : ' hidden')}>
              return (
                <div className={styles.navbarItem+ ' '+ (currentCategory === category ? styles.navbarHover : null)} 
                onClick={()=>setCategory(currentCategory)}>
                    <Link to={`/${currentCategory}`} className={styles.textLink}>
                      {currentCategory}
                    </Link>
              </div>
              )
          })
      }
    </div>
  );
}

export default Navbar;