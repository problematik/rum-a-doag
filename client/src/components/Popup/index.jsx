import { useState, useEffect } from 'react'
import { Button, Textarea } from '../Form/index'
import { StarRating } from '../Rating'

import './index.css'

export function Popup ({ onSubmit }) {
  const [selectedRating, setSelectedRating] = useState(0)
  const [buttonDisabled, setButtonDisabled] = useState(true)
  const [review, setReview] = useState('')
  useEffect(() => {
    if (selectedRating !== 0) {
      setButtonDisabled(false)
    }
  }, [selectedRating])

  const handleSubmitClicked = () => {
    if (onSubmit) onSubmit(selectedRating, review)
  }

  return (
    <div className="popup">
      <div className="body">
        <div className="primary">What's your rating?</div>
        <div className="tertiary">Rating</div>
        <StarRating rating={selectedRating} editable={true} onClick={setSelectedRating}/>
        <div className="tertiary">Review</div>
        <Textarea onChange={setReview} value={review} />
        <div>
          <Button disabled={buttonDisabled} onClick={handleSubmitClicked}>Submit review</Button>
        </div>
      </div>
    </div>
  )
}
