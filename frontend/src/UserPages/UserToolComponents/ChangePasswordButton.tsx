import "./Profile.css";
import LockIcon from '@mui/icons-material/Lock';
import Tooltip from '@mui/material/Tooltip';

function ChangePasswordButton() {

    const pwdChangeHandler = () => {
        console.log("Change Password Button Clicked")
    }

    return (
        <Tooltip title="Şifre Değiştir" className='actionBtn' onClick={pwdChangeHandler} style={{ display: "flex" }} placement="top">
            <LockIcon className='actionBtn' style={{ marginLeft: "-52px" }} />
        </Tooltip>
    )
}

export default ChangePasswordButton;