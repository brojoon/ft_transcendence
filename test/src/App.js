import React, { Component } from "react";
//import "./App.css";
import io from "socket.io-client"; //모듈 가져오기

const socket = io.connect("http://localhost:3095");  //백엔드 서버 포트를3001와 socket연결 

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",          //id
      msg: "",			 //메세지 내용
      messageList: [],	 //메세지 리스트
    };
  }
  sendMsg = (e) => {
    e.preventDefault();
    socket.emit("send message", {		//"send message"라는 이벤트 발생 (1)
      name: this.state.name,
      msg: this.state.msg,
    });
    this.setState({
      name: "",
      msg: "",
    });
  };
  componentWillMount() {
    socket.on("welcome", (message) => {   //"receive message"라는 이벤트 받음(2)
      console.log(message);
      this.setState({
        messageList: [...this.state.messageList, message],
      });
    });
  }
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  render() {
    return (
      <div>
        <section className="chat_list">
          {this.state.messageList.map((item) => (
            <div className="messagelist">
              <p className="username">{item.name}</p>
              <p className="msg_text">{item.msg}</p>
            </div>
          ))}
        </section>
        <form className="chat_con" onSubmit={this.sendMsg}>
          <div className="chat_inputs">
            <input
              type="text"
              onChange={this.onChange}
              value={this.state.name}
              name="name"
              id="id"
              placeholder="아이디"
            />
            <input
              type="text"
              onChange={this.onChange}
              value={this.state.msg}
              name="msg"
              id="msg"
              placeholder="메세지내용"
            />
          </div>
          <button className="chat_button" type="submit">
            보내기
          </button>
        </form>
      </div>
    );
  }
}

//export default App;

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
