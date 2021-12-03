import { useState, useEffect } from 'react'
import { Button } from './components/Form/index'
import { Popup } from './components/Popup'
import { Rating } from './components/Rating'
import { Reviews } from './components/Reviews'
import { submitReview, useListen } from './utils'
import './index.css'

function sortReviews (reviews) {
  return [...reviews].sort((first, second) => {
    return new Date(first.createdAt) < new Date(second.createdAt)
      ? 1
      : -1
  })
}

export function App ({ product, rating, reviews }) {
  const [popupShown, setPopupShown] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [sortedReviews, setSortedReviews] = useState(reviews)
  const [latestRating, setLatestRating] = useState(rating)
  const [reviewAdded] = useListen(`product.${product.id}`, 'review-added')
  const [updatedRating] = useListen(`product.${product.id}`, 'rating-updated')

  useEffect(() => {
    if (reviewAdded) {
      setSortedReviews(sortReviews([...sortedReviews, reviewAdded]))
    }
  }, [reviewAdded])

  useEffect(() => {
    if (updatedRating !== null && updatedRating !== undefined) {
      setLatestRating(updatedRating)
    }
  }, [updatedRating])

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
        <Rating rating={latestRating} />
        <div>
          <Button onClick={() => setPopupShown(true)}>Add review</Button>
        </div>
      </div>
      <hr className="divider"/>
      <Reviews reviews={sortedReviews} />
      { popupShown ? <Popup onSubmit={handleReviewSubmit} submitting={submitting} /> : null }
    </>
  )
}
