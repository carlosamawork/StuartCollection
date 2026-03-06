'use client'

import {useRef, useState} from 'react'
import {usePathname} from 'next/navigation'

export default function useHeader({data}: any) {
  const pathname = usePathname()

  const headerRef = useRef<HTMLElement>(null)

  const [activeItem, setActiveItem] = useState<any>(null)
  const [submenuOpen, setSubmenuOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isArtwork = pathname.includes('collection/artwork')
  const backgroundColor = isArtwork ? '#E7ECF2' : '#fff'

  const openSubmenu = (item: any) => {
    setActiveItem(item)
    setSubmenuOpen(true)
  }

  const closeSubmenu = () => {
    setSubmenuOpen(false)
    setActiveItem(null)
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen((value) => !value)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  return {
    headerRef,
    activeItem,
    backgroundColor,
    submenuOpen,
    setSubmenuOpen,
    openSubmenu,
    closeSubmenu,
    mobileMenuOpen,
    toggleMobileMenu,
    closeMobileMenu,
  }
}
