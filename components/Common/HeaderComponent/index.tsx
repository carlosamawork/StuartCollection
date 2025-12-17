'use client'

import Link from 'next/link'
import s from './HeaderComponent.module.scss'
import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'


export default function HeaderComponent({ data }: any) {
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    console.log(
      '<!-- ----------------------------------------------------- -->\n' +
      '<!-- Code by Carlos Salvador, http://cachosalvador.com (2025)                   -->\n' +
      '<!-- ----------------------------------------------------- -->');
  }, [])

  return (
    <motion.header
      className={`${s.header}`}
      ref={headerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.5 }}
    >
      <h4>Carlos Salvador's header</h4>
    </motion.header>
  )
}