import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../../../common/Modal';

export default class DetailsModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      edit: true,
    };
  }

  toggleModal = () => () => {
    this.setState(prevState => ({
      show: !prevState.show,
    }));
  }

  render() {
    const { show, edit } = this.state;
    const { request } = this.props;
    return (
      <React.Fragment>
        <Modal
          show={show}
          edit={!edit}
          toggleModal={this.toggleModal()}
          title="Request Details"
          styles="black"
        >
          <div className="modal-body">
            <p><strong>Name: </strong> <span>{request.firstname} {request.lastname}</span></p>
            <p><strong>Email: </strong> <span>{request.email}</span></p>
            <p><strong>Department: </strong> <span>{request.department}</span></p>
            <p><strong>Description: </strong><span>{request.description}</span></p>
          </div>
        </Modal>
        <button
          type="button"
          onClick={this.toggleModal()}
          className="submitBtn"
        >
          Details
        </button>
      </React.Fragment>
    );
  }
}

DetailsModal.propTypes = {
  request: PropTypes.shape({}).isRequired,
};
