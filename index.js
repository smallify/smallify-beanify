const Beanify = require('beanify')
const beanifyAutoload = require('beanify-autoload')
const path = require('path')

module.exports = function (smallify, opts, done) {
  const { beanify: beanifyOptions, autoloads = [] } = opts

  const { $log, $root } = smallify
  const beanify = Beanify(beanifyOptions || {})

  $root.addHook('onClose', function () {
    $log.info('beanify closing')
    beanify.close(err => {
      if (err) {
        return $log.error(`beanify close error:${err.message}`)
      }
      $log.info('beanify closed')
    })
  })

  for (let loadOptions of autoloads) {
    if (typeof loadOptions === 'string') {
      loadOptions = {
        dir: loadOptions
      }
    }

    beanify.register(beanifyAutoload, {
      dir: path.join(process.cwd(), loadOptions.dir),
      dirAsScope: loadOptions.dirAsScope || false
    })
  }

  $root.decorate('$beanify', beanify)
  $root.decorateRequest('$beanify', beanify)
  $root.decorateReply('inject', function (route) {
    return beanify.inject(route).then(data => {
      this.send(data)
    })
  })

  beanify.decorate('$smallify', $root)
  beanify.ready(done)
}
