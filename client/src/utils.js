import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

let socket

function getMeta (name) {
  const meta = document.head.querySelector(`meta[name="${name}"]`)
  if (!meta) throw new Error(`Meta ${name} element not found`)
  return JSON.parse(meta.content)
}

export function getProduct () {
  return getMeta('product')
}

export function getRating () {
  return getMeta('rating')
}

export function getReviews () {
  return getMeta('reviews')
}

export function submitReview (rating, review) {
  const { id } = getProduct()

  return new Promise(resolve => {
    fetch(`/products/${id}/review`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        review,
        rating
      })
    }).then(res => {
      if (res.status < 300) {
        resolve('Review submitted! Thank you.')
      } else if (res.status === 404) {
        resolve('The product does not exists')
      } else {
        resolve('Request failed, please try again later.')
      }
    })
  })
}

export function connectIO () {
  socket = io({ transports: ['websocket'] })

  socket.on('connect_error', (err) => {
    console.log('Error connecting to socketio')
    console.log(err)
  })
}

export function useListen (room, eventName) {
  const [message, setMessage] = useState(null)

  useEffect(() => {
    socket.emit('room', room)
    socket.on(eventName, onMessage)
    return () => { socket.off(eventName, onMessage) }
  }, [])

  function onMessage (message) {
    setMessage(message)
  }

  return [message]
}
