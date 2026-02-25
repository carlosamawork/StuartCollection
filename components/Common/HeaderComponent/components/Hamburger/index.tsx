'use client'

import s from './Hamburger.module.scss'

export default function Hamburger({open, onClick}: any) {
  return (
    <button onClick={onClick} className={`${s.hamburger} ${open ? s['hamburger--open'] : ''}`}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </button>
  )
}
