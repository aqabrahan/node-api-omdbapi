const express = require('express')
const movies = require('./movies')
//const users = require('./users')

module.exports = () => {
  const router = express.Router()
  router.get('/', function(req, res){
    //res.send('cannot solved');
    res.send('Hello ExternalRoutes!');
  });
  router.use('/movies', movies());
  /* router.use('/movies', function (req, res, next) {
    res.json({af:32323232})
    next()
  }) */

  //router.use('/users', users)

  /* router.use((err, req, res, next) => {
    res.status(500).send('Something broke!')
    next()
  }) */
  return router;
}
