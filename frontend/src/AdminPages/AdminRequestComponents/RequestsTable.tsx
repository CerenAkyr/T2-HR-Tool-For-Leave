import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './RequestsTable.css';
import ApproveButton from './ApproveButton';
import DescriptionButton from './DescriptionButton';
import DeleteRequestButton from './DeleteRequestButton';

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

interface RequestsTableProps {
    requests: requestArray;
  }

function RequestsTable(props: RequestsTableProps) { 
    
    return (
        <div className='requests__table__div'>
            <TableContainer component={Paper}>
                <Table sx={{ width: 650}} aria-label="users table"  >
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Ad</TableCell>
                            <TableCell align="center">Soyad</TableCell>
                            <TableCell align="center">Email</TableCell>
                            <TableCell align="center">İzin Başlangıç Tarihi</TableCell>
                            <TableCell align="center">İzin Bitiş Tarihi</TableCell>
                            <TableCell align="center">Aksiyonlar</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.requests && props.requests.length > 0 && props.requests.map((row: Input) => (
                            <TableRow
                                key={row.requestId}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center" component="th" scope="row">
                                    {row.personnel.firstname}
                                </TableCell>
                                <TableCell align="center" component="th" scope="row">
                                    {row.personnel.lastname}
                                </TableCell>
                                <TableCell align="center">{row.personnel.email}</TableCell>
                                <TableCell align="center">{row.excuseStartDate}</TableCell>
                                <TableCell align="center">{row.excuseEndDate}</TableCell>
                                <TableCell align="center">
                                    <div className='request__button__holder'>
                                        {row.requestStatus === "Pending" && <ApproveButton requestID={row.requestId}/>}
                                        {row.requestStatus === "Pending" && <DeleteRequestButton requestID={row.requestId}/>}
                                        {/*<DescriptionButton startDate={row.excuseStartDate} endDate={row.excuseEndDate} status={row.requestStatus} reason={row./>*/}
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )

}

export default RequestsTable;