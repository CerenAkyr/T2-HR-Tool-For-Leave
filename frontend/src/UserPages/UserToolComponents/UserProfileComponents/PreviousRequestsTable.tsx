import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import "./Profile.css";
import { useState, useEffect } from 'react';

function PreviousRequestsTable() {
    type Requests = {
        id: number,
        startDate: string,
        endDate: string,
        status: string,
    }
    // state to fetch users:
    const [requests, setRequests] = useState([] as Requests[]);

    // state if fetching fails:
    const [error, setError] = useState<boolean>(false);

    // to show loading animation:
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            try {
                const response = await fetch('http://localhost:3001/user/get-request');
                if (!response.ok) {
                    console.log("hataaaaaa")
                }
                const data = await response.json();
                setRequests(data);
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
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" align='center'>
                                    {row.startDate}
                                </TableCell>
                                <TableCell align="center">{row.endDate}</TableCell>
                                <TableCell align="center">{row.status}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default PreviousRequestsTable;