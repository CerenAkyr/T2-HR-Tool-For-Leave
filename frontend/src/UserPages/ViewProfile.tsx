import "./UserPages.css";
import ProfileInfo from "./UserToolComponents/ProfileInfo";
import { Tabs } from 'antd';
import PreviousRequestsTable from "./UserToolComponents/PreviousRequestsTable";
import SideBar from "../AdminPages/AdminNavigation/SideBar";
import Box from '@mui/material/Box';
import PreviousRequestsCard from "./UserToolComponents/PreviousRequestsCard";

function ViewProfile() {


    return (
        <div className="page__holder"  >
            <SideBar />
            <div className="profile__elements">
                <ProfileInfo />
                <PreviousRequestsCard />
            </div>
            
            

        </div>
    );
}

export default ViewProfile;

