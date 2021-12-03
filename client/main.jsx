import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './src/App'
import { getProduct, getRating, getReviews, connectIO } from './src/utils'

ReactDOM.render(
  <React.StrictMode>
    <App product={getProduct()} rating={getRating()} reviews={getReviews()}/>
  </React.StrictMode>,
  document.getElementById('root')
)

connectIO()
