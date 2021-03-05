const Smallify = require('smallify')
const smallifyBeanify = require('./index')

const smallify = Smallify({
  pino: {
    prettyPrint: true
  }
})

smallify.register(smallifyBeanify, {
  beanify: {
    pino: {
      prettyPrint: true
    }
  },
  autoloads: ['./beanify/auto1', { dir: './beanify/auto2', dirAsScope: true }]
})

smallify.route({
  url: '/',
  method: 'GET',
  schema: {
    response: {
      type: 'string'
    }
  },
  async handler (req, rep) {
    // rep.type('text/plain')
    // await rep.inject({
    //   url: 'hello.world',
    //   body: {
    //     a: 10,
    //     b: 7
    //   }
    // })
    await rep.inject({
      url: 'add',
      body: {
        a: 10,
        b: 22
      }
    })
  }
})

smallify.ready(err => {
  err && smallify.$log.error(err.message)
  smallify.print()
  smallify.$beanify.print()
  // smallify.close()
})
