import React, { useState } from 'react';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import "./RequestOffdayButton.css";
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

interface IconLabelButtonsProps {
  excuseType: string;
  excuseStartDate: Dayjs | null; 
  excuseEndDate: Dayjs | null;
  description: string;
}

function IconLabelButtons(props: IconLabelButtonsProps) {
 
  const handleSubmit = async () => {
    // Create the request body
    const requestBody = {
      excuse_type: props.excuseType,
      excuse_start_day: props.excuseStartDate,
      excuse_end_day: props.excuseEndDate,
      description: props.description,
    };
    console.log(sessionStorage.getItem('token'));
    console.log(requestBody);

    try {
      const token = sessionStorage.getItem('token'); 
      console.log(token);
      
      const response = await fetch('http://localhost:8080/api/add-off-days', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`, // Add the Bearer token to the Authorization header
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        // Handle success
        console.log('Off day request sent successfully');
      } else {
        // Handle error
        console.log('Error sending off day request');
      }
    } catch (error) {
      console.error('Error sending off day request:', error);
    }

    
  };

  return (
    <div className="button-container" style={{ height: 40, marginTop: 65 }}>
      <Stack direction="row" spacing={2}>
        <Button
          className='button'
          variant="contained"
          endIcon={<SendIcon />}
          onClick={handleSubmit}
        >
          İstek Oluştur
        </Button>
      </Stack>
    </div>
  );
}

export default IconLabelButtons;
