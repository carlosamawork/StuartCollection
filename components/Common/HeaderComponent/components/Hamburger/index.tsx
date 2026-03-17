'use client'

import s from './Hamburger.module.scss'

export default function Hamburger({open, onClick}: any) {
  return (
    <button
      onClick={onClick}
      className={`${s.hamburger} ${open ? s['hamburger--open'] : ''}`}
      aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
      aria-expanded={open}
      aria-controls="mobile-menu"
    >
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </button>
  )
}
