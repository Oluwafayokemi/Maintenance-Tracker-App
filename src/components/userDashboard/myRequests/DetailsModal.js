import React from 'react';
import Modal from '../../../common/Modal';
import EditRequestContainer from '../editRequest/EditRequestContainer';

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
    const { request, editRequest } = this.props;
    return (
      <React.Fragment>
        <Modal
          show={show}
          toggleModal={this.toggleModal()}
          title="Edit Request"
          styles="font"
          edit={edit}
        >
          <EditRequestContainer
            request={request}
            editRequest={editRequest}
          />
        </Modal>
        <button
          type="button"
          onClick={this.toggleModal()}
          className="submitBtn"
        >
          Edit
        </button>
      </React.Fragment>
    );
  }
}
