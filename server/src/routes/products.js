import { Router } from 'express'
import bodyParser from 'body-parser'
import { wrap } from './index.js'
import { Product } from '../models/product.js'
import { Review } from '../models/review.js'
import { render } from '../utils/view.js'

export const router = Router()

router.use(bodyParser.json())

router.get('/:slug', wrap(async (req, res) => {
  const { slug } = req.params
  const product = await Product.findOneBy({ slug })
  if (!product) {
    return res.send(404)
  }

  const [reviews, rating] = await Promise.all([
    product.reviews(),
    product.getRating()
  ])

  render(res, {
    product: product.attrs,
    rating,
    reviews: reviews.map(review => review.attrs)
  })
}))

router.post('/:id/review', wrap(async (req, res) => {
  const { id } = req.params

  const { rating, review: submittedReview } = req.body || {}
  const product = await Product.findOneBy({ id })
  if (!product) return res.send(404)
  if (!rating || rating < 1 || rating > 5) {
    return res.status(400).send({ error: 'Invalid rating value' })
  }
  const review = await Review.create({ productId: id, rating, review: submittedReview || null })
  if (!review) {
    console.error('Unable to create review')
    return res.status(500).send({ error: 'Unable to submit review. Try again later' })
  }

  res.status(201).send({ id: review.attrs.id })
}))
