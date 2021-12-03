import './index.css'

export function Button ({ disabled, children, onClick }) {
  return <button disabled={disabled} onClick={onClick}>{children}</button>
}

export function Textarea ({ placeholder = 'Start typing...', rows = 1, value, onChange }) {
  const handleChange = (e) => {
    if (onChange) onChange(e.target.value)
  }

  return <textarea placeholder={placeholder} rows={rows} onChange={handleChange} value={value}></textarea>
}
