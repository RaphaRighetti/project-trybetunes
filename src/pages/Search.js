import React from 'react';
import './styles/search.css';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      searchInput: '',
      isLoading: false,
      showSearch: false,
      albuns: [],
      searchName: '',
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

  handleClick = async () => {
    this.setState({ isLoading: true, showSearch: false });
    const { searchInput } = this.state;
    const albuns = await searchAlbumsAPI(searchInput);
    this.setState((prev) => ({
      albuns,
      isLoading: false,
      showSearch: true,
      searchInput: '',
      searchName: prev.searchInput,
    }));
  };

  render() {
    const { searchInput, isLoading, showSearch, albuns, searchName } = this.state;
    const notFound = 'Nenhum álbum foi encontrado';
    const found = `Resultado de álbuns de: ${searchName}`;
    const albunsCard = (
      <>
        <p>{albuns.length === 0 ? notFound : found}</p>
        {albuns.map((element) => (
          <Link
            to={ `/album/${element.collectionId}` }
            className="albumLink"
            key={ element.collectionId }
            data-testid={ `link-to-album-${element.collectionId}` }
          >
            <div className="albumCard">
              <img
                src={ element.artworkUrl100 }
                alt={ element.collectionName }
              />
              <p className="nomeAlbum">{element.collectionName}</p>
              <p className="artist">{element.artistName}</p>
            </div>
          </Link>
        ))}
      </>
    );

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
            placeholder="Nome do artista"
          />
          <button
            type="button"
            className="button-28"
            data-testid="search-artist-button"
            disabled={ this.isDisabled() }
            onClick={ this.handleClick }
          >
            Pesquisar
          </button>
        </div>
        <div className="albunsDiv">
          {isLoading && (<h2>Carregando...</h2>)}
          {showSearch && albunsCard}
        </div>
      </>
    );
  }
}

export default Search;
