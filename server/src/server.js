import express from 'express'
import http from 'http'
import { resolve } from 'path'
import { router as fallbackRouter } from './routes/index.js'
import { router as productsRouter } from './routes/products.js'
import { init as initHbs } from './utils/view.js'
import { start as startSocket } from './utils/io.js'

const app = express()
const server = http.createServer(app)
const port = process.env.SERVER_PORT

app.set('view engine', 'hbs')
app.set('views', resolve('./views'))

initHbs()

app.use('/products', productsRouter)
app.use('*', fallbackRouter)

startSocket(server)

app.use((err, req, res, next) => {
  console.error(err.stack)
  let message = 'Something went wrong :/'
  if (process.env.NODE_ENV !== 'production') {
    message += `<br>${err.stack}`
  }
  res.status(500).send(message)
})

server.listen(port, () => {
  console.log(`Server started on port ${port}`)
}).on('error', err => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Selected port number ${port} is already in use. Please specify another port.`)
  } else {
    console.error(err)
  }
})
