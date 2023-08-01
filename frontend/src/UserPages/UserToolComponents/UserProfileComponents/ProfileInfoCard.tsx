import { MDBCol, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBTypography } from 'mdb-react-ui-kit';
import { useState, useEffect } from 'react';
import PreviousRequestsTable from './PreviousRequestsTable';

export default function ProfileInfoCard() {
    type UserInfo = {
        id: number,
        fname: string,
        lname: string,
        email: string,
        birthday: string,
        gender: string,
        pwd: string,
        totDays: number,
        daysLeft: number
    }
    // state to fetch userInfo:
    const [userInfo, setUserInfo] = useState<UserInfo>();

    // state if fetching fails:
    const [error, setError] = useState<boolean>(false);

    // to show loading animation:
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const token = sessionStorage.getItem('token'); // Replace this with your actual token
            const username = sessionStorage.getItem('username');
            console.log(token);
            setIsLoading(true);
            const response = await fetch('http://localhost:8080/info/' + username, {
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
              setUserInfo(responseData);
              console.log("fetch: ", responseData);
            }
          } catch (e) {
            console.log('Error', e);
          }
        };
    
        fetchData();
      }, []);
    return (

        <MDBRow className="justify-content-center align-items-center h-100 mb-0">
            <MDBCol lg="6" className="mb-4 mb-lg-0">
                <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
                    <MDBRow className="g-0">
                        {userInfo &&
                            <MDBCardBody className="p-4">
                                <MDBTypography tag="h6">Profil Bilgisi</MDBTypography>
                                <hr className="mt-0 mb-4" />
                                <MDBRow className="pt-1">
                                    <MDBCol size="6" className="mb-3">
                                        <MDBTypography tag="h6">Ad Soyad</MDBTypography>
                                        <MDBCardText className="text-muted">{userInfo?.fname + " " + userInfo?.lname}</MDBCardText>
                                    </MDBCol>
                                    <MDBCol size="6" className="mb-3">
                                        <MDBTypography tag="h6">Email</MDBTypography>
                                        <MDBCardText className="text-muted">{userInfo?.email}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow className="pt-1">
                                    <MDBCol size="6" className="mb-3">
                                        <MDBTypography tag="h6">Doğum Günü</MDBTypography>
                                        <MDBCardText className="text-muted">{userInfo?.birthday}</MDBCardText>
                                    </MDBCol>
                                    <MDBCol size="6" className="mb-3">
                                        <MDBTypography tag="h6">Cinsiyet</MDBTypography>
                                        <MDBCardText className="text-muted">{userInfo?.gender}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCardBody>
                        }
                    </MDBRow>
                </MDBCard>
            </MDBCol>
        </MDBRow>
    );
}