import "./UserPages.css";
import SelectExcuseLeave from './UserToolComponents/ExcuseLeaveSelect';
import DatePickerFinishValue from './UserToolComponents/FinishDatePicker';
import IconLabelButtons from './UserToolComponents/RequestOffDayButton';
import DatePickerValue from './UserToolComponents/Datepicker';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import SideBar from '../AdminPages/AdminNavigation/SideBar';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';



function UserAddOffDay() {
  type Request = {
    requestID: string,
    requestStatus: string,
    excuseCreateDate: string,
    excuseStartDate: Dayjs | null,
    excuseEndDate: Dayjs | null,
    excuseType: string,
    description: string,
    approvedBy: string,
    updatedBy: string,
    updateDate: string
  }
  const [excuseType, setExcuseType] = useState('');
  const [excuseStartDate, setExcuseStartDate] = useState<Dayjs | null>(dayjs('2023-08-01'));
  const [excuseEndDate, setExcuseEndDate] = useState<Dayjs | null>(dayjs('2023-08-01'));
  const [description, setDescription] = useState('');

  const handleExcuseTypeChange = (selectedExcuseType: string) => {
    setExcuseType(selectedExcuseType); // Set the selected excuseType from SelectExcuseLeave
  };

  const handleStartDateChange = (selectedStartDate: Dayjs | null) => {
    setExcuseStartDate(selectedStartDate); // Set the selected start date from DatePickerValue
  };

  const handleEndDateChange = (selectedEndDate: Dayjs | null) => {
    setExcuseEndDate(selectedEndDate); // Set the selected start date from DatePickerValue
  };


  


  return (
    <div className='page__holder'>
      <SideBar  />
      <Box
          sx={{
            marginTop: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin :'auto',
            paddingLeft: '70px',
          }}
        >
 <Avatar sx={{ m: 1, bgcolor: '#9f5cbe' }}>
            <StickyNote2Icon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ mb: 3 }} >
            İzin İsteği
          </Typography>      
          <SelectExcuseLeave onChange={handleExcuseTypeChange} />

<Grid container spacing={10}  >
              <Grid item xs={1} sm={6}  >
              <DatePickerValue  onChange={handleStartDateChange}  />
              </Grid>
              <Grid item  xs={1} sm={6} >
              <DatePickerFinishValue onChange={handleEndDateChange} />
              </Grid>
      
      
      </Grid>
      <TextField id="description" label="İzin Gerekçesi" variant="outlined"  sx={{margin: 4, width: 400}} multiline
          rows={4} value={description}
          onChange={(e) => setDescription(e.target.value)} />
      <IconLabelButtons 
        excuseType={excuseType}
        excuseStartDate={excuseStartDate}
        excuseEndDate={excuseEndDate}
        description={description}  />
        </Box>
        
      
      
    </div>
  );
}

export default UserAddOffDay;
