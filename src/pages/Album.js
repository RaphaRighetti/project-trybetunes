import React from 'react';
import './styles/login.css';
import Header from '../components/Header';

class Album extends React.Component {
  render() {
    return (
      <>
        <Header />
        <div data-testid="page-album" className="page-album">
          <h1>teste Album</h1>
        </div>
      </>
    );
  }
}

export default Album;
