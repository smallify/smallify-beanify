import { Smallify, PluginOptions } from 'smallify'
import { BeanifyOptions } from 'beanify'
import { AutoloadOptions } from 'beanify-autoload'

export class BeanifyOptions extends PluginOptions {
  beanify: BeanifyOptions
  autoloads: Array<string | AutoloadOptions>
}

export type SmallifyBeanify = {
  (smallify: Smallify, opts: BeanifyOptions): Promise<void>
}
