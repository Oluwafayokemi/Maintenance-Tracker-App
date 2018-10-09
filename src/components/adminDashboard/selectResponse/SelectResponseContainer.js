import React from 'react';
import PropTypes from 'prop-types';
import SelectResponse from './SelectResponse';

export default class SelectResponseContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      requestId: null,
    };
  }

  setRequestId = () => {
    const { requests } = this.props;
    const requestId = requests.requestid;
    this.setState({
      requestId,
    });
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
    return this.setRequestId();
  }

  handleUpdate = (event) => {
    event.preventDefault();
    const { editStatus } = this.props;
    return editStatus(this.state);
  }

  render() {
    const { requestId, value } = this.state;
    return (
      <React.Fragment>
        <SelectResponse
          handleChange={event => this.handleChange(event)}
          setRequestId={this.setRequestId}
          handleUpdate={this.handleUpdate}
          requestId={requestId}
          value={value}
        />
      </React.Fragment>
    );
  }
}

SelectResponseContainer.propTypes = {
  requests: PropTypes.shape([]).isRequired,
  editStatus: PropTypes.func.isRequired,
};

