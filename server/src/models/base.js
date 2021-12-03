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

  static _rowsToClass (rows) {
    return rows.map(row => new this(row))
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

  static create (attrs) {
    return this.db
      .insert(attrs)
      .then(id => {
        if (id) {
          return this.findOneBy({ id })
        }

        return null
      })
  }

  static findBy (attrs) {
    return this.db
      .where(attrs)
      .orderBy('id', 'desc')
      .then(this._rowsToClass.bind(this))
  }
}
