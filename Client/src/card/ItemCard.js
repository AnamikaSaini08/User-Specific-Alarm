import styles from './ItemCard.module.css';
import data from '../dataCenter';
import {ReactComponent as Rupee } from '../svgImages/Indian-Rupee-symbol.svg';
import Star from '../star/star';

function ItemCard(props) {
    // const {categories,items,users, NavbarItem} = data;
    const {item}=props;
    // console.log('item',props);
    // console.log('process.env.PUBLIC_URL',process.env.PUBLIC_URL);
    const imagePath=`./images/${item.image}`;
  return (
    <div className={styles.itemContainer}>
      <div className={styles.imageContainer}>
        <img src={imagePath} alt="mobile" className={styles.itemImage}/>
      </div>
      <div>
        <div className={styles.itemName}>
          {item.name}
        </div>
        <div className={styles.itemPrice}>
          <Rupee className={styles.rupeeIcon}/>
          {item.price}
        </div>
        <div className={styles.itemRating}>
          <Star rating={item.rating} className={styles.starIcon}/>
        </div>
        <div className={styles.button1}>
         <a> <button className={styles.cart}>add to Cart</button></a>
         <a> <button className={styles.buy}>Buy now</button></a>

        </div>
      </div>
    </div>
  );
}

export default ItemCard;