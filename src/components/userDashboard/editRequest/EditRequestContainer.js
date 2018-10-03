import React from 'react';
import EditRequest from './EditRequest';

export default class EditRequestContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      equipment: '',
      requestId: '',
    };
  }
  componentDidMount = () => {
    this.setState({ ...this.state, ...this.props.request });
    debugger;
  };
 
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { editRequest, request } = this.props;
    editRequest({ ...this.state });
  }

  render() {
    const { description, equipment } = this.state;
    const input = {
      description,
      equipment,
    };
    return (
      <React.Fragment>
        <EditRequest
          value={input}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </React.Fragment>
    );
  }
}
