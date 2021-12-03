function getMeta (name) {
  const meta = document.head.querySelector(`meta[name="${name}"]`)
  if (!meta) throw new Error(`Meta ${name} element not found`)
  return JSON.parse(meta.content)
}

export function getProduct () {
  return getMeta('product')
}

export function getRating () {
  return getMeta('rating')
}

export function getReviews () {
  return getMeta('reviews')
}
