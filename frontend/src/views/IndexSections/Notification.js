import { Modal, Label } from 'reactstrap';
import { useState, useEffect, React } from 'react'
const NotificationModal = ({ isOpen, content }) => {

    
    const [successModal, setSuccessModal] = useState(false);

    useEffect(() => {
        setSuccessModal(isOpen)
    }, [isOpen])
    
    useEffect(() => {
        if (successModal) {
            const timer = setTimeout(() => {
                setSuccessModal(false);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [successModal]);

    return (
        <Modal isOpen={successModal} toggle={() => setSuccessModal(false)} >
            <div className="modal-header">
                <button className="close" onClick={() => setSuccessModal(false)}>
                    <i className="tim-icons icon-simple-remove" />
                </button>
                <h4 className="title" style={{ paddingBottom: '4%' }}><Label>{content}</Label></h4>
            </div>
        </Modal>
    );
};

export default NotificationModal;