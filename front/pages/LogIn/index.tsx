import React, { useCallback } from 'react';
import { Container, LoginButton } from './style';

const LogIn = () => {

  // const onClickKakaoLogin = useCallback(() => {
  //   window.location.href = '/api/auth/kakao';
  // }, []);

  const onClickGoogleLogin = useCallback(() => {
    window.location.href = 'http://localhost:3095/api/auth/google';
  }, []);

  const onClick42Login = useCallback(() => {
    window.location.href = 'http://localhost:3095/api/auth/42';
  }, []);

  return (
    <Container>
      <h1>ft_transcendence</h1>
      <div>
        <LoginButton onClick={onClickGoogleLogin} variant="contained" size="large">
          GooGle
        </LoginButton>
        {/* <LoginButton onClick={onClickKakaoLogin} variant="contained" size="large">
          Kakao
        </LoginButton> */}
        <LoginButton onClick={onClick42Login} variant="contained" size="large">
          42
        </LoginButton>
      </div>
    </Container>
  );
};

export default LogIn;
