import React from 'react';
import { connect } from 'react-redux';
import { createUserRequest } from '../../../actions/userRequest.action';
import NewRequest from './NewRequest';

export class NewRequestContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      equipment: '',
    };
  }
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { createRequest } = await this.props;
    await createRequest(this.state);
  }

  render() {
    const { description, equipment } = this.state;
    const input = {
      description,
      equipment,
    };
    return (
      <React.Fragment>
        <NewRequest
          value={input}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  createRequest: request => dispatch(createUserRequest(request)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewRequestContainer);

