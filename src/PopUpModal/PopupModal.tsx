import React from 'react';
import styles from './index.module.css';

interface PopupModalProps {
    message: string;
    onClose: () => void;
}

const PopupModal: React.FC<PopupModalProps> = ({ message, onClose }) => {
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <p>{message}</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default PopupModal;