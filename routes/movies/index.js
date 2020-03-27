const express = require('express')
const MovieServices = require('../../services/movies');

module.exports = () => {
  const router = express.Router()

  router.get('/search/:s/sort/:sorter(Year|Title)', (req, res, next) => {
    requestMovies(req, res, next);
  })
  router.get('/search/:s/sort/:sort(Year|Title)/order/:order(Asc|Desc)', (req, res, next) => {
    requestMovies(req, res, next);
  })
  router.get('/search/:s', (req, res, next) => {
    requestMovies(req, res, next);
  });

  router.get('/:imdbID/cast', (req, res, next) => {
    requestMovie(req, res, next, true);
  });
  router.get('/:imdbID', (req, res, next) => {
    requestMovie(req, res, next);
  });

  requestMovie = async  (req, res, next, isCast = false) => {
    const id = req.params.imdbID;
    const query = req.query.fields;
    const params = {
      apiKey: `${process.env.OMDBKEY}`,
      i: id
    }
    try {
      MovieServices.getMovie(params)
      .then(response => {
        let result = {};
        const { data } = response;
        if (query) {
          const finder = query.split(',');
          finder.forEach(item => {
            if(data[item]) {
              result[item] = data[item];
            }
          })
        } else if (isCast) {
          result = {
            Director: data['Director'].split(','),
            Writer: data['Writer'].split(','),
            Actors: data['Actors'].split(',')
          }
        } else {
          result = data;
        }
        res.json(result);
        next()
      })
      .catch(err => {
        next(err);
      })
    } catch (e) {
      next(e)
    }
  };
  requestMovies = async (req, res, next) => {
    const params = {
      ...req.params,
      apiKey: `${process.env.OMDBKEY}`
    }
    try {

      MovieServices.getMovies(params)
      .then(response => {
        const finalResult = []
        if (response.data.Search) {
          response.data.Search.forEach((item) => {
            finalResult.push(item)
          })
        }
        res.json(finalResult);
        next()
      })
      .catch(err => {
        next(err);
      })
    } catch (e) {
      next(e)
    }
  }

  return router
}
