import { Button } from './components/Form'
import { Popup } from './components/Popup'
import { Rating } from './components/Rating'
import { Reviews } from './components/Reviews'
import './index.css'

export function App ({ product, rating, reviews }) {
  return (
    <>
      <h1 className="primary">{ product.title }</h1>
      <div className="score">
        <Rating rating={rating} />
        <div>
          <Button>Add review</Button>
        </div>
      </div>
      <hr className="divider"/>
      <Reviews reviews={reviews} />
      <Popup />
    </>
  )
}
