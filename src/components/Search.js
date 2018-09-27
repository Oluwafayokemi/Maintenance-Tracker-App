import React from 'react';
import '../styles/App.scss';

const Search = () => (
  <div>
    <div className="col-12 padding">
      <div className="flex">
        <input className="searchBtn" type="text" placeholder="Search By Status.." />
        <div className="page">
          <i className="fas fa-chevron-left" id="fa-left" />
          <i className="fas fa-chevron-right" id="fa-right" />
        </div>
      </div>
    </div>
  </div>
);

export default Search;
