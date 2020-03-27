
const BaseService = require('./base');

class MoviesService extends BaseService {

  getMovies(params) {
    const url = ``;
    return this.get(url,{ params });
  }

  getMovie(params) {
    const url = ``;
    return this.get(url,{ params });
  }

}

module.exports = new MoviesService();
