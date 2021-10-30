import React, { useEffect, useState } from "react";
import io from "socket.io-client"; //모듈 가져오기

const socket = io.connect("http://localhost:3095"); //백엔드 서버 포트를3001와 socket연결

const SocketTest = () => {
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    socket.on("welcome", (message) => {
      console.log(message);
      setName({
        name: message.name
      });
      setMsg({
        msg: message.message
      });
    });
  }, [name, msg, setName, setMsg]);

  return (
    <div>
      <section className="chat_list">
        {
          <div className="msg">
            <p className="username">{name}</p>
            <p className="message">{msg}</p>
          </div>
        } 
      </section>
    </div>
  );
};

export default SocketTest;
