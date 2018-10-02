import React from 'react';

const Modal = ({
  toggleModal, show, title, children,
}) => (
  <div className={show ? 'modal-main display-block black' : 'display-none'}>
    <div className="modal-header center-header">
      <h2>{title}</h2>
      <button className="close-icon" onClick={toggleModal}>&times;</button>
    </div>
    <section className="">
      {children}
    </section>
  </div>
);

export default Modal;
