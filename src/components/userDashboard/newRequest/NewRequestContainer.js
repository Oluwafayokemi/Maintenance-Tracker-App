import React from 'react';
import { connect } from 'react-redux';
import history from '../../../util/history';
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

  componentDidMount = () => {
    const { auth } = this.props;
    const { user } = auth;
    if (!user) {
      history.push('/');
      return null;
    }
    return true;
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

export const mapStateToProps = state => ({
  auth: state.auth,
});

export const mapDispatchToProps = dispatch => ({
  createRequest: request => dispatch(createUserRequest(request)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewRequestContainer);

