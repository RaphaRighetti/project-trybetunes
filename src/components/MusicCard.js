import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { musics, handleCheckBox, isChecked } = this.props;

    return (
      <div className="musics">
        {musics.filter((_e, i) => i !== 0).map((element) => (
          <div className="music" key={ element.trackId }>
            <div className="track">
              <audio
                data-testid="audio-component"
                src={ element.previewUrl }
                controls
              >
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                {' '}
                <code>audio</code>
                .
              </audio>
              <label
                htmlFor={ element.trackId }
                className="hide"
                data-testid={ `checkbox-music-${element.trackId}` }
              >
                Favorita
                <input
                  type="checkbox"
                  className="favoriteIcon"
                  name={ element.trackId }
                  id={ element.trackId }
                  onChange={ handleCheckBox }
                  checked={ isChecked[element.trackId] }
                  value={ element }
                />
              </label>
            </div>
            <p>{element.trackName}</p>
            <hr />
          </div>
        ))}
      </div>
    );
  }
}

MusicCard.propTypes = {
  musics: PropTypes.arrayOf(PropTypes.shape({ trackName: PropTypes.string })).isRequired,
  handleCheckBox: PropTypes.func.isRequired,
  isChecked: PropTypes.shape({}).isRequired,
};

export default MusicCard;
