import { Button, Textarea } from '../Form/index'
import { StarRating } from '../Rating'

import './index.css'

export function Popup () {
  return (
    <div className="popup hidden">
      <div className="body">
        <div className="primary">What's your rating?</div>
        <div className="tertiary">Rating</div>
        <StarRating rating={0} editable={true} />
        <div className="tertiary">Review</div>
        <Textarea />
        <div>
          <Button disabled={true}>Submit review</Button>
        </div>
      </div>
    </div>
  )
}
