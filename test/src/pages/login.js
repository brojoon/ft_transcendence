import React, { useCallback, useState } from 'react';
import axios from 'axios';
import getCookie from './cookie.js';


const LogIn = () => {

  getCookie('ts_token', 0)

  const [userId , setUserId] = useState("");

  const idChange = (e) => {
    setUserId(e.target.value);
  };

  const onClickLogin = useCallback(() => {
    axios.get(`http://localhost:3095/api/auth/2/${userId}`, {
      withCredentials: true,
    });
    window.location.href = "http://localhost:3000/match"
  }, [userId]);

  return (
    <div>
      <div>
        <b>ID : {userId} </b>
      </div>
      <div>      
        <input onChange={idChange} value={userId}/>
        <button onClick={onClickLogin}>로그인</button>
      </div>
    </div>
  );
};

export default LogIn;
