import React, { useState } from 'react';
// import { DatePicker } from '@material-ui/pickers'
import { DateTimePicker, KeyboardDateTimePicker } from "@material-ui/pickers";
import ViewAlarms from './viewAlarms';

// import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
// function x(y){

// }
// x = (y)=>{}
function Home(){
    const [taskName, setTaskName] = useState('');
    const [selectedDate, handleDateChange] = useState(new Date("2022-01-01T00:00:00.000Z"));
    console.log('selectedDate', new Date(selectedDate));
    const [alarms, setAlarms] = useState([2432423,"sfsdfsdf"]);
    const addAlarm = ()=>{
        setAlarms(alarms => ([...alarms, String(selectedDate)])); //setTimeout 2
        // console.log('Alarms dates',alarms);
    }
    return (
        <div>
            <h1>Alarms</h1>
            <DateTimePicker
            variant="inline"
            label="Alarm"
            value={selectedDate}
            onChange={handleDateChange}
            />
            <button onClick={addAlarm}>Add Alarm</button>

            <ViewAlarms Alarms={alarms}/>

            {/* <div>
                <input
                type="text"
                placeholder='Task Name'
                onChange={(event)=>{
                    console.log(event.target.value)
                    setTaskName(event.target.value)
                }}
                value={taskName}
                />
                <button onc>+</button>
            </div> */}
        </div>
    )
}

export default Home