import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import "./Components.css";
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Tooltip from '@mui/material/Tooltip';

type props = {
    status: string
}

function MakeVisibleButton({ status }: props) {

    // state to show modal:
    const [show, setShow] = useState(false);
    // function to close modal:
    const handleClose = () => setShow(false);

    const makeVisibleHandler = () => {
        // ToDo: görünür yap
        console.log("görünür yap");
        setShow(false);
    }

    const makeInvisibleHandler = () => {
        // ToDo: görünmez yap
        console.log("görünmez yap");
        setShow(false);
    }

    return (
        <>
            <Tooltip title={status === "Aktif" ? "Pasif hale getir" : "Aktif hale getir"} placement='bottom'>
                <VisibilityOffIcon className="request__button" onClick={() => setShow(true)}
                >Make Visible</VisibilityOffIcon>
            </Tooltip>
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