import hbs from 'hbs'
import { resolve } from 'path'

export function init () {
  hbs.registerPartials(resolve('./views/partials'))

  hbs.registerHelper('JSON', (value) => {
    return JSON.stringify(value)
  })

  hbs.registerHelper('starSelected', (value, higherThan) => {
    return value > higherThan
  })
}

export function render (res, opts = {}) {
  const viewOpts = {
    ...opts,
    CLIENT_PORT: process.env.CLIENT_PORT
  }
  console.log('Rendering view', { viewOpts })

  res.render('main', viewOpts)
}
