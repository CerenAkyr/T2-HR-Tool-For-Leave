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


function UserAddOffDay() {
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
<SelectExcuseLeave  />

<Grid container spacing={10}  >
              <Grid item xs={1} sm={6}  >
              <DatePickerValue />
              </Grid>
              <Grid item  xs={1} sm={6} >
              <DatePickerFinishValue />
              </Grid>
      
      
      </Grid>
      
      <IconLabelButtons  />
        </Box>
        
      
      
    </div>
  );
}

export default UserAddOffDay;
