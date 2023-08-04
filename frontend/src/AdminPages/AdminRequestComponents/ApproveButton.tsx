import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import "./RequestsTable.css";
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

type approveProps = {
    requestID: number,
}
function ApproveButton(  {requestID}:approveProps  ) {
    const approveRequestHandler = () => {
        const token = sessionStorage.getItem("token");
        console.log(requestID);
        fetch("http://localhost:8080/api/accept/" + requestID, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: 'application/json',
                Authorization: `Bearer ${token}`, // Add the Bearer token to the Authorization header
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
            });
        setShow(false);
        window.location.reload()
    }

    // mouse ile üstüne gelince yazı göstermek için:
    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    // state to show modal:
    const [show, setShow] = useState(false);
    // function to close modal:
    const handleClose = () => setShow(false);

    const [isHovered, setIsHovered] = useState<boolean>(false);

    return (
        <div>
            <CheckCircleOutlineIcon className="request__button" onClick={() => setShow(true)}
                onMouseEnter={() => handleMouseEnter()}
                onMouseLeave={() => handleMouseLeave()}
            >Approve</CheckCircleOutlineIcon>
            {isHovered === true ? <div className='request__button__hover__p'>Onayla</div> : ""}
            <Modal
                    show={show}
                    onHide={handleClose}
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>İzin Onayı</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Bu izni onaylamak istediğinize emin misiniz?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Hayır</Button>
                        <Button variant="primary" onClick={approveRequestHandler}>Evet</Button>
                    </Modal.Footer>
                </Modal>
        </div>
    )
}

export default ApproveButton