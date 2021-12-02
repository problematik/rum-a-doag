import { Router } from 'express'
import { Product } from '../models/product.js'

// adds the ability to easily set async functions for route handlers
export function wrap (cb) {
  return (req, res, next) => {
    return cb(req, res, next)
      .catch(next)
  }
}

export const router = Router()

router.get('*', wrap(async (req, res) => {
  const product = await Product.findFirst()
  if (!product) {
    return res.send(404)
  }
  res.redirect(`/products/${product.attrs.slug}`)
}))
