import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { BoxContext } from './BoxContext';

const BoxModal = () => {
    const { box, setBox } = useContext(BoxContext);
    
    const onClose = () => {
        setBox({ ...box, show: false });
    }

    const onPrimary = () => {
        box.action();
        onClose();
    }

    return (
        <>
            <Modal
                show={ box.show }
                onHide={ onClose }
                backdrop="static"
                keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>알림</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    { box.message }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={ onClose }>
                        { box.action ? '아니오' : '확인' }
                    </Button>
                { box.action &&
                    <Button variant="primary" onClick={ onPrimary }>예</Button>
                }
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default BoxModal