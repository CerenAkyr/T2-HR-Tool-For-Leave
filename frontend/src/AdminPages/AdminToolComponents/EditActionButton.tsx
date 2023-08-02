import EditIcon from '@mui/icons-material/Edit';
import "./Components.css";
import { useNavigate } from "react-router-dom";
import Tooltip from '@mui/material/Tooltip';

type editProps = {
  username: string,
}
function EditActionButton( {username}:editProps ) {

  // edit:
  // ToDO: sonradan 1 yerine id no yaz asko
  let navigate = useNavigate();
  console.log(username);
  const editBtnHandler = () => {
    navigate('/admin/edit/' + username);
  }


  return (

    <Tooltip title={"Düzenle"} placement="bottom">
      <EditIcon onClick={editBtnHandler} className='actionBtn'/>
    </Tooltip>
  );
}

export default EditActionButton;