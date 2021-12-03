import test from 'ava'
import express from 'express'
import bodyParser from 'body-parser'
import request from 'supertest'
import { router } from './products.js'
import { Product } from '../models/product.js'
import { Review } from '../models/review.js'

const app = express()
app.use(router)

let productId
test.before(async () => {
  const product = await Product.create({
    slug: 'some-slug',
    title: 'Some nice title'
  })
  productId = product.attrs.id
})

function makeRequest (id, body) {
  return request(app)
    .post(`/${id}/review`)
    .set('Content-Type', 'application/json')
    .send(JSON.stringify(body))
}

test('POST /products/:existing/review - stores review and returns 201', async t => {
  const reviewId = await makeRequest(productId, { rating: 4, review: 'foo' })
    .expect(201)
    .then(res => res.body.id)

  const review = await Review.findOneBy({ id: reviewId })
  t.is(review.attrs.rating, 4, 'Rating not stored correctly')
  t.is(review.attrs.review, 'foo', 'Review body not stored correctly')
})

test('POST /products/:existing/review - body is optional', async t => {
  const reviewId = await makeRequest(productId, { rating: 1 })
    .then(res => res.body.id)

  const review = await Review.findOneBy({ id: reviewId })
  t.is(review.attrs.review, null, 'Review body not stored correctly')
})

test('POST /products/:existing/review - returns 400 for invalid rating', async t => {
  const ratings = [0, 6]
  for (const rating of ratings) {
    const res = await makeRequest(productId, { rating })
      .expect(400)

    t.is(res.body.errorCode, 1, 'Invalid error code returned')
  }
})

test('POST /products/:non-existing/review - returns 404', async t => {
  const res = await makeRequest(-1, { rating: 5, review: 'bar' })

  t.is(res.status, 404, 'Invalid response code returned')
})
