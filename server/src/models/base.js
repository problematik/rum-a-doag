import { db } from '../utils/db.js'

export class BaseModel {
  static get db () {
    if (!this.tableName) { throw new Error('Child class must set tableName') }
    return db(this.tableName)
  }

  get db () {
    if (!this.constructor.tableName) { throw new Error('Child class must set tableName') }
    return db(this.constructor.tableName)
  }
}
