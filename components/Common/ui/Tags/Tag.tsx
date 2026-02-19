'use client'

import s from './Tags.module.scss'

export interface TagProps {
  label: string
  active?: boolean
  onClick?: () => void
  className?: string
}

export function Tag({label, active, onClick, className}: TagProps) {
  const customClassName = `${className} ${s.tag} ${active ? s[`tag--active`] : ''} ${onClick ? s[`tag--clickable`] : ''}`

  if (onClick) {
    return (
      <button onClick={onClick} className={customClassName}>
        {label}
      </button>
    )
  }

  return <span className={customClassName}>{label}</span>
}
