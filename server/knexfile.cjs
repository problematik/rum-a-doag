require('dotenv').config()

const filename = process.env.NODE_ENV === 'test'
  ? '/tmp/test-db.sqlite'
  : process.env.DB_PATH

module.exports = {
  client: 'sqlite3',
  connection: {
    filename
  },
  migrations: {
    directory: './migrations'
  }
}
