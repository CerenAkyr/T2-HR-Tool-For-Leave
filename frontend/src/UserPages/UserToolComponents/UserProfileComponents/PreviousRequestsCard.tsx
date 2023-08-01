import { MDBCol, MDBRow, MDBCard, MDBCardBody, MDBTypography } from 'mdb-react-ui-kit';
import PreviousRequestsTable from './PreviousRequestsTable';

export default function PreviousRequestsCard() {

    return (

        <MDBRow className="justify-content-center align-items-center h-100 mt-4">
            <MDBCol lg="6" className="mb-2 mb-lg-0">
                <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
                    <MDBRow className="g-0">
                        <MDBCardBody className="p-4">
                            <MDBTypography tag="h6" style={{textAlign: "center"}}>Geçmiş İzin Talepleri</MDBTypography>
                            <hr className="mt-0 mb-4" />
                            <PreviousRequestsTable />
                        </MDBCardBody>
                    </MDBRow>
                </MDBCard>
            </MDBCol>
        </MDBRow>
    );
}