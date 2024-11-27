import jwtAxios from "../util/jwtUtils";


export const API_SERVER_HOST = "http://localhost:8083";

const prefix = `${API_SERVER_HOST}/chat`;

export const getList = async () => {
  const res = await jwtAxios.get(`${prefix}/rooms`);
  return res.data;
};

export const getOne = async (roomId) => {
  const res = await jwtAxios.get(`${prefix}/room/${roomId}`);
  return res.data;
};

export const createRoomRequest = async (name) => {
  const res = await jwtAxios.post(`${prefix}/room`, name);
  return res.data;
};

export const quitRoomApi = async (roomId) => {
  const res = await jwtAxios.post(`${prefix}/room/${roomId}/quit`);
  return res.data;
}