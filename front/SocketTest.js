import React, { useEffect, useState } from "react";
import io from "socket.io-client"; //모듈 가져오기

const socket = io.connect("tcp://back:3095"); //백엔드 서버 포트를3001와 socket연결

const SocketTest = () => {
  const [x = 30, setName] = useState("");
  const [y = 30, setMsg] = useState("");

  useEffect(() => {
    socket.on("welcome", (message) => {
      setName({
        x: message.name
      });
      setMsg({
        y: message.msg
      });
    });
  }, [x, y, setName, setMsg]);

  return (
    <div></div>
  );
};

export default SocketTest;
