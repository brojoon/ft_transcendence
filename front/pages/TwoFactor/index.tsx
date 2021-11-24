import React, { useCallback } from 'react';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import useSWR from 'swr';
import { IUser } from '@typings/db';
import fetcher from '@utils/fetcher';

export default function BasicTextFields() {
  const onSubmitForm = useCallback((e) => {
    console.log(e.target.value);
    let token = document.cookie.slice(document.cookie.indexOf('userCookie') + 15);
    console.log(token.slice(0, token.length));
    token = unescape(token.indexOf(' ') === -1 ? token : token.slice(0, token.indexOf(' ')));
    console.log(token.slice(0, token.length));
    const obj = JSON.parse(token.slice(0, token.length));
    console.log(obj);
    console.log(obj.userId);
    console.log(obj.email);
    console.log(obj.oauthId);
    console.log(e.target.value);
    if (token) {
      axios
        .post(`/api/auth/qrlogin`, {
          userId: obj.userId,
          email: obj.email,
          oauthId: parseInt(obj.oauthId),
          TwoFactorAuthcode: e.target.value,
        })
        .then(() => {
          console.log('tow-factor성공');
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
    <div
      style={{
        display: 'flex',
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}
    >
      <form onSubmit={onSubmitForm}>
        <TextField
          id="outlined-basic"
          label="OTP"
          variant="outlined"
          onKeyPress={onKeydownOTP}
          style={{ width: '300px', height: '70px', padding: '5px 10px' }}
        />
      </form>
    </div>
  );
}
