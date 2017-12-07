import axios from 'axios'
import { saveToken, getValidToken } from './token'

const api = axios.create({
  baseURL: 'http://localhost:7000'
})

export function setToken(token) {
  saveToken(token)

  if (token) {
    // Set the Authorization header for all requests in the future
    api.defaults.headers.common['Authorization'] = `Bearer ${ token }`
  }
  else {
    delete api.defaults.headers.common['Authorization']
  }
}
// Validates the token, and if it's invalid, remove it from local storage
setToken(getValidToken())

export default api