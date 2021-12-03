import './index.css'

export function Button ({ disabled, children }) {
  return <button disabled={disabled}>{children}</button>
}

export function Textarea ({ placeholder = 'Start typing...', rows = 1 }) {
  return <textarea placeholder={placeholder} rows={rows}></textarea>
}
