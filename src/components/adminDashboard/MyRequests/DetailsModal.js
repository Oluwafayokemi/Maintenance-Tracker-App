import React from 'react';
import Modal from '../../../common/modal';

export default class DetailsModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }

  toggleModal = () => {
    return () => {
      this.setState(prevState => ({
        show: !prevState.show
      }));
    }
  }

  render() {
    const { show } = this.state;
    const { request } = this.props
    return (
      <React.Fragment>
        <Modal
          show={show}
          toggleModal={this.toggleModal()}
          title="Request Details"
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
          className="submitBtn">
          Details
        </button>
      </React.Fragment>
    );
  }
}