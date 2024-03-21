import axios from 'axios'

// return connector to backend service
export default () => {
  return axios.create({ baseURL: 'http://localhost:8081/' })
}
