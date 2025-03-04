import React from "react";
import "./Modal.css";

const GenericModal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null; // Hide if not open

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h5>{title}</h5>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};

export default GenericModal;
