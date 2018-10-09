import React from 'react';
import PropTypes from 'prop-types';

const Modal = ({
  toggleModal, show, title, children, edit, styles,
}) => (
  <div className={show ? `modal-main display-block ${styles}` : 'display-none'}>
    {edit ?
      <button className="closing-icon" onClick={toggleModal}>&times;</button>
      :
      <div className="modal-header">
        <h2>{title}</h2>
        <button className="close-icon" onClick={toggleModal}>&times;</button>
      </div>
    }
    <section className="">
      {children}
    </section>
  </div>
);

Modal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.shape({}).isRequired,
  edit: PropTypes.bool.isRequired,
  styles: PropTypes.string.isRequired,
};

export default Modal;
