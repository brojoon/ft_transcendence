import React, { useCallback, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Container, LoginButton } from './style';

const LogIn = () => {
  const [isLogin, setIsLogin] = useState(false);
  const onClickGoogleLogin = useCallback(() => {
    setIsLogin(true);
  }, []);

  const onClick42Login = useCallback(() => {
    setIsLogin(true);
  }, []);

  if (isLogin) {
    console.log('로그인됨');
    return <Redirect to="/ft_transcendence/home" />;
  }
  return (
    <Container>
      <h1>ft_transcendence</h1>
      <div>
        <LoginButton onClick={onClickGoogleLogin} variant="contained" size="large">
          GooGle
        </LoginButton>
        <LoginButton onClick={onClick42Login} variant="contained" size="large">
          42
        </LoginButton>
      </div>
    </Container>
  );
};

export default LogIn;
