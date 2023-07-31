import "./AdminPages.css";
import ListUsersTable from "./AdminToolComponents/ListUsersTable";
import Avatar from '@mui/material/Avatar';
import RecentActorsOutlinedIcon from '@mui/icons-material/RecentActorsOutlined';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import FilterUsers from "./AdminToolComponents/FilterUsers";
import { useState, useEffect } from 'react';
import StickyFooter from "../StickyFooter";
import SideBar from "./AdminNavigation/SideBar";

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://www.t2.com.tr">
        T2 YAZILIM
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function AdminListUsersPage() {

  const theme = createTheme({
    palette: {
      primary: {
        main: '#1392c2',
      },
    },
  });

  type User = {
    fname: string,
    lname: string,
    email: string,
    birthDate: string,
    gender: string,
    status: string
  }

  // state to fetch users:
  const [users, setUsers] = useState<User[]>([]);

  // state if fetching fails:
  const [error, setError] = useState<boolean>(false);

  // to show loading animation:
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const response = await fetch('http://localhost:3001/admin/users');
        if (!response.ok) {
          console.log("hataaaaaa")
        }
        const data = await response.json();
        setUsers(data);
        console.log(data);
        setIsLoading(false)
        setError(false)
      } catch (error) {
        setError(true)
        setIsLoading(false)
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setFilteredUsers(users.filter((user) => user.status === "visible")
    )
  }, [users])

  // state for filtering users:
  const [filter, setFilter] = useState<string>('visible');
  const [filteredUsers, setFilteredUsers] = useState<User[]>(users);

  const filterHandler = (filter: string) => {
    setFilter(filter);
    console.log(filter);
    filterUsers(filter)
  }

  // function for filtering requests:
  const filterUsers = (filter: string) => {
    if (filter === "visible") {
        const filteredRequestsVar = users.filter((user) => user.status === "visible");
        setFilteredUsers(filteredRequestsVar);
    } else if (filter === "invisible") {
        const filteredRequestsVar = users.filter((user) => user.status === "invisible");
        setFilteredUsers(filteredRequestsVar);
    } else if (filter === "all") {
      setFilteredUsers(users);
    }
}

  return (
    <ThemeProvider theme={theme}>
      <div className="page__holder">
      <SideBar />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: "4vh",
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            ml: 13,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#9f5cbe' }}>
            <RecentActorsOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ mb: 3 }} >
            Kullanıcı Listesi
          </Typography>

          <FilterUsers filterHandler={filterHandler} />

          <ListUsersTable users={filteredUsers}  />
          {error && !isLoading &&
            <Alert severity="error" sx={{ mt: 3 }}>Bir şeyler ters gitti. Lütfen sonra tekrar deneyin.</Alert>
          }
          {!isLoading && !error && filteredUsers && filteredUsers.length <= 0 &&
            <Alert severity="info" sx={{ mt: 3 }}>Gösterilecek kullanıcı bulunmamaktadır. </Alert>
          }


        </Box>
        
      </Container>
      <StickyFooter />
      </div>
    </ThemeProvider>
  );
}




export default AdminListUsersPage;

