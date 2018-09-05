import React from 'react';
import '../styles/App.scss';
import Header from './Header';
import Search from './Search';

const UserDashboard = () => (
  <React.Fragment>
    <Header isUser />
    <div className="user">
      <Search isAdmin={false} />

      <div className="main col-12">
        <div type="submit" id="myBtn" />
        <div id="myModal" className="modal">

          <div className="modal-content">
            <span className="close">&times;</span>
            <form id="update-form">
              <div className="editForm">
                <h1>Form field to Edit Your Request</h1>
                <p>Kindly chceck to make sure all fields are filled out appropriately</p>
                <hr />

                <label htmlFor="equipment">
                  <strong>Equipment</strong>
                </label>
                <select id="editEquip" className="btn-btn" name="equipment">
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
    </div>
  </React.Fragment>
);
export default UserDashboard;
