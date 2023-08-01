import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";
import Tooltip from '@mui/material/Tooltip';


function EditProfileButton() {
  let navigate = useNavigate();
  const editBtnHandler = () => {
    navigate('/user/edit-profile');
  }
  return (
    <Tooltip title="Profili Düzenle" className='actionBtn' onClick={editBtnHandler} style={{display: "flex"}} placement='top'>
      <EditIcon className='actionBtn' style={{marginLeft: "-52px"}} />
    </Tooltip>
    
  );
}

export default EditProfileButton;