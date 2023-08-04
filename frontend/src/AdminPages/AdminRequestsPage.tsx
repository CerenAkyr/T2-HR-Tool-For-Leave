import FilterComponent from "./AdminRequestComponents/FilterComponent";
import RequestsTable from "./AdminRequestComponents/RequestsTable";
import { useEffect, useState } from "react";
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import StickyFooter from "../StickyFooter";
import SideBar from "./AdminNavigation/SideBar";




function AdminRequestsPage() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#1392c2',
      },
    },
  });
  type Input = {

    personnel: Personnel, 
    requestId: number,
    excuseStartDate: string,
    excuseEndDate: string,
    excuseType: string,
    requestStatus: string,
    
    
}

type Personnel = {
    firstname: string,
    lastname: string,
    email: string,
    username: string,

}


  type requestArray = Input[];

  // state to fetch requests:
  const [requests, setRequests] = useState<requestArray>([]);
  // state if fetching fails:
  const [error, setError] = useState<boolean>(false);
  // to show loading animation:
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // state for filtered requests:
  const [filteredRequests, setFilteredRequests] = useState<requestArray>(requests);

  // to show loading animation:
  


  //console.log(sessionStorage.getItem('token'));
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem('token'); // Replace this with your actual token
        console.log(token);
        setIsLoading(true);
        const response = await fetch('http://localhost:8080/api/pendingrequests', {
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
          setRequests(responseData);
        }
      } catch (e) {
        console.log('Error', e);
      }
    };

    fetchData();
  }, []);


  useEffect(
    () => {
      console.log("requests: ");
    console.log(requests);
      setFilteredRequests(requests.filter((request) => request.requestStatus === "Pending"));
    }, [requests]
  )


  // function for filtering requests:
  const filterRequests = (filter: string) => {
    if (filter === "Pending") {
      const filteredRequestsVar = requests.filter((request) => request.requestStatus === "Pending");
      setFilteredRequests(filteredRequestsVar);
    } else if (filter === "Approved") {
      const filteredRequestsVar = requests.filter((request) => request.requestStatus === "Approved");
      setFilteredRequests(filteredRequestsVar);
    } else if (filter === "Rejected") {
      const filteredRequestsVar = requests.filter((request) => request.requestStatus === "Rejected");
      setFilteredRequests(filteredRequestsVar);
    } else if (filter === "All") {
      setFilteredRequests(requests);
    }
    console.log("filter: " , filter);
    console.log("filteredReqs: ", filteredRequests);
  }

  const [filter, setFilter] = useState<string>("Pending");

  const filterHandler = (value: string) => {
    setFilter(value);
    filterRequests(value)
    console.log(value);
  }


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="page__holder">
        <SideBar />
        <Container component="main"  >
          <Box
            sx={{
              marginTop: "4vh",
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              ml: 13

            }}
          >
            <Avatar sx={{ m: 1, bgcolor: '#9f5cbe' }}>
              <StickyNote2Icon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ mb: 3 }} >
              Kullanıcı İzin İstek Listesi
            </Typography>
            <FilterComponent filterHandler={filterHandler} />
            <RequestsTable requests={filteredRequests} />
            {error && !isLoading && <Alert severity="error" sx={{ mt: 3 }} >Bir şeyler ters gitti. Lütfen sonra tekrar deneyin.</Alert>}
            {!isLoading && !error && filteredRequests && filteredRequests.length <= 0 && <Alert severity="info" sx={{ mt: 3 }}>Gösterilecek istek bulunmamaktadır.</Alert>}
          </Box>
        </Container>

        <StickyFooter />
      </div>
    </ThemeProvider>
  );
}

export default AdminRequestsPage;