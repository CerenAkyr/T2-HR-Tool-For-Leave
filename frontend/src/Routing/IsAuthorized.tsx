import { useLocation, Navigate, Outlet } from 'react-router-dom';

function IsAuthorized() {

    const role = sessionStorage.getItem('role');
    const username = sessionStorage.getItem('username');
    console.log("testing vars: " + role + " " + username);
    const location = useLocation();

    return (
        <div>
            {username && (role === "ROLE_ADMIN" ? <Outlet /> : <Navigate to="/unauthorized" state={{from: location}} replace />)}
            {!username && <Navigate to="/login" state={{from: location}} replace />}
        </div>
    );


}

export default IsAuthorized;