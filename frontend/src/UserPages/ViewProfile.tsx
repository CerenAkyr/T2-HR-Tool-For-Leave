import "./UserPages.css";
import ProfileInfo from "./UserToolComponents/UserProfileComponents/ProfileInfo";
import SideBar from "../AdminPages/AdminNavigation/SideBar";
import PreviousRequestsCard from "./UserToolComponents/UserProfileComponents/PreviousRequestsCard";

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