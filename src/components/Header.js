import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import './components.css';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      user: {},
    };
  }

  async componentDidMount() {
    const user = await getUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;

    return (
      <header data-testid="header-component" className="header">
        <h2>Trybe Tunes</h2>
        <span data-testid="header-user-name">
          {user.name ? user.name : 'Carregando...'}
        </span>
      </header>
    );
  }
}

export default Header;
