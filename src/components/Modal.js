import React from 'react';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#my-modal');

export default class ModalBox extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  render() {
    return (
      <React.Fragment>
        <button onClick={this.openModal}>Open Modal</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >

          <h2 ref={subtitle => this.subtitle = subtitle}>Hello</h2>
          <button onClick={this.closeModal}>close</button>
          <div>I am a modal</div>
          <div className="main col-12">
            <div type="submit" id="myBtn" />
            <div id="myModal" className="modal">

              <div className="modal-content">
                <form id="update-form">
                  <div className="editForm">
                    <h1>Form field to Edit Your Request</h1>
                    <p>Kindly chceck to make sure all fields are filled out appropriately</p>
                    <hr />

                    <label htmlFor="equipment">
                      <strong>Equipment</strong>
                    </label>
                    <select
                      value={this.state.equipment}
                      onChange={this.handleChange}
                      className="btn-btn"
                      name="equipment"
                    >
                      {selectData.map(option => (
                        <option value={option} key={shortId.generate()}>{option}</option>
                      ))}
                    </select>

                    <label htmlFor="description">
                      <strong>Description</strong>
                    </label>
                    <textarea
                      name="description"
                      className="btn-btn"
                      id="editDescrip"
                      placeholder="Please give a brief description of your report"
                      required
                    />

                    <hr />
                    <div className="btn">
                      <button type="submit" className="submitbtn">Submit</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Modal>
      </React.Fragment>
    );
  }
}
