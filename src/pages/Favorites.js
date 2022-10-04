import React from 'react';
import Header from '../components/Header';
import './styles/login.css';

class Favorites extends React.Component {
  render() {
    return (
      <>
        <Header />
        <div data-testid="page-favorites" className="page-favorites">
          <h1>teste Favorites</h1>
        </div>
      </>
    );
  }
}

export default Favorites;
