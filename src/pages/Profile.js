import React from 'react';
import './styles/profile.css';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
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
    const { name, email, image, description } = user;
    this.setState({ name, email, image, description, isLoading: false });
  }

  render() {
    const { name, email, image, description, isLoading } = this.state;
    const imgUrl = 'https://t3.ftcdn.net/jpg/00/73/08/76/360_F_73087609_FQe2v1GvOicbFDHiUokmueGfW2Fi5IDB.jpg';
    const imgSrc = image === '' ? imgUrl : image;

    return (
      <>
        <Header />
        {isLoading && <h2 className="loading">Carregando...</h2>}
        {isLoading
        || (
          <div data-testid="page-profile" className="page-profile">
            <div className="profile">
              <div className="imgDiv">
                <img src={ imgSrc } alt="Profile" data-testid="profile-image" />
              </div>
              <p className="nomeLabel">Nome</p>
              <p className="nomeValor">{name}</p>
              <p className="nomeLabel">E-mail</p>
              <p className="nomeValor">{email}</p>
              <p className="nomeLabel">Descrição</p>
              <p className="nomeValor">{description}</p>
              <p className="linkSec">
                <Link to="/profile/edit" className="profileLink">
                  Editar perfil
                </Link>
              </p>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default Profile;
