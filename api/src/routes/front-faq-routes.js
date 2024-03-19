module.exports = (app, upload) => {
  const router = require('express').Router()
  const controller = require('../controllers/front/faq-controller.js')

  router.get('/', controller.findAll)
  router.get('/:id', controller.findOne)

  app.use('/api/front/faqs', router)
}
