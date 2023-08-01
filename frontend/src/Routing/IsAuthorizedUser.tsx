import { useLocation, Navigate, Outlet } from 'react-router-dom';

function IsAuthorizedUser() {

    const username = sessionStorage.getItem('username');
    const location = useLocation();

    return (
        <div>
            {username && <Outlet /> }
            {!username && <Navigate to="/" state={{from: location}} replace />}
        </div>
    );
}

export default IsAuthorizedUser;