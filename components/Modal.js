import React from "react";
import { Modal } from "react-native";

const MyModal = ({ children, visible, animationType, onRequestClose}) => {
    return (
        <Modal
            animationType={animationType}
            visible={visible}
            onRequestClose={onRequestClose}
        >
            {children}
        </Modal>
    )
}

export {MyModal}

