import NavigationBarUser from "./UserToolComponents/NavigationBarUser";
import "./UserPages.css";
import CalendarForLeave from "../AdminPages/AdminToolComponents/CalendarForLeave";
import StickyFooter from "../StickyFooter";
import UserSideBar from "./UserSideBar/UserSideBar";
import Avatar from '@mui/material/Avatar';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


function ViewOffDays() {
    return(
        <div className="page__holder">
            <UserSideBar />
            <div>
        <Box
          sx={{
            marginTop: "4vh",
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#9f5cbe' }}>
            <CalendarMonthOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ mb: -3 }} >
            İzin Takvimi
          </Typography>
        </Box>

        <div className="calendar__holder">
          <CalendarForLeave />
        </div>

        
      </div>
            
          
        </div>
        
    );
}

export default ViewOffDays;




  

  
