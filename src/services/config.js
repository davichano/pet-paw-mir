import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_BASE_URL}/api`;

export const getConfig = async (id) => {
  const response = await axios.get(`${BASE_URL}/setting/${id}`);
  return response.data;
  //return adaptConfig(response.data);
};

export const updateConfig = async (id, config) => {
  const response = await axios.patch(`${BASE_URL}/setting/${id}`, config);
  return response.data;
};
