import axios from 'axios';
import { endpoint } from '../config';

const METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

const ApiClient = {};

METHODS.forEach((method) => {
  ApiClient[method] = (path, { data, params } = {}) => new Promise((resolve, reject) => {

    const options = {
      method,
      url: `${endpoint}${path}`,
      withCredentials: true
    };

    if (data) {
      options.data = data;
    }

    if (params) {
      options.params = params;
    }

    axios(options)
    .then((response) => {
      resolve(response.data);
    }, (error) => {

      if (error.response && error.response.status === 401) {
        localStorage.removeItem('isLogin');
        window.location.href = '/login';
      }
      reject(error);
    });
  });

});

export default ApiClient;
