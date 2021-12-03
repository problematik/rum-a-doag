import { useState } from 'react'
import { Button } from './components/Form/index'
import { Popup } from './components/Popup'
import { Rating } from './components/Rating'
import { Reviews } from './components/Reviews'
import './index.css'

export function App ({ product, rating, reviews }) {
  const [popupShown, setPopupShown] = useState(false)

  return (
    <>
      <h1 className="primary">{ product.title }</h1>
      <div className="score">
        <Rating rating={rating} />
        <div>
          <Button onClick={() => setPopupShown(true)}>Add review</Button>
        </div>
      </div>
      <hr className="divider"/>
      <Reviews reviews={reviews} />
      { popupShown ? <Popup /> : null }
    </>
  )
}
