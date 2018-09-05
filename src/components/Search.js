import React from 'react';
import '../styles/App.scss';

const Search = ({ isAdmin }) => (
  <div>
    <div className="col-12 padding">
      <div className="flex">
        <input className="searchBtn" type="text" placeholder="Search By Status.." />
        <div className="page">
          <i className="fas fa-chevron-left" id="fa-left" />
          <i className="fas fa-chevron-right" id="fa-right" />
        </div>
      </div>
      <table id="tableItem">
        <thead>
          <tr>
            <th>S/N</th>
            <th>Date</th>
            <th>Equipment</th>
            <th>Action</th>
            <th>Status</th>
            {isAdmin ? <th>Details</th> : ''}
          </tr>
        </thead>
      </table>
    </div>
  </div>
);

export default Search;
