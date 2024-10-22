/* eslint-disable no-undef */
const BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://localhost:3000/'
  : 'http://localhost:8080/';

export default BASE_URL;
