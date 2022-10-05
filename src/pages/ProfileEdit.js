import React from 'react';
import './styles/profile.css';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      name: '',
      email: '',
      image: '',
      description: '',
    };
  }

  async componentDidMount() {
    const user = await getUser();
    const { image, name, description, email } = user;
    this.setState({ isLoading: false, image, name, description, email });
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  isDisabled = () => {
    const { name, image, description, email } = this.state;
    return !(
      (name.length > 0) && (image.length > 0)
      && (description.length > 0) && (email.length > 0)
    );
  };

  handleClick = async () => {
    const { name, email, image, description } = this.state;
    const { history } = this.props;
    this.setState({ isLoading: true });
    await updateUser({ name, email, image, description });
    history.push('/profile');
  };

  render() {
    const { isLoading, image, name, description, email } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-profile-edit" className="page-profile-edit">
          {isLoading && (<h2>Carregando...</h2>)}
          {isLoading || (
            <div className="profileEdit">
              <div className="imgDiv">
                <img src={ image } alt="Profile" data-testid="profile-image" />
              </div>
              <input
                name="image"
                type="text"
                data-testid="edit-input-image"
                value={ image }
                onChange={ this.handleChange }
                placeholder="Url da imagem de perfil"
                className="inputImg"
              />
              <p className="nomeLabel">Nome</p>
              <input
                name="name"
                type="text"
                value={ name }
                onChange={ this.handleChange }
                className="inputMargin"
                data-testid="edit-input-name"
              />
              <p className="nomeLabel">E-mail</p>
              <input
                name="email"
                type="text"
                value={ email }
                onChange={ this.handleChange }
                className="inputMargin"
                data-testid="edit-input-email"
              />
              <p className="nomeLabel">Descrição</p>
              <textarea
                name="description"
                type="text"
                data-testid="edit-input-description"
                value={ description }
                onChange={ this.handleChange }
                className="descriptionArea"
              />
              <button
                type="button"
                className="button-28 profilebtn"
                data-testid="edit-button-save"
                disabled={ this.isDisabled() }
                onClick={ this.handleClick }
              >
                Salvar
              </button>
            </div>
          )}
        </div>
      </>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

export default ProfileEdit;
