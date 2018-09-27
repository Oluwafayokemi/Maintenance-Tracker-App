import React from 'react';
import '../styles/App.scss';
import Header from './Header';
import Search from './Search';
import {getUsersRequest} from '../actions/getAllUserRequest';
import ModalBox from './Modal';

const selectData = [
  'Air Condition',
  'Genrator',
  'Electricity',
  'Paintings',
  'Computers',
  'Ups',
  'Camera',
  'Others',
];

class UserDashboard extends React.PureComponent {
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

  handleSubmit = (event) => {
    event.preventDefault();
    const request = this.props.createUserRequest(this.state);
    try {
      history.push('/user');
    }
    catch (err) {
      err
    }
  }
  render() {
    return (

      <React.Fragment>
        <Header isUser />
        <div className="user">
          <Search isAdmin={false} />

          <div className="main col-12">
            <div type="submit" id="myBtn" />
            <div id="myModal" className="modal">

              <div className="modal-content">
                <span className="close">&times;</span>
               <ModalBox />
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  getUsersRequest,
}, dispatch);

export default connect(null, mapDispatchToProps)(UserDashboard);
