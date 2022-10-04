import React from 'react';
import './styles/login.css';
import Header from '../components/Header';

class Profile extends React.Component {
  render() {
    return (
      <>
        <Header />
        <div data-testid="page-profile" className="page-profile">
          <h1>teste Profile</h1>
        </div>
      </>
    );
  }
}

export default Profile;
