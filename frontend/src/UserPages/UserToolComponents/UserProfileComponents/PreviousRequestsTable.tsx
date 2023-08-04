import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import "./Profile.css";
import { useState, useEffect } from 'react';

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

type previousRequestArray = Input[];

function PreviousRequestsTable() {
    
    // state to fetch users:
    const [requests, setRequests] = useState<previousRequestArray>([]);

    // state if fetching fails:
    const [error, setError] = useState<boolean>(false);

    // to show loading animation:
    const [isLoading, setIsLoading] = useState<boolean>(false);

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
    

    return (
        <div className='profile__table__div'>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>Başlama Tarihi</TableCell>
                            <TableCell align="center">Bitiş Tarihi</TableCell>
                            <TableCell align="center">Durum</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {requests.map((row) => (
                            <TableRow
                                key={row.requestId}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" align='center'>
                                    {new Date(row.excuseStartDate).toLocaleDateString('en-GB')}
                                </TableCell>
                                <TableCell align="center">{new Date(row.excuseEndDate).toLocaleDateString('en-GB')}</TableCell>
                                <TableCell align="center" style={{color: row.requestStatus === 'Pending' ? 'orange' : 
                                    row.requestStatus === 'Approved' ? 'green' : 
                                    row.requestStatus === 'Rejected' ? 'red' : row.requestStatus}}>
                                    {row.requestStatus === 'Pending' ? 'Bekliyor' : 
                                    row.requestStatus === 'Approved' ? 'Onaylandı' : 
                                    row.requestStatus === 'Rejected' ? 'Reddedildi' : row.requestStatus}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default PreviousRequestsTable;