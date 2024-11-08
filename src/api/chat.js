import axios from "axios";

export const API_SERVER_HOST = "http://localhost:8083";

const prefix = `${API_SERVER_HOST}/chat`;

export const getList = async () => {
  const res = await axios.get(`${prefix}/rooms`);
  return res.data;
};

export const getOne = async (roomId) => {
  const res = await axios.get(`${prefix}/room/${roomId}`);
  return res.data;
};

export const createRoomRequest = async (name) => {
  const res = await axios.post(`${prefix}/room`, name);
  return res.data;
};
