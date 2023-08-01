import { useLocation, Navigate, Outlet } from 'react-router-dom';
import './Layout.css';
import SideBar from '../AdminPages/AdminNavigation/SideBar';
function IsAuthorizedUser() {
    const username = sessionStorage.getItem('username');
    const location = useLocation();

    return (
        <div>
            {username ?
                (<div className='layout'>
                    <SideBar />
                    <main>
                        <Outlet />
                    </main>
                </div>)
                :
                <Navigate to="/" state={{ from: location }} replace />
            }
        </div>
    );
}

export default IsAuthorizedUser;