import React, { useState } from 'react';
import styles  from './alarm.module.css';
function ViewAlarms(props){
    console.log('props', props);
    // const Alarms1= props.Alarms;
    const { Alarms } = props;
    console.log('Alarms', Alarms);
    return(
        <div>
            <h4>All Alarms</h4>
            {
                Alarms.map((alarm) => {
                return <div id={styles.alarmList} className={alarm.isActivate ? styles.activateAlarm : styles.deactivateAlarm}>
                    <div>{alarm.alarmName}</div>
                    <div> {(String)(new Date(alarm.alarmTime))} </div>
                    {/* {new Date((parseInt)(alarm.alarmTime))} */}
                    </div>;
            })
            }
        </div>
    )
}

export default ViewAlarms;