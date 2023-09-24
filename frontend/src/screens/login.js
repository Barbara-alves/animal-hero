import React from 'react';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import LogoAnimalHero from './../assets/animal-hero.jpg';
import './../styles/classes.css';
import './../styles/tags.css';


const LoginPage = () => {
  const responseGoogle = (response) => {
    if ('profileObj' in response) {
      // Aqui você pode lidar com a resposta do Google, como autenticar o usuário no seu sistema.
      console.log('Usuário autenticado:', response.profileObj);
    } else {
      console.error('Erro ao autenticar:', response);
    }
  };

  return (
    <>
      <header>
        <img src={LogoAnimalHero} className='logo-animal' alt='Logo Animal Hero'></  img>
      </header>
      <div className="login-page">
        <h3>Acesse com sua conta Google</h3>
        <GoogleLogin
          clientId="SEU_CLIENT_ID_DO_GOOGLE"
          buttonText="Login com o Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
        />
      </div>
    </>
  );
};

export default LoginPage;
