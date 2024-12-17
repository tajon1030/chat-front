import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createRoomRequest, getList } from "../api/chat";
import { getCookie } from "../util/cookieUtil";

const MainPage = () => {
  const [roomName, setRoomName] = useState("");
  const [chatrooms, setChatrooms] = useState([]);
  const navigate = useNavigate();

  /**
   * 채팅방 목록 가져오기
   */
  const findAllRoom = () => {
    getList()
      .then((data) => {
        if(data.success){
          setChatrooms(data.response.content);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  /**
   * 채팅방 개설
   * @returns 
   */
  const createRoom = () => {
    if (roomName === "") {
      alert("방 제목을 입력해 주십시요.");
      return;
    }
    const params = new URLSearchParams();
    params.append("name", roomName);
    createRoomRequest(params)
      .then((data) => {
        alert(data.response.name + "방 개설에 성공하였습니다.");
        setRoomName(""); // 입력값 초기화
        findAllRoom(); // 채팅방 목록 새로 고침
      })
      .catch((err) => {
        console.log(err);
        alert("채팅방 개설에 실패하였습니다.");
      });
  };

  /**
   * 채팅방 입장
   * @param {*} roomId 입장할 채팅방 id
   */
  const enterRoom = (roomId) => {
    const sender = getCookie('member').name;
    if (sender !== "") {
      localStorage.setItem("wschat.sender", sender);
      localStorage.setItem("wschat.roomId", roomId);
      navigate(`/room/enter/${roomId}`);
    }
  };

  // 컴포넌트가 처음 렌더링될 때 채팅방 목록을 가져온다.
  useEffect(() => {
    findAllRoom();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h3>채팅방 리스트</h3>
        </div>
      </div>

      <div className="input-group">
        <div className="input-group-prepend">
          <label className="input-group-text">방제목</label>
        </div>
        <input
          type="text"
          className="form-control"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          onKeyUp={(e) => e.key === "Enter" && createRoom()}
        />
        <div className="input-group-append">
          <button
            className="btn btn-primary"
            type="button"
            onClick={createRoom}
          >
            채팅방 개설
          </button>
        </div>
      </div>

      <ul className="list-group">
        {chatrooms.map((item) => (
          <li
            className="list-group-item list-group-item-action"
            key={item.roomId}
            onClick={() => enterRoom(item.roomId)}
          >
            {item.name}
            <span>{item.userCount}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MainPage;
