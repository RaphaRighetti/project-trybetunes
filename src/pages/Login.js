import React from 'react';
import './styles/login.css';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      nameInput: '',
      isLoading: false,
    };
  }

  onChange = ({ target }) => {
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [target.name]: value });
  };

  isDisabled = () => {
    const { nameInput } = this.state;
    const minLength = 3;

    return (nameInput.length < minLength);
  };

  handleClick = async () => {
    const { nameInput } = this.state;
    const { history } = this.props;
    this.setState({ isLoading: true });
    await createUser({ name: nameInput });
    history.push('/search');
  };

  render() {
    const { nameInput, isLoading } = this.state;

    const form = (
      <>
        <h1>Trybe Tunes</h1>
        <form>
          <input
            type="text"
            name="nameInput"
            placeholder="nome"
            value={ nameInput }
            onChange={ this.onChange }
            data-testid="login-name-input"
          />
          <button
            type="button"
            className="button-28"
            data-testid="login-submit-button"
            disabled={ this.isDisabled() }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </form>
      </>
    );

    const loading = (
      <p>
        Carregando...
      </p>
    );

    return (
      <div data-testid="page-login" className="page-login">
        {isLoading ? loading : form}
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

export default Login;
