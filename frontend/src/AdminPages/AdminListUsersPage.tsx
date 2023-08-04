import "./AdminPages.css";
import ListUsersTable from "./AdminToolComponents/ListUsersTable";
import Avatar from '@mui/material/Avatar';
import RecentActorsOutlinedIcon from '@mui/icons-material/RecentActorsOutlined';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import FilterUsers from "./AdminToolComponents/FilterUsers";
import { useState, useEffect } from 'react';
import StickyFooter from "../StickyFooter";
import SideBar from "./AdminNavigation/SideBar";
import PeopleIcon from '@mui/icons-material/People';

function AdminListUsersPage() {

  const theme = createTheme({
    palette: {
      primary: {
        main: '#1392c2',
      },
    },
  });

  type User = {
    firstname: string,
    lastname: string,
    username: string,
    birthday: Date,
    gender: string,
    activity: string,
    email: string,
  }

  // state to fetch users:
  const [users, setUsers] = useState<User[]>([]);

  // state if fetching fails:
  const [error, setError] = useState<boolean>(false);

  // to show loading animation:
  const [isLoading, setIsLoading] = useState<boolean>(false);


  //console.log(sessionStorage.getItem('token'));
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem('token'); // Replace this with your actual token
        console.log(token);
        setIsLoading(true);
        const response = await fetch('http://localhost:8080/api/users', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`, // Add the Bearer token to the Authorization header
          },
        });

        if (response.status === 401) {
          console.log('Authentication failed: Invalid credentials');
          setError(true);
          setIsLoading(false);
        } else if (!response.ok) {
          setError(true);
          setIsLoading(false);
          console.log(`Error! status: ${response.status}`);
        } else {
          setError(false);
          setIsLoading(false);
          const responseData = await response.json();
          setUsers(responseData);
        }
      } catch (e) {
        console.log('Error', e);
      }
    };

    fetchData();
  }, []);

  //----------------------FILTERING USERS----------------------//

  useEffect(() => {
    console.log("users: ");
    console.log(users);

    setFilteredUsers(users.filter((user) => user.activity === "Aktif")
    )

    console.log("filteredUsers: ");
    console.log(filteredUsers);
  }, [users])

  // state for filtering users:
  const [filter, setFilter] = useState<string>('Aktif');
  const [filteredUsers, setFilteredUsers] = useState<User[]>(users);

  const filterHandler = (filter: string) => {
    setFilter(filter);
    console.log(filter);
    filterUsers(filter)
  }

  // function for filtering users:
  const filterUsers = (filter: string) => {
    if (filter === "Aktif") {
      const filteredRequestsVar = users.filter((user) => user.activity === "Aktif");
      setFilteredUsers(filteredRequestsVar);
    } else if (filter === "Pasif") {
      const filteredRequestsVar = users.filter((user) => user.activity === "Pasif");
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
              <PeopleIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ mb: 3 }} >
              Kullanıcı Listesi
            </Typography>

            <FilterUsers filterHandler={filterHandler} />

            <ListUsersTable users={filteredUsers} />
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

