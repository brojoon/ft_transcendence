import styled from '@emotion/styled';
import Button from '@mui/material/Button';

export const LoginButton = styled(Button)`
  font-weight: 700;
  width: 100%;
  padding: 9 65px;
  margin-top: 7px;
  background-color: gray;
`;

export const Container = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #121212;

  & > h1 {
    color: white;
  }

`;
