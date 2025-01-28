import axios from 'axios';
console.log({"env": process.env.REACT_APP_API_URL})
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    // TODO: get a token and manually replace the tkn part for now
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM4MDc1NDQwLCJpYXQiOjE3MzgwNzQ1NDAsImp0aSI6IjdlMDNlMzcwMjZiNzQ0MmI4MWE2OTE3NTUyMTU4NDNmIiwidXNlcl9pZCI6NH0.1AlSeV9FXZSyizIpWODRWIPkI3TVKLKoLzPZDO2aJTw'
  }
});

export default api;
