import React from 'react';
import LogoAnimalHero from './../assets/animal-hero.jpg';
import './../styles/classes.css';
import './../styles/tags.css';


import { GoogleLogin } from '@react-oauth/google';

import * as Constants from './../utils/Constants';


import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
const cookies = new Cookies();



const LoginPage = () => {

  const navigate = useNavigate()
  const acessToken = cookies.get('access_token');

  React.useEffect(() => {
    if (acessToken) {
      const decodedJWT = jwt_decode(acessToken);

      if (decodedJWT) {
        navigate("/posts", { replace: true, state: { jwt: acessToken, user: decodedJWT } });
        return
      }
    }
  }, [acessToken, navigate]);

  return (
    <>
      <header>
        <img src={LogoAnimalHero} className='logo-animal' alt='Logo Animal Hero'></  img>
      </header>
      <div className="login-page">
        <h3>Acesse com sua conta Google: </h3>
        <GoogleLogin
          login_uri={Constants.LOGIN_PATH}
          redirect_uri={Constants.REDIRECT_LOGIN_PATH}
          ux_mode='redirect'
        />
      </div>
    </>
  );
};

export default LoginPage;
