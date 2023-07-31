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
        setShow(true);
    }

    // mouse ile üstüne gelince yazı göstermek için:
    const [isHovered, setIsHovered] = useState<boolean>(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <>
            <Tooltip title={status === "Aktif" ? "Pasif hale getir" : "Aktif hale getir"} placement='bottom'>
                <VisibilityOffIcon className="request__button" onClick={makeVisibleHandler}
                >Make Visible</VisibilityOffIcon>
            </Tooltip>
            {status === "Aktif" &&
                <Modal
                    show={show}
                    onHide={handleClose}
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Kullanıcıyı Görnmez Yapma</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Bu kullanıcıyı görünmez yapmak istediğinize emin misiniz?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Hayır</Button>
                        <Button variant="primary" onClick={makeVisibleHandler}>Evet</Button>
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