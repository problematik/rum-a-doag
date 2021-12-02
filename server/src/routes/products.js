import { Router } from 'express'
import { wrap } from './index.js'
import { Product } from '../models/product.js'
import { render } from '../utils/view.js'

export const router = Router()

router.get('/:slug', wrap(async (req, res) => {
  const { slug } = req.params
  const product = await Product.findOneBy({ slug })
  if (!product) {
    return res.send(404)
  }

  render(res, { product: product.attrs, rating: 3, reviews: [] })
}))
