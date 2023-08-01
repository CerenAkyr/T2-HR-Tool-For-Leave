import { MDBCol, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBTypography } from 'mdb-react-ui-kit';
import { useState, useEffect } from 'react';
import PreviousRequestsTable from './PreviousRequestsTable';

export default function PreviousRequestsCard() {

    return (

        <MDBRow className="justify-content-center align-items-center h-100 mt-4">
            <MDBCol lg="6" className="mb-4 mb-lg-0">
                <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
                    <MDBRow className="g-0">
                        <MDBCardBody className="p-4">
                            <MDBTypography tag="h6">Geçmiş İzin Talepleri</MDBTypography>
                            <hr className="mt-0 mb-4" />
                            <PreviousRequestsTable />
                        </MDBCardBody>
                    </MDBRow>
                </MDBCard>
            </MDBCol>
        </MDBRow>
    );
}