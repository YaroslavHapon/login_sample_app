import axios from 'axios'
const ROOT_URL = 'http://localhost:8000';

export default class Api{
  static signUp({ email, password }) {
    return axios.post(`${ROOT_URL}/signup`, { email, password })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        let err = new Error(error);
        err.message = error.response.data.error;
        throw err;
      })
  }

  static signIn({ email, password }) {
    return axios.post(`${ROOT_URL}/signin`, { email, password })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        let err = new Error(error);
        err.message = error.response.data.error;
        throw err;
      })
  }

  static fetchMessage (){
    return axios.get(`${ROOT_URL}/dashboards`, { headers: { 'Authentication': window.localStorage.getItem('token') }})
      .then(response => {
        return response.data;
      })
      .catch(error => {
        let err = new Error(error);
        err.message = error.response.data.error;
        throw err;
      })
  }

  static setItem (itemName, token) {
    localStorage.setItem(itemName, token);
  }

  static removeItem (itemName) {
    localStorage.removeItem(itemName);
  }
}