import { db } from '../utils/db.js'

export class BaseModel {
  constructor (attrs) {
    this.attrs = attrs
  }

  static get db () {
    if (!this.tableName) { throw new Error('Child class must set tableName') }
    return db(this.tableName)
  }

  get db () {
    if (!this.constructor.tableName) { throw new Error('Child class must set tableName') }
    return db(this.constructor.tableName)
  }

  static _rowToClass (row) {
    if (row && row.length) {
      return new this(row[0])
    }

    return null
  }

  static findFirst () {
    return this.db
      .orderBy('createdAt', 'asc')
      .limit(1)
      .then(this._rowToClass.bind(this))
  }

  static findOneBy (attrs) {
    return this.db
      .where(attrs)
      .limit(1)
      .then(this._rowToClass.bind(this))
  }
}
