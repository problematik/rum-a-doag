import { BaseModel } from './base.js'

export class Review extends BaseModel {
  static tableName = 'reviews'

  toJSON () {
    return {
      ...this.attrs,
      rating: this.attrs.rating / 10
    }
  }
}
