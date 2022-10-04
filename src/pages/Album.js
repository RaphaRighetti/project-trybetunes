import React from 'react';
import './styles/album.css';
import { shape, string } from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import { addSong } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      musics: [],
      showMusics: false,
      isChecked: {},
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const musics = await getMusics(id);
    const isChecked = {};
    musics.filter((_e, i) => i !== 0).forEach((element) => {
      isChecked[element.trackId] = false;
    });
    this.setState({ musics, isLoading: false, showMusics: true, isChecked });
  }

  handleCheckBox = async ({ target }) => {
    this.setState({ isLoading: true, showMusics: false });
    await addSong(target.value);
    this.setState((prev) => ({
      isLoading: false,
      showMusics: true,
      isChecked: {
        ...prev.isChecked,
        [target.name]: !prev.isChecked[target.name],
      },
    }));
  };

  render() {
    const { isLoading, musics, showMusics, isChecked } = this.state;

    const musicsSec = (
      musics.length > 0
        && (
          <>
            <div className="albumInfo">
              <img src={ musics[0].artworkUrl100 } alt={ musics[0].collectionName } />
              <p
                className="albumName"
                data-testid="album-name"
              >
                {musics[0].collectionName}
              </p>
              <p
                className="artistName"
                data-testid="artist-name"
              >
                {musics[0].artistName}
              </p>
              <p className="genreName">{musics[0].primaryGenreName}</p>
            </div>
            <MusicCard
              musics={ musics }
              handleCheckBox={ this.handleCheckBox }
              isChecked={ isChecked }
            />
          </>
        ));

    return (
      <>
        <Header />
        <div data-testid="page-album" className="page-album">
          {isLoading && (<h1>Carregando...</h1>)}
          {showMusics && musicsSec}
        </div>
      </>
    );
  }
}

Album.propTypes = {
  match: shape({ params: shape({ id: string }) }).isRequired,
};

export default Album;
