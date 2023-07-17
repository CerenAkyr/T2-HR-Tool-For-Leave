import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditActionButton from './EditActionButton';
import DeleteIconButton from './DeleteIconButton';
import Alert from '@mui/material/Alert';
import { useState, useEffect } from 'react';
import './Components.css';

function ListUsersTable() {

    type User = {
        fname: string,
        lname: string,
        email: string,
        birthDate: string,
        gender: string
    }
    // state to fetch users:
    const [users, setUsers] = useState([] as User[]);

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

    return (
        <div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="users table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Ad</TableCell>
                            <TableCell align="center">Soyad</TableCell>
                            <TableCell align="center">Email</TableCell>
                            <TableCell align="center">Doğum Tarihi</TableCell>
                            <TableCell align="center">Cinsiyet</TableCell>
                            <TableCell align="center"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users && !error && users.length > 0 && users.map((row: User) => (
                            <TableRow
                                key={row.email}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center" component="th" scope="row">
                                    {row.fname}
                                </TableCell>
                                <TableCell align="center" component="th" scope="row">
                                    {row.lname}
                                </TableCell>
                                <TableCell align="center">{row.email}</TableCell>
                                <TableCell align="center">{row.birthDate}</TableCell>
                                <TableCell align="center">{row.gender}</TableCell>
                                <TableCell align="center">
                                    <div className='request__button__holder'>
                                        <EditActionButton /> <DeleteIconButton />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                {error && !isLoading &&
                    <Alert severity="error">Something went wrong. Please try again.</Alert>
                }
                {!isLoading && !error && users && users.length <= 0 &&
                    <Alert severity="info">No user to show! Please register users first.</Alert>
                }
            </TableContainer>
        </div>
    );
}

export default ListUsersTable;