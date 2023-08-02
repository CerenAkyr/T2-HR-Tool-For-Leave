import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import "./Components.css";
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Tooltip from '@mui/material/Tooltip';

type props = {
    status: string
    username: string
}

function MakeVisibleButton({ status, username }: props) {

    // state to show modal:
    const [show, setShow] = useState(false);
    // function to close modal:
    const handleClose = () => setShow(false);

    const makeVisibleHandler = () => {
        const token = sessionStorage.getItem("token");
        fetch("http://localhost:8080/active/" + username, {
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

    const makeInvisibleHandler = () => {
        const token = sessionStorage.getItem("token");
        fetch("http://localhost:8080/passive/" + username, {
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

    return (
        <>
            {status === "Aktif" &&
                <Tooltip title="Pasif hale getir" placement='bottom'>
                    <VisibilityOffIcon className="request__button" onClick={() => setShow(true)}>
                        Make Visible
                    </VisibilityOffIcon>
                </Tooltip>}
            {status === "Pasif" &&
                <Tooltip title="Aktif hale getir" placement='bottom'>
                    <VisibilityIcon className="request__button" onClick={() => setShow(true)}>
                        Make Visible
                    </VisibilityIcon>
                </Tooltip>
            }
            {status === "Aktif" &&
                <Modal
                    show={show}
                    onHide={handleClose}
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Kullanıcıyı Görünmez Yapma</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Bu kullanıcıyı görünmez yapmak istediğinize emin misiniz?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Hayır</Button>
                        <Button variant="primary" onClick={makeInvisibleHandler}>Evet</Button>
                    </Modal.Footer>
                </Modal>
            }
            {status === "Pasif" &&
                <Modal
                    show={show}
                    onHide={handleClose}
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Kullanıcıyı Görünür Yapma</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Bu kullanıcıyı görünür yapmak istediğinize emin misiniz?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Hayır</Button>
                        <Button variant="primary" onClick={makeVisibleHandler}>Evet</Button>
                    </Modal.Footer>
                </Modal>
            }
        </>
    )
}

export default MakeVisibleButton;