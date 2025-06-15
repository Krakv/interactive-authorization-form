import React from 'react'

interface CheckboxProps {
  id: string
  checked: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  label: string
}

export const Checkbox: React.FC<CheckboxProps> = ({
  id,
  checked,
  onChange,
  label,
}) => (
  <label className="remember-me">
    <input id={id} type="checkbox" checked={checked} onChange={onChange} />
    {label}
  </label>
)
