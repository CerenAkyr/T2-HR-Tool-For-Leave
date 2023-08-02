import "./Profile.css";
import LockIcon from '@mui/icons-material/Lock';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from "react-router-dom";

function ChangePasswordButton() {

    let navigate = useNavigate();
    const pwdChangeHandler = () => {
        navigate('/user/change-password');
    }

    return (
        <Tooltip title="Şifre Değiştir" className='actionBtn' onClick={pwdChangeHandler} style={{ display: "flex" }} placement="top">
            <LockIcon className='actionBtn' style={{ marginLeft: "-52px" }} />
        </Tooltip>
    )
}

export default ChangePasswordButton;