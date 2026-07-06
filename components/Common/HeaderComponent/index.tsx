'use client'

import Link from 'next/link'
import s from './HeaderComponent.module.scss'
import {motion, AnimatePresence, useReducedMotion} from 'framer-motion'
import Container from '@/components/Common/ui/Container'
import {ButtonLink} from '@/components/Common/ui/Buttons/components/ButtonLink'
import SubmenuComponent from './components/Submenu'
import useHeader from '@/components/Common/HeaderComponent/hooks/useHeader'
import SvgLogoUcSanDiego from '@/components/Common/HeaderComponent/components/SvgLogoUcSanDiego'
import Menu from '@/components/Common/HeaderComponent/components/Menu'
import DateHeader from '@/components/Common/HeaderComponent/components/DateHeader'
import {useEffect} from 'react'
import Hamburger from '@/components/Common/HeaderComponent/components/Hamburger'
import MobileMenu from '@/components/Common/HeaderComponent/components/MobileMenu'

export default function HeaderComponent({data}: any) {
  const shouldReduceMotion = useReducedMotion()
  const {
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
  } = useHeader({data})

  useEffect(() => {
    console.log(
      '<!-- ----------------------------------------------------- -->\n' +
        '<!-- Code by MGTZM Studios, http://magatzem.studio (2026) -->\n' +
        '<!-- ----------------------------------------------------- -->',
    )
  }, [])

  console.log(data)

  return (
    <motion.header
      className={s.header}
      ref={headerRef}
      initial={shouldReduceMotion ? false : {opacity: 0}}
      animate={{opacity: 1}}
      transition={shouldReduceMotion ? {duration: 0} : {duration: 0.3, delay: 0.5}}
      // ✅ al salir de TODO el header (menu + submenu), cerramos
      onMouseLeave={closeSubmenu}
    >
      {/* ... top header igual ... */}
      <div className={s.topHeaderContainer} style={{backgroundColor}}>
        <Container>
          <div className={s.topHeader}>
            <div className={s.logo}>
              <Link href="/">STUART COLLECTION</Link>
            </div>
            <div className={s.right}>
              <div className={s.logoSanDiego}>
                <Link
                  href="https://stuartcollection.ucsd.edu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="UC San Diego – Stuart Collection website (opens in new tab)"
                >
                  <SvgLogoUcSanDiego aria-hidden="true" />
                </Link>
              </div>
              <div className={s.hamburger}>
                <Hamburger onClick={toggleMobileMenu} open={mobileMenuOpen} />
              </div>
            </div>
          </div>
        </Container>
      </div>

      <div className={s.mobileMenuContainer}>
        <MobileMenu
          data={data}
          isOpen={mobileMenuOpen}
          close={closeMobileMenu}
          backgroundColor={backgroundColor}
        />
      </div>

      <div className={s.menuHeaderContainer}>
        <Container className={s.menuHeader}>
          <Menu openSubmenu={openSubmenu} closeSubmenu={closeSubmenu} links={data?.menu?.links} />
          <div className={s.dateHeaderContainer}>
            <DateHeader data={data.openingHours} />
          </div>
          <ButtonLink href="/support-us" size="lg" aria-label="Support the Stuart Collection">
            Support
          </ButtonLink>
        </Container>
      </div>

      {/* ✅ Submenu animado y con contenido del item hover */}
      <AnimatePresence>
        {submenuOpen && (
          <motion.div
            className={s.submenuHeader}
            initial={shouldReduceMotion ? {opacity: 0} : {opacity: 0, y: -8}}
            animate={{opacity: 1, y: 0}}
            exit={shouldReduceMotion ? {opacity: 0} : {opacity: 0, y: -8}}
            transition={shouldReduceMotion ? {duration: 0} : {duration: 0.2}}
            // ✅ mantener abierto mientras estás encima del submenu
            onMouseEnter={() => setSubmenuOpen(true)}
          >
            <SubmenuComponent data={activeItem} additionalContent={data} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
