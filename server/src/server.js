import express from 'express'

const app = express()
const port = process.env.PORT

app.listen(port, () => {
  console.log('Server started')
}).on('error', err => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Selected port number ${port} is already in use. Please specify another port.`)
  } else {
    console.error(err)
  }
})
