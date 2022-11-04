import React, { useState } from 'react';
import styles from './ItemCard.module.css';
import ItemCard from './ItemCard';
import data from '../dataCenter';

function ItemBody(props) {
  const {category,setCategory} = props;
  console.log('category', category);
    const {categories,items,users, NavbarItem, nonFilterNav} = data;
    // console.log(data);
    const notFilter = nonFilterNav.find(nonFilter => nonFilter === category);
    const filterdItems = notFilter ? items : items.filter(item => item.category === props.category); 
  return (
    <div className={styles.container}>
      {
          filterdItems.map(item=>{
              return (<div className={styles.itemBody}>
                <ItemCard item={item} />
                </div>)
          })
      }
    </div>
  );
}

export default ItemBody;