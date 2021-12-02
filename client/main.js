import './styles/main.css'
import './styles/stars.css'
import './styles/reviews.css'
import './styles/form.css'
import './styles/popup.css'

window.addEventListener('load', init)

function init () {
  let selectedRating, buttonDisabled

  const $mainEl = document.getElementById('root')
  const $addReviewBtn = $mainEl.querySelector('button[id="add-review"]')
  const $popup = $mainEl.querySelector('div.popup')

  const $submitReviewBtn = $popup.querySelector('button')
  const $reviewTextarea = $popup.querySelector('textarea')
  const updateSelectedRating = newRating => {
    selectedRating = newRating
    if (buttonDisabled !== false) {
      $submitReviewBtn.disabled = false
    }
  }
  const getSelectedRating = () => selectedRating

  const $popupStars = Array.from($popup.querySelectorAll('.star-icon')).reverse()
  $popupStars.forEach((el, i) => {
    el.addEventListener('click', reviewStarClicked.bind(null, i + 1, $popupStars, updateSelectedRating))
  })
  $addReviewBtn.addEventListener('click', addReviewClicked.bind(null, $popup, $mainEl))

  $submitReviewBtn.addEventListener('click', reviewSubmitClicked.bind(null, $submitReviewBtn, getSelectedRating, $reviewTextarea))
}

function addReviewClicked ($popup, $mainEl, e) {
  e.preventDefault()
  $popup.classList.remove('hidden')
  $mainEl.classList.add('popup-open')
}

function reviewStarClicked (selectedRating, $stars, updateRating) {
  $stars.forEach((star, i) => {
    const selected = i + 1 <= selectedRating
    const hasSelectedClass = star.classList.contains('selected')
    if (selected && !hasSelectedClass) star.classList.add('selected')
    if (!selected && hasSelectedClass) star.classList.remove('selected')
  })

  updateRating(selectedRating)
}

function reviewSubmitClicked ($submitBtn, getSelectedRating, $reviewTextarea, e) {
  e.preventDefault()
  $submitBtn.disabled = true
  const body = $reviewTextarea.value
  const selectedRating = getSelectedRating()
  window.alert(`Submitting ${selectedRating} with ${body}`)
}
