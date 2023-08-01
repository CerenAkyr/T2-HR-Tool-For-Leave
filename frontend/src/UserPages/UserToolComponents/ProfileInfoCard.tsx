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
            setIsLoading(true)
            try {
                const response = await fetch('http://localhost:3001/user/profile-info');
                if (!response.ok) {
                    console.log("hataaaaaa")
                }
                const data = await response.json();
                setUserInfo(data);
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