import React, { useEffect, useState } from "react";
import io from "socket.io-client"; //모듈 가져오기
//import pingpong from "./pingpong.js";

const socket = io.connect("http://localhost:3095"); //백엔드 서버 포트를3001와 socket연결

const SocketTest = () => {
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    socket.on("welcome", (message) => {
      //"receive message"라는 이벤트 받음(2)
      console.log(message);
      setMessageList({
        messageList: [...messageList, message],
      });
    });
  }, [messageList, setMessageList]);

  return (
    <div>
      <section className="chat_list">
        {messageList.map((item) => (
          <div className="messagelist">
            <p className="username">{item.name}</p>
            <p className="msg_text">{item.msg}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default SocketTest;

// export default App;

// import React from "react";
// import socketIOClient from "socket.io-client";
// const ENDPOINT = "http://127.0.0.1:3095";

// function App() {
//     const socket = socketIOClient(ENDPOINT);
//     let aa = `gggg`;
//     socket.on("welcome", data => {
//        aa= data;
//     });
//   return (
//     <p>
//       {aa}
//     </p>
//   );
// }

// export default App;
