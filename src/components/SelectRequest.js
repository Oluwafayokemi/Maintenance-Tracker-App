import React from 'react';
import shortId from 'short-id';

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

export default class SelectRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
    this.props.handleSelectChange(this.state.value)
    console.log(this.state.value)
  }

  render() {
    return (
      <dl>
        <React.Fragment>
          <select value={this.state.value} onChange={(event) => this.handleChange(event)} className="btn-btn" name="equipment">
            {selectData.map((data) => (
              <option value={data} key={shortId.generate()}>{data}</option>
            ))}
          </select>
        </React.Fragment>
      </dl>
    );

  }
}
