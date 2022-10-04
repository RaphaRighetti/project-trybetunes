import React from 'react';
import './styles/login.css';
import Header from '../components/Header';

class Search extends React.Component {
  render() {
    return (
      <>
        <Header />
        <div data-testid="page-search" className="page-search">
          <h1>teste Search</h1>
        </div>
      </>
    );
  }
}

export default Search;
