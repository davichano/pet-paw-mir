/* eslint-disable no-undef */
const BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://pet-paw-mir-backend-production.up.railway.app/'
  : 'http://localhost:3000/';

export default BASE_URL;
