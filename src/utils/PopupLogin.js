import React, { useState, useEffect } from 'react';

const NewVersionModal = () => {
    const [showModal, setShowModal] = useState(true);

    // Close the modal when the close button is clicked
    const handleCloseModal = () => {
        setShowModal(false);
    };

    // Render the modal only if showModal is true
    if (!showModal) return null;

    return (
        <div style={modalOverlayStyles}>
            <div style={modalStyles}>
                <h2>New Version Available!</h2>
                <p style={{fontWeight:'600'}}>This is the new version of the District Incharge Secretaries Portal.</p>
                <a href="./assets/DIS_USER_MANUAL.pdf" target="_blank" rel="noopener noreferrer">
                    Click here to view the user manual
                </a>
                <br />
                <button onClick={handleCloseModal} style={closeButtonStyles}>
                    Close
                </button>
            </div>
        </div>
    );
};

// Inline styles for modal and overlay
const modalOverlayStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex:'9999'
};

const modalStyles = {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    width: '400px',
    textAlign: 'center',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
};

const closeButtonStyles = {
    marginTop: '20px',
    backgroundColor: 'rgb(238, 77, 77)',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
};

export default NewVersionModal;
