import React from 'react';
import './styles/login.css';
import Header from '../components/Header';

class ProfileEdit extends React.Component {
  render() {
    return (
      <>
        <Header />
        <div data-testid="page-profile-edit" className="page-profile-edit">
          <h1>teste ProfileEdit</h1>
        </div>
      </>
    );
  }
}

export default ProfileEdit;
