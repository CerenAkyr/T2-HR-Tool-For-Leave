import SideBar from "../AdminPages/AdminNavigation/SideBar";
import "./UserPages.css";
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from 'dayjs';
import Alert from '@mui/material/Alert';
import Loading from "../AdminPages/AdminToolComponents/Loading";
import EditUserForm from "../AdminPages/AdminToolComponents/AdminEditUserComponents/EditUserForm";

interface User {
    username: string,
    firstname: string,
    lastname: string,
    email: string,
    gender: string,
    birthday: Dayjs,  
    activity: string,
}

function EditProfile() {
    // get username from token:
    const username = sessionStorage.getItem("username");
    // states for fetching:
    const [user, setUser] = useState<User>({ username: "", firstname: "", lastname: "", email: "", gender: "", birthday: dayjs('1999-05-01'), activity: ""});
    const [error, setError] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // fetch the user with uid from the database:
    useEffect(() => {
        const fetchData = async () => {
          try {
            const token = sessionStorage.getItem('token');
            console.log(token);
            setIsLoading(true);
            const response = await fetch('http://localhost:8080/info/' + username, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
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
              setUser(responseData);
              console.log("fetch: ", responseData);
            }
          } catch (e) {
            console.log('Error', e);
          }
        };
        fetchData();
      }, []);

    return (
        <div className="page__holder">
            <SideBar />
            {error && <Alert severity="error">Kullanıcı bilgileri alınamadı!</Alert>}
            {isLoading && <Loading />}
            {!error && !isLoading &&  <EditUserForm user={user} usernameOfEdit={username}/>}
        </div>
    )
}

export default EditProfile;