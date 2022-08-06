import React from 'react';
import styles from './modal.module.css';
import { BsFillXCircleFill } from "react-icons/bs";
import { useEffect } from 'react';

const Modal = ({ children, isOpen, setIsOpen, title }) => {
    useEffect(() => {
        const handleEsc = (event) => {
            if (event.keyCode === 27) {
                setIsOpen(false)
            }
        };
        window.addEventListener('keydown', handleEsc);
    });

    if (!isOpen) {
        return null;
    }

    return (
        <div className={styles.overlay}>
        <div className={styles.contenedorModal}>
            <div className={styles.modalHeader}>
            <h3>{title}</h3>
            <button
                className={styles.buttonCloseModal}
                onClick={() => setIsOpen(false)}
                >
                <BsFillXCircleFill />
                </button>
            </div>
            {children}
        </div>
        </div>
    );
};

export default Modal;