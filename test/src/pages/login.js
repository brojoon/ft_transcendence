import React, { useState } from 'react';
import axios from 'axios';

const LogIn = () => {
  
  const [userId , setUserId] = useState("");

  const idChange = (e) => {
    setUserId(e.target.value);
  };

  const onClickLogin = async () => {
    await axios.get(`http://localhost:3095/api/auth/2/${userId}`, {
      withCredentials: true,
    }).then( () => {
      window.location.href = "http://localhost:3000/match";
    }).catch(()=>{
      setUserId("없는유저");
    }); 
  };

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
