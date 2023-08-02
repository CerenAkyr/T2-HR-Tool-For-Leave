import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditActionButton from './EditActionButton';
import './Components.css';
import MakeVisibleButton from './MakeVisibleButton';

type User = {
    firstname: string,
    lastname: string,
    username: string,
    birthday: Date,
    gender: string,
    activity: string,
    email: string,
  }

interface UserProps {
    users: User[],
}

function ListUsersTable( { users }: UserProps ) {

    return (
        <div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 800 }} aria-label="users table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Ad</TableCell>
                            <TableCell align="center">Soyad</TableCell>
                            <TableCell align="center">Email</TableCell>
                            <TableCell align="center">Doğum Tarihi</TableCell>
                            <TableCell align="center">Cinsiyet</TableCell>
                            <TableCell align="center">Aksiyonlar</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users && users.length > 0 && users.map((row: User) => (
                            <TableRow
                                key={row.username}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center" component="th" scope="row">
                                    {row.firstname}
                                </TableCell>
                                <TableCell align="center" component="th" scope="row">
                                    {row.lastname}
                                </TableCell>
                                <TableCell align="center">{row.email}</TableCell>
                                <TableCell align="center">{row.birthday.toString()}</TableCell>
                                <TableCell align="center">{row.gender}</TableCell>
                                <TableCell align="center">
                                    <div className='request__button__holder'>
                                        <EditActionButton username={row.username}/> <MakeVisibleButton status={row.activity} username={row.username}/>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default ListUsersTable;