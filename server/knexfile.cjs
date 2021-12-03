const { resolve } = require('path')
require('dotenv').config({ path: resolve('../.env') })

if (process.env.DB_PATH === undefined) {
  throw new Error('Ensure DB_PATH is configured in .env.')
}

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
