import { BaseModel } from './base.js'
import { Review } from './review.js'

export class Product extends BaseModel {
  static tableName = 'products'

  reviews () {
    return Review.findBy({ productId: this.attrs.id })
  }

  async getRating () {
    const reviews = await this.reviews()
    const ratings = reviews.reduce((memo, review) => {
      memo += review.attrs.rating
      return memo
    }, 0)

    return reviews.length ? Math.round((Math.round((ratings / reviews.length) * 10) / 100) * 2) / 2 : '-'
  }
}
