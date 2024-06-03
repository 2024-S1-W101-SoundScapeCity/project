import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8081/',
  headers: { 
    'Content-Type': 'text/html;',
    'Content-Type': 'application/json;',
    'Content-Security-Policy-Report-Only': "default-src 'self'; script-src 'self' 'unsafe-inline' http://localhost:8080 http://localhost:8098; connect-src 'self' ws://localhost:8080 ws://localhost:8098;" 
  }
})
// return connector to backend service

export default api
