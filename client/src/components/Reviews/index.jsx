import { StarRating } from '../Rating'
import './index.css'

export function Reviews ({ reviews }) {
  if (!reviews || reviews.length === 0) {
    return <div className="reviews">No reviews jet.</div>
  }

  return (
    <div className="reviews">
      {reviews.map(review => <Review key={review.id} review={review} />)}
    </div>
  )
}

function Review ({ review }) {
  const { rating, review: userReview } = review
  return (
    <div className="review">
      <span className="stars">
        <StarRating rating={rating} />
      </span>
      <span className="body">
        <span className="value">{ rating }</span>
        { userReview ? <span className="text">, { userReview }</span> : null}
      </span>
    </div>
  )
}
