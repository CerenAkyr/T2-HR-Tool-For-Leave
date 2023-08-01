import "./UserPages.css";
import CalendarForLeave from "../AdminPages/AdminToolComponents/CalendarForLeave";
import Avatar from '@mui/material/Avatar';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SideBar from "../AdminPages/AdminNavigation/SideBar";


function ViewOffDays() {
  return (
    <div className="page__holder">
      <SideBar />
        <Box
          sx={{
            marginTop: "4vh",
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#9f5cbe', ml: 22 }}>
            <CalendarMonthOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ mb: -3, ml: 20 }} >
            İzin Takvimi
          </Typography>
        </Box>

        <div className="calendar__holder" style={{ marginLeft: "250px" }}>
          <CalendarForLeave />
        </div>
    </div>
        );
}

        export default ViewOffDays;







