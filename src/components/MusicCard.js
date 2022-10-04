import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { musics } = this.props;

    return (
      <div className="musics">
        {musics.filter((_e, i) => i !== 0).map((element) => (
          <div className="music" key={ element.trackID }>
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
              <input type="checkbox" className="favoriteIcon" />
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
};

export default MusicCard;
