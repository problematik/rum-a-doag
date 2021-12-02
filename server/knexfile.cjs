require('dotenv').config()

const filename = process.env.DB_PATH

module.exports = {
  client: 'sqlite3',
  connection: {
    filename
  },
  migrations: {
    directory: './migrations'
  }
}
