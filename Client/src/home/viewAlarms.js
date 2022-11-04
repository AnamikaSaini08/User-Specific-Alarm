import React, { useState } from 'react';

function ViewAlarms(props){
    console.log('props', props);
    // const Alarms1= props.Alarms;
    const { Alarms } = props;
    return(
        <div>
            <h2>All Alarms</h2>
            {
                Alarms.map((alarm) => {
                return <div>{alarm}</div>;
            })
            }
        </div>
    )
}

export default ViewAlarms;