import React, { SyntheticEvent, useState } from 'react';
import { ImageContainer, LoginWrapper } from './styled';
import logo from 'assets/google_logo.png';
import { useNavigate } from 'react-router-dom';
import { AuthForm } from 'components/auth/auth-form';
import { AuthChoice } from 'components/auth/auth-choice';
import { routes } from 'core/constants/routes';
import { AuthService } from 'shared/services/auth.service';
import AuthGoogleButton from 'components/auth/auth-google';

const AuthPage = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const loginChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(event.target.value);
  };

  const passwordChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const postUserHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    AuthService.Instance.login(login, password)
      .then((user) => {
        console.log('AUTH SUCCESS::: ', user);
        // dispatch(setLoggedUser(user));
        // localStorage.setItem(USER_TOKEN, user.id);
        navigate(routes.home);
      })
      .catch((error) => {
        alert(error);
        setPassword('');
        setLogin('');
      });
  };

  return (
    <LoginWrapper>
      <ImageContainer>
        <img src={logo}></img>
      </ImageContainer>
      <AuthForm
        postUserHandler={postUserHandler}
        login={login}
        password={password}
        loginChangeHandler={loginChangeHandler}
        passwordChangeHandler={passwordChangeHandler}
        formId="auth-form"
      >
        <AuthChoice idForm="auth-form" />
        <AuthGoogleButton />
      </AuthForm>
    </LoginWrapper>
  );
};

AuthPage.displayName = 'AuthPage';
export default AuthPage;
