import { useState } from 'react'
import { Button } from './components/Form/index'
import { Popup } from './components/Popup'
import { Rating } from './components/Rating'
import { Reviews } from './components/Reviews'
import { submitReview } from './utils'
import './index.css'

export function App ({ product, rating, reviews }) {
  const [popupShown, setPopupShown] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleReviewSubmit = async (rating, review) => {
    setSubmitting(true)
    const res = await submitReview(rating, review)
    setSubmitting(false)
    window.alert(res)
  }

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
      { popupShown ? <Popup onSubmit={handleReviewSubmit} submitting={submitting} /> : null }
    </>
  )
}
