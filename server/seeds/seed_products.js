import { Product } from '../src/models/product.js'

export async function seed () {
  const product = await Product.findOneBy({ slug: 'the-minimalist-entrepreneur' })
  if (product) return

  return Product.create({
    slug: 'the-minimalist-entrepreneur',
    title: 'The Minimalist Entrepreneur'
  })
}
