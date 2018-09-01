import React from 'react';
import '../styles/App.scss';
import Header from './Header';

const NewRequest = () => (
  <React.Fragment>
    <Header />
    <div className="request">
      <div id="display" className="alert col-12">
        <p id="alert" />
      </div>
      <div className="col-12 center">
        <div className="table">
          <form id="request-form">
            <div className="form">
              <h1>Make Your Request</h1>
              <p>Please fill in this form to make a request.</p>
              <hr />

              <label htmlFor="equipment">
                <strong>Equipment</strong>
              </label>
              <select className="btn-btn" id="equip" name="equipment">
                <option value="Air condition">Air condition</option>
                <option value="Furniture">Furniture</option>
                <option value="Generator">Generator</option>
                <option value="Electricity">Electricity</option>
                <option value="Paintings">Paintings</option>
                <option value="computers">computers</option>
                <option value="Printers">Printers</option>
                <option value="UPS">UPS</option>
                <option value="Camera">Camera</option>
                <option value="Others">Others</option>
              </select>

              <label className="desc" htmlFor="description">
                <strong>Description</strong>
              </label>
              <textarea name="description" className="btn-btn" id="descrip" placeholder="Please give a brief description of your report" required />

              <hr />
              <div className="btn">
                <button type="submit" className="submitbtn">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </React.Fragment>
);
export default NewRequest;
