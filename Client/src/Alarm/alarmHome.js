import React, { useEffect, useState } from 'react';
import { DateTimePicker } from "@material-ui/pickers";
import {useNavigate} from 'react-router-dom';
import ViewAlarms from './viewAlarms';
import ActionAlerts from './alert';
import styles from './alarm.module.css';

function AlarmHome(){
    const navigate = useNavigate();
    const [authenticated, setAuthentication] = useState(false); 
    const [selectedDate, handleDateChange] = useState(Date.now());
    const [alarmName, setAlarmName] = useState('');
    const [currentAlarmIndex, setCurrentAlarmIndex] = useState(null);
    const [openAlarm, setCloseAlarm] = React.useState(false);
    const [alarms, setAlarms] = useState([]);
    const [audio] = useState(new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"));

    const handleCloseAlarm = ()=>{
        setCloseAlarm(false);
        alarms[currentAlarmIndex].isActivate = false;
        setAlarms(alarms);
        audio.pause();

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
            if(alarms[i].alarmTime< Date.now() && alarms[i].isActivate){
                setCurrentAlarmIndex(i);
                audio.play();
                setCloseAlarm(true);
                break; 
            }
        }
    }    
    useEffect(() => {
        const timer = setInterval(()=>checkAlarm(), 1000);
        return ()=> clearInterval(timer);
    },[alarms]);

    useEffect(()=>{
        const loginData = localStorage.getItem('login');
        if(loginData){
            const isLoggedIn = JSON.parse(loginData).login;
            setAuthentication(isLoggedIn);
        }else{
            navigate("/login");
        }
    },[])

    return (
        <div class="container-fluid" className={styles.container}>
            <div class="row">
                { currentAlarmIndex != null ? <ActionAlerts openAlarm={openAlarm} handleCloseAlarm={handleCloseAlarm}/> : <></> }
                {/* <div className={styles.heading}>Alarms</div> */}
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
            </div>
        </div>
    )
}

export default AlarmHome