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
      {starValues.map(value => {
        const selected = rating > value - 1
        const isHalf = selected && rating < value
        return <Star onClick={handleClick} key={value} value={value} selected={selected} isHalf={isHalf} editable={editable} />
      })}
    </span>
  )
}

function Star ({ value, selected, editable, onClick, isHalf }) {
  const className = cs('star-icon', {
    selected: selected,
    editable: editable,
    half: isHalf
  })

  const handleClick = (e) => {
    const isHalf = e.target.getAttribute('class') === 'half'
    onClick(isHalf ? value - 0.5 : value)
  }
  return (
    <span datavalue={value} className={className} dangerouslySetInnerHTML={{ __html: StarIcon }} onClick={handleClick}/>)
}
