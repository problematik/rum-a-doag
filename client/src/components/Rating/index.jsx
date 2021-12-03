import cs from 'classnames'
import StarIcon from './star.svg?raw'
import './index.css'

export function Rating ({ rating }) {
  return (
    <div className='rating'>
      <span className='value'>{rating}</span>
      <StarRating rating={rating} />
    </div>
  )
}

export function StarRating ({ editable, rating, onClick }) {
  rating = rating === '-' ? 0 : rating
  const starValues = [5, 4, 3, 2, 1]
  const className = cs('star-rating', {
    editable: editable
  })

  const handleClick = (value) => {
    if (onClick) onClick(value)
  }

  return (
    <span className={className}>
      {starValues.map(value => <Star onClick={() => handleClick(value)} key={value} value={value} selected={rating > value - 1} editable={editable} />)}
    </span>
  )
}

function Star ({ value, selected, editable, onClick }) {
  const className = cs('star-icon', {
    selected: selected,
    editable: editable
  })
  return (
    <span datavalue={value} className={className} dangerouslySetInnerHTML={{ __html: StarIcon }} onClick={onClick}/>)
}
