import React, { useCallback } from 'react';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { TwoFactorContainer } from './style';

const TwoFactor = () => {
  const history = useHistory();
  const onSubmitForm = useCallback((e) => {
    console.log(e.target.value);
    let token = document.cookie.slice(document.cookie.indexOf('userCookie') + 15);
    token = unescape(token.indexOf(' ') === -1 ? token : token.slice(0, token.indexOf(' ')));
    const obj = JSON.parse(token.slice(0, token.length));
    if (obj) {
      axios
        .post(`/api/auth/qrlogin`, {
          userId: obj.userId,
          email: obj.email,
          oauthId: parseInt(obj.oauthId),
          TwoFactorAuthcode: e.target.value,
        })
        .then(() => {
          console.log('tow-factor성공');
          history.push('/home');
        })
        .catch(console.error);
    }
  }, []);

  const onKeydownOTP = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        onSubmitForm(e);
        e.target.value = '';
      }
    },
    [onSubmitForm],
  );
  return (
    <TwoFactorContainer>
      <form onSubmit={onSubmitForm}>
        <TextField
          className="text-field"
          id="outlined-basic"
          label="OTP"
          variant="outlined"
          onKeyPress={onKeydownOTP}
        />
      </form>
    </TwoFactorContainer>
  );
};

export default TwoFactor;
