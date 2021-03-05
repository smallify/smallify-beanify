const { route } = require('beanify-autoload')

module.exports = route({
  handler (req, rep) {
    const { a, b } = req.body
    rep.send(a - b + '')
  }
})
