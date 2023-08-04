import "./UserPages.css";
import CalendarForLeave from "../AdminPages/AdminToolComponents/CalendarForLeave";
import Avatar from '@mui/material/Avatar';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


function ViewOffDays() {
  return (
    <div>
      <Box
        sx={{
          width: '100vw',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          margin: 'auto',
          textAlign: 'center',
          marginTop: "4vh",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: '#9f5cbe', ml: 22 }}>
          <CalendarMonthOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ mb: -3, ml: 20 }} >
          İzin Takvimi
        </Typography>
      </Box>

      <div className="calendar__holder">
        <CalendarForLeave />
      </div>
    </div>
  );
}

export default ViewOffDays;







