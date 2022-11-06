import React, { useState } from 'react';
import styles  from './alarm.module.css';
function ViewAlarms(props){
    console.log('props', props);
    // const Alarms1= props.Alarms;
    const { Alarms } = props;
    console.log('Alarms', Alarms);
    return(
        <div>
            <h2>All Alarms</h2>
            {
                Alarms.map((alarm) => {
                return <div className={alarm.isActivate ? styles.activateAlarm : styles.deactivateAlarm}>
                    {alarm.alarmName} {(String)(new Date((parseInt)(alarm.alarmTime)))}
                    {/* {new Date((parseInt)(alarm.alarmTime))} */}
                    </div>;
            })
            }
        </div>
    )
}

export default ViewAlarms;