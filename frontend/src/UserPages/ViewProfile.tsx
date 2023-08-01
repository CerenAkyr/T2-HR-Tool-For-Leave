import "./UserPages.css";
import ProfileInfo from "./UserToolComponents/UserProfileComponents/ProfileInfo";
import SideBar from "../AdminPages/AdminNavigation/SideBar";
import PreviousRequestsCard from "./UserToolComponents/UserProfileComponents/PreviousRequestsCard";

function ViewProfile() {
    return (
            <div>
                <ProfileInfo />
                <PreviousRequestsCard />
            </div>
    );
}

export default ViewProfile;