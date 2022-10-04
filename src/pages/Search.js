import React from 'react';
import './styles/search.css';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      searchInput: '',
    };
  }

  handleChange = ({ target }) => {
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [target.name]: value });
  };

  isDisabled = () => {
    const { searchInput } = this.state;
    const minLength = 2;

    return (searchInput.length < minLength);
  };

  render() {
    const { searchInput } = this.state;

    return (
      <>
        <Header />
        <div data-testid="page-search" className="page-search">
          <h1>Search</h1>
          <input
            type="text"
            data-testid="search-artist-input"
            name="searchInput"
            value={ searchInput }
            onChange={ this.handleChange }
          />
          <button
            type="button"
            className="button-28"
            data-testid="search-artist-button"
            disabled={ this.isDisabled() }
          >
            Pesquisar
          </button>
        </div>
      </>
    );
  }
}

export default Search;
