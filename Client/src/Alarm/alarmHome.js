import React, { useEffect, useState } from 'react';
import { DateTimePicker } from "@material-ui/pickers";
import ViewAlarms from './viewAlarms';
import ActionAlerts from './alert';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import styles from './alarm.module.css';
import Button from 'react-bootstrap/Button';

function AlarmHome(){
    const [selectedDate, handleDateChange] = useState(Date.now());
    const [alarmName, setAlarmName] = useState('');
    const [currentAlarmIndex, setCurrentAlarmIndex] = useState(null);
    const [openAlarm, setCloseAlarm] = React.useState(false);
    const [alarms, setAlarms] = useState([]);

    const handleCloseAlarm = ()=>{
        setCloseAlarm(false);
        alarms[currentAlarmIndex].isActivate = false;
        setAlarms(alarms);
        // alarms.splice(currentAlarmIndex,1);
        // [0,1,3,4] => splice(index, count); 2,1
        console.log('current Index', currentAlarmIndex);

    }

    const addAlarm = ()=>{
        console.log('selectedDate', selectedDate,new Date(selectedDate).getTime());
        const alarmTime = new Date(selectedDate).getTime();
        const alarmObject = {
            "alarmName":alarmName,
            "alarmTime": alarmTime,
            "isActivate": true
        };
        setAlarms(alarms => ([...alarms, alarmObject]));
        setAlarmName('');
        handleDateChange(Date.now());
    }
    const checkAlarm = ()=> {
        for(let i=0;i<alarms.length;i++){
            console.log('p--->', alarms[i],Date.now(), alarms[i].alarmTime< Date.now());
            if(alarms[i].alarmTime< Date.now() && alarms[i].isActivate){
                setCurrentAlarmIndex(i);
                setCloseAlarm(true);
                break; 
            }
        }
        // console.log('p-->',alarms,Date.now(),alarms[] < Date.now());
    }
    useEffect(() => {
        const timer = setInterval(()=>checkAlarm(), 1000);
        return ()=> clearInterval(timer);
    },[alarms]);

    return (
        <div class="container-fluid" className={styles.container}>
            <div class="row">
                { currentAlarmIndex != null ? <ActionAlerts openAlarm={openAlarm} handleCloseAlarm={handleCloseAlarm}/> : <></> }
                <div className={styles.heading}>Alarms</div>
                <div className={styles.container}>
                    <div className={styles.dateTimePicker}>
                        <DateTimePicker
                        variant="inline"
                        label="Select Time"
                        value={selectedDate}
                        onChange={handleDateChange}
                        minDate = {Date.now()}
                        className={styles.dateTimePicker}
                        />
                    </div>
                    <div>
                    <input 
                        type="text" 
                        name="Text" 
                        placeholder="Alarm Name" 
                        className={styles.inputs}
                        onChange={event => setAlarmName(event.target.value)}
                        value={alarmName}
                        />
                    </div>
                    <div>
                        <button onClick={addAlarm}>Add Alarm</button>
                    </div>
                </div>

                <ViewAlarms Alarms={alarms}/>
                {/* </Box>
            </CssBaseline> */}
            </div>
        </div>
    )
}

export default AlarmHome