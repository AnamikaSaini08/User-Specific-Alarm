import React, { useState } from 'react';
import styles from './Star.module.css';
import { ReactComponent as FullStar } from '../svgImages/full-star.svg';
import { ReactComponent as EmptyStar } from '../svgImages/empty-star.svg';


function Star(props) {
    // console.log('star props',props);
    const {rating} = props;
    const ratingArray = [...Array(5)];
    // const [rating,setRating]=useState(rating);

  return (
    <div className={styles.container}>
       {
         ratingArray.map((x,index)=>{
           return index<rating ? <FullStar/> : <EmptyStar/>
         })
        }
    </div>
  );
}

export default Star;