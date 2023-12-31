import { useState } from 'react';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import "./RequestOffdayButton.css";
import dayjs, { Dayjs } from 'dayjs';
import Alert from '@mui/material/Alert';

interface IconLabelButtonsProps {
  excuseType: string;
  excuseStartDate: Dayjs | null;
  excuseEndDate: Dayjs | null;
  description: string;
}



function IconLabelButtons(props: IconLabelButtonsProps) {

  const [showMsg, setShowMsg] = useState(false);

  const [fillBlanks, setFillBlanks] = useState(false);

  const handleSubmit = async () => {
    // Check if all fields are filled
    if (props.excuseType === "" || props.excuseStartDate === null || props.excuseEndDate === null || props.description === "") {
      setFillBlanks(true);
      return;
    }
    // Create the request body
    const username = sessionStorage.getItem("username");

    const requestBody = {
      excuseType: props.excuseType,
      excuseStartDate: props.excuseStartDate,
      excuseEndDate: props.excuseEndDate,
      description: props.description,
      username: username,
    };
    console.log(sessionStorage.getItem('token'));
    console.log(requestBody);

    try {
      const token = sessionStorage.getItem('token');
      console.log(token);

      const response = await fetch('http://localhost:8080/api/off', {
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
        setShowMsg(true);
        setFillBlanks(false);
        setTimeout(() => {

          window.location.reload();
        }, 1000); // 1200 milliseconds = 1.2 seconds
      } else {
        // Handle error
        setShowMsg(false);
        setFillBlanks(false);
        console.log('Error sending off day request');
      }
    } catch (error) {
      console.error('Error sending off day request:', error);
    }


  };

  return (
    <div className="" style={{ height: 40, marginTop: 65 }}>
      <Stack direction="column" spacing={2}>
        <Button
          className='button'
          variant="contained"
          endIcon={<SendIcon />}
          onClick={handleSubmit}
        >
          İstek Oluştur
        </Button>
        {showMsg &&
          <Alert severity="success">
            İstek başarıyla oluşturuldu!
          </Alert>
        }
        {fillBlanks &&
          <Alert severity="error">
            Lütfen tüm alanları doldurunuz!
          </Alert>
        }
      </Stack>
    </div>
  );
}

export default IconLabelButtons;
