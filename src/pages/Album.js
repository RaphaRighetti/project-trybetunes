import React from 'react';
import './styles/album.css';
import { shape, string } from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      musics: [],
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const musics = await getMusics(id);
    this.setState({ musics, isLoading: false });
    console.log(musics);
  }

  render() {
    const { isLoading, musics } = this.state;

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
            <MusicCard musics={ musics } />
          </>
        ));

    return (
      <>
        <Header />
        <div data-testid="page-album" className="page-album">
          {isLoading && (<h1>Carregando...</h1>)}
          {(musics.length > 0) && musicsSec}
        </div>
      </>
    );
  }
}

Album.propTypes = {
  match: shape({ params: shape({ id: string }) }).isRequired,
};

export default Album;
