import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import './styles/favorites.css';

class Favorites extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      musics: [],
      isChecked: true,
    };
  }

  async componentDidMount() {
    const musics = await getFavoriteSongs();
    const isChecked = {};
    musics.forEach((element) => {
      isChecked[element.trackId] = true;
    });
    this.setState({ musics, isLoading: false, isChecked });
  }

  handleCheckBox = async ({ target }) => {
    this.setState({ isLoading: true });
    await removeSong(JSON.parse(target.value));
    const musics = await getFavoriteSongs();
    this.setState({ musics, isLoading: false });
  };

  render() {
    const { isLoading, musics, isChecked } = this.state;
    const musicsSec = ((musics.length > 0) && <MusicCard
      musics={ musics }
      isChecked={ isChecked }
      isFilfred={ -1 }
      handleCheckBox={ this.handleCheckBox }
    />
    );

    return (
      <>
        <Header />
        <div data-testid="page-favorites" className="page-favorites">
          {isLoading && (<h1>Carregando...</h1>)}
          {isLoading || musicsSec}
        </div>
      </>
    );
  }
}

export default Favorites;
