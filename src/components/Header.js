import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
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
      <>
        <header data-testid="header-component" className="header">
          <h2>Trybe Tunes</h2>
          <span data-testid="header-user-name">
            {user.name ? user.name : 'Carregando...'}
          </span>
        </header>
        <nav className="navigation">
          <span>
            <NavLink
              to="/search"
              data-testid="link-to-search"
              activeClassName="activeLink"
              className="link"
            >
              Search
            </NavLink>
          </span>
          <span>
            <NavLink
              to="/favorites"
              data-testid="link-to-favorites"
              activeClassName="activeLink"
              className="link"
            >
              Favorites
            </NavLink>
          </span>
          <span>
            <NavLink
              to="/profile"
              data-testid="link-to-profile"
              activeClassName="activeLink"
              className="link"
            >
              Profile
            </NavLink>
          </span>
        </nav>
      </>
    );
  }
}

export default Header;
