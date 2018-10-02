import React from 'react';
import shortId from 'short-id';

const selectData = [
  '--select--',
  'approve',
  'disapprove',
  'resolve'
];

export default class SelectResponse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      requestId: '',
      token: props.token
    };
  }

  handleChange = async (event) => {
  await this.setState({ value: event.target.value });
   return this.setRequestId();
  }

  setRequestId = async () => {
    const { requests } = await this.props;
    const requestId = requests.requestid
    this.setState({
      requestId: requestId
    });
  }

  handleUpdate = async (event) => {
    event.preventDefault();
    const { editStatus } = await this.props
    editStatus(this.state);
  }

  render() {
    const { requestId } = this.state;
    return (
      <dl>
        <React.Fragment>
          <form onSubmit={this.handleUpdate}>
          <input type="hidden" value={requestId} onChange={this.setRequestId}/>
            <select name="select" value={this.state.value} onChange={(event) => this.handleChange(event)} className="submitBtn" >
              {selectData.map((data) => (
                  <option name={data} value={data == '--select--' ? 'pending' : data} key={shortId.generate()}>{data}</option>
              ))}
            </select>
            <button >Submit</button>
          </form>
        </React.Fragment>
      </dl>
    );

  }
}
