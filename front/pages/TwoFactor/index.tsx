import React, { useCallback } from 'react';
import TextField from '@mui/material/TextField';
import axios from 'axios';

export default function BasicTextFields() {
  const onSubmitForm = useCallback((e) => {
    console.log(e.target.value);
    axios
      .post(`/api/auth/qrlogin`, {
        userId: 'youngchoi',
        username: '쌍문동 성기훈',
        oauthId: 54612484714,
        email: 'youngchoi@42seoul.com',
        profile: '인터넷url or /upload/profile/ex.png',
        TwoFactorAuthcode: e.target.value,
      })
      .then(() => {
        console.log('tow-factor성공');
      })
      .catch(console.error);
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
