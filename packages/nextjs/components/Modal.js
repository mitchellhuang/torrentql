import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({
  active,
  toggle,
  title,
  children,
}) => active ? ReactDOM.createPortal(
  <div className="modal">
    <a
      className="modal-overlay"
      onClick={toggle}
      aria-label="Close"
    />
    <div className="modal-container">
      <div className="modal-header">
        <h3>{title}</h3>
        <a
          className="modal-close-button"
          onClick={toggle}
          aria-label="Close"
        />
      </div>
      <div>
        {children}
      </div>
    </div>
    <style jsx>{`
      .modal {
        display: flex;
        align-items: center;
        justify-content: center;
        bottom: 0;
        left: 0;
        right: 0;
        top: 0;
        overflow: hidden;
        position: fixed;
        z-index: 400;
      }
      .modal-overlay {
        display: block;
        background: rgba(0, 0, 0, .25);
        cursor: default;
        bottom: 0;
        left: 0;
        position: absolute;
        right: 0;
        top: 0;
      }
      .modal-container {
        display: flex;
        flex-direction: column;
        background-color: #fff;
        border-radius: 5px;
        max-height: 75vh;
        max-width: 550px;
        padding: 15px;
        width: 100%;
        overflow: auto;
        z-index: 1;
      }
      .modal-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 15px;
      }
      .modal-close-button {
        padding: 5px;
        font-size: 20px;
      }
      .modal-close-button::before {
        content: "\\2715";
      }
    `}</style>
  </div>,
  document.getElementById('modal-root'),
) : null;

export default Modal;
