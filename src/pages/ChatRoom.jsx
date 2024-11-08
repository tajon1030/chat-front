import React, { useState, useEffect } from "react";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { API_SERVER_HOST, getOne } from "../api/chat";

const ChatRoom = () => {
  const [room, setRoom] = useState({});
  const [sender, setSender] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [ws, setWs] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const roomId = localStorage.getItem("wschat.roomId");
  const userSender = localStorage.getItem("wschat.sender");

  /**
   * sender 설정
   * sender 설정 이후에 webSocket에 연결되도록 하기위하여 useEffect를 분리하여 구현하였음
   */
  useEffect(() => {
    if (userSender) {
      setSender(userSender);
    }
  }, [userSender]);

  useEffect(() => {
    if (!roomId || !sender) return; // sender가 설정되지 않으면 WebSocket 연결을 하지 않음
    // 방 정보 가져오기
    getOne(roomId).then((data) => {
      setRoom(data);
    });
    // WebSocket 연결
    const sock = new SockJS(`${API_SERVER_HOST}/ws-stomp`);
    const stompClient = Stomp.over(sock);
    setWs(stompClient);
    connect(stompClient);

    return () => {
      if (stompClient) stompClient.disconnect(); // 컴포넌트 언마운트 시 연결 해제
    };
  }, [roomId, sender]);

  /**
   * 채팅방 입장
   * @param {*} stompClient
   */
  const connect = (stompClient) => {
    stompClient.connect(
      {},
      (frame) => {
        console.log("Connected: " + frame); // 연결 성공 확인
        setIsConnected(true); // 연결이 성공적으로 이루어지면 상태 업데이트
        stompClient.subscribe(`/sub/chat/room/${roomId}`, function (message) {
          const recv = JSON.parse(message.body);
          recvMessage(recv);
        });

        // 입장 메시지 전송
        stompClient.send(
          "/pub/chat/message",
          {},
          JSON.stringify({ type: "ENTER", roomId, sender, message: "" })
        );
      },
      (error) => {
        console.error("WebSocket connection error:", error);
        setIsConnected(false); // 연결 실패 시 상태 업데이트
        // 재연결
        setTimeout(() => {
          console.log("Reconnecting to WebSocket...");
          connect(stompClient);
        }, 10000);
      }
    );
  };

  /**
   * 메시지 받기
   * @param {*} recv
   */
  const recvMessage = (recv) => {
    setMessages((prevMessages) => [
      {
        type: recv.type,
        sender: recv.type === "ENTER" ? "[알림]" : recv.sender,
        message: recv.message,
      },
      ...prevMessages,
    ]);
  };

  /**
   * 메시지 보내기
   */
  const sendMessage = () => {
    if (message.trim() !== "" && isConnected) { // 연결이 제대로 이루어질때에만 실행
      ws.send(
        "/pub/chat/message",
        {},
        JSON.stringify({ type: "TALK", roomId, sender, message })
      );
      setMessage(""); // 메시지 초기화
    } else {
      console.error("STOMP connection is not established yet!");
    }
  };

  return (
    <div className="container">
      <div>
        <h2>{room.name}</h2>
      </div>

      <div className="input-group">
        <div className="input-group-prepend">
          <label className="input-group-text">내용</label>
        </div>
        <input
          type="text"
          className="form-control"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyUp={(e) => e.key === "Enter" && sendMessage()}
        />
        <div className="input-group-append">
          <button
            className="btn btn-primary"
            type="button"
            onClick={sendMessage}
          >
            보내기
          </button>
        </div>
      </div>

      <ul className="list-group">
        {messages.map((msg, index) => (
          <li className="list-group-item" key={index}>
            {msg.sender} - {msg.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatRoom;