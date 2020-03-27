const axios = require('axios');
const restClient = axios.create({
  baseURL: 'http://www.omdbapi.com',
  timeout: 10000
});

class BaseService {

  get(url, options = {}, headers) {
    return this.request(url, 'get', options, headers);
  }

  post(url, options, headers) {
    return this.request(url, 'post', options, headers);
  }
  postLogin(url, options) {
    return this.requestLogin(url, 'post', options);
  }

  put(url, options, headers) {
    return this.request(url, 'put', options, headers);
  }

  del(url, headers) {
    return this.request(url, 'delete', headers);
  }

  request(url, method, options, headers = {}) {
    console.info('Service Request to API: ', {
      url: `${url}`,
      method,
      options: JSON.stringify(options),
    });
    return restClient[method](`${url}`, options, headers);
  }

}
module.exports = BaseService;