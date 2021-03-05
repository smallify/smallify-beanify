import { Smallify } from 'smallify'
import { SmallifyBeanify, BeanifyOptions } from './types/options'
import { Beanify, Inject } from 'beanify'

declare const beanify: SmallifyBeanify

export = beanify

declare module 'smallify' {
  interface SmallifyPlugin {
    (plugin: SmallifyBeanify, opts: BeanifyOptions): Smallify
  }

  interface Smallify {
    $beanify: Beanify
  }

  interface Request {
    $beanify: Beanify
  }

  interface Reply {
    inject(route: Inject): PromiseLike<void>
  }
}

declare module 'beanify' {
  interface Beanify {
    $smallify: Smallify
  }
}
