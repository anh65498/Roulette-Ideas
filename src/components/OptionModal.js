import React from "react"
import Modal from 'react-modal';

const OptionModal = (props) => {
    return (
    <div>
        <Modal
            isOpen={!!props.selectedOption}     // condition to open the modal
            onRequestClose={props.handleClearSelectedOption}       // fire this function when user try to close the modal
            contentLabel="Selected Option"
            // closeTimeoutMS={200}        // wait 200 ms to fade the modal out before closing it
            className="modal"
        >
        <h3 className="modal__title">Selected Option</h3>
        {props.selectedOption && <p className="modal__body">{props.selectedOption}</p>}
        <button 
            onClick={props.handleRemoveSelectedOption}
            className="button" 
        >
            Got it!
        </button>
        </Modal>
    </div>
    );
}

export default OptionModal;