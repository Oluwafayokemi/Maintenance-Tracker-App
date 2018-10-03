import React from 'react';

const Modal = ({
  toggleModal, show, title, children, styles, font, edit,
}) => (
  <div className={show ? `modal-main display-block ${styles}` : 'display-none'}>
    {
        edit
          ?
            <button className="closing-icon" onClick={toggleModal}>&times;</button>
          :
            <div className="modal-header">
              <h2 className={font}>{title}</h2>
              <button className="close-icon" onClick={toggleModal}>&times;</button>
            </div>
      }

    <section>
      {children}
    </section>
  </div>
);

export default Modal;
