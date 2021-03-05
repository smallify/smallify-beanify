const { route } = require('beanify-autoload')

module.exports = route({
  handler (req, rep) {
    rep.send('hello world')
  }
})
