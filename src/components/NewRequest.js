import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import shortId from 'short-id';
import history from '../util/history';
import '../styles/App.scss';
import Header from './Header';
import { createUserRequest } from '../actions/newRequest.action';

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

class NewRequest extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      equipment: '',
    };
  }
  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const request = this.props.createUserRequest(this.state);
    try {
      history.push('/user');
    }
    catch(err) {
      err
    }
  }
  
  render() {
    return (
      <React.Fragment>
        <Header />
        <div className="request">
          <div id="display" className="alert col-12">
            <p id="alert" />
          </div>
          <div className="col-12 center">
            <div className="table">
              <form onSubmit={this.handleSubmit}>
                <div className="form">
                  <h1>Make Your Request</h1>
                  <p>Please fill in this form to make a request.</p>
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
                    {selectData.map((option) => (
                      <option value={option} key={shortId.generate()}>{option}</option>
                    ))}
                  </select>

                  <label 
                  className="desc" 
                  htmlFor="description">
                    <strong>Description</strong>
                  </label>
                  <textarea 
                  name="description" 
                  value={this.state.description} 
                  className="btn-btn" 
                  onChange={this.handleChange}
                  placeholder="Please give a brief description of your report" 
                  required 
                  />

                  <hr />
                  <div className="btn">
                    <button 
                    type="submit" 
                    className="submitbtn">Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}


const mapDispatchToProps = dispatch => bindActionCreators({
  createUserRequest,
}, dispatch);

export default connect(null, mapDispatchToProps)(NewRequest);
