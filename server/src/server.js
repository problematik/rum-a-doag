import express from 'express'
import { resolve } from 'path'

const app = express()
const port = process.env.PORT

app.set('view engine', 'hbs')
app.set('views', resolve('./views'))

app.get('/products/:slug', (req, res) => {
  res.render('main')
})

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
}).on('error', err => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Selected port number ${port} is already in use. Please specify another port.`)
  } else {
    console.error(err)
  }
})
