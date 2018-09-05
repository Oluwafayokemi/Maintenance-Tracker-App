import React from 'react';
import '../styles/App.scss';
import Header from './Header';
import Search from './Search';

const AdminDashboard = () => (
  <React.Fragment>
    <Header isUser={false} />
    <div className="admin">
      <div id="display" className="alert col-12">
        <p id="alert" />
      </div>
      <div className="header">
        <h1>Logs of All Request</h1>
      </div>

      <Search isAdmin />

      <div className="main col-12">

        <div type="submit" id="myBtn" />

        <div id="myModal" className="modal">

          <div className="modal-content">
            <span className="close">&times;</span>
            <div className="details">
              <ol>
                <li id="reqId" />
                <li className="name" id="Name" />
                <li id="department" />
                <li className="des" id="Email" />
                <li id="equ" />
                <li className="des" id="descrip" />
                <li id="stat" />
                <li id="dat" />
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  </React.Fragment>
);
export default AdminDashboard;
