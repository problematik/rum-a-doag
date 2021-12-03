import express from 'express'
import { resolve } from 'path'
import { router as fallbackRouter } from './routes/index.js'
import { router as productsRouter } from './routes/products.js'
import { init as initHbs } from './utils/view.js'

const app = express()
const port = process.env.PORT

app.set('view engine', 'hbs')
app.set('views', resolve('./views'))

initHbs()

app.use('/products', productsRouter)
app.use('*', fallbackRouter)

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
}).on('error', err => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Selected port number ${port} is already in use. Please specify another port.`)
  } else {
    console.error(err)
  }
})
