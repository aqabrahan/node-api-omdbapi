const express = require('express')
const response1 = require('../../examples/response1.js')

module.exports = () => {
  const router = express.Router()

  router.get('/', async (req, res, next) => {
    try {
      res.json(response1)
    } catch (e) {
      next(e)
    }
  })

  return router
}
