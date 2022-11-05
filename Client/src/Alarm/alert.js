import * as React from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function ActionAlerts(props) {
    const {openAlarm,handleCloseAlarm} = props;
  return (
    <div>
         {openAlarm ? <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert onClose={() => {
                console.log('this is going to close');
                handleCloseAlarm();
                // setOpen(false);
            }}>Alarm Start!
            </Alert>
        </Stack> : <></>
        }
    </div>
  );
}