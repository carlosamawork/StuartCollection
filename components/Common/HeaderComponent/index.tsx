'use client'

import Link from 'next/link'
import s from './HeaderComponent.module.scss'
import {motion, AnimatePresence} from 'framer-motion'
import Container from '@/components/Common/ui/Container'
import {ButtonLink} from '@/components/Common/ui/Buttons/components/ButtonLink'
import SubmenuComponent from './components/Submenu'
import useHeader from '@/components/Common/HeaderComponent/hooks/useHeader'
import SvgLogoUcSanDiego from '@/components/Common/HeaderComponent/components/SvgLogoUcSanDiego'
import Menu from '@/components/Common/HeaderComponent/components/Menu'
import DateHeader from '@/components/Common/HeaderComponent/components/DateHeader'
import {useEffect} from 'react'
import Hamburger from '@/components/Common/HeaderComponent/components/Hamburger'

export default function HeaderComponent({data}: any) {
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
  } = useHeader({data})

  useEffect(() => {
    console.log(
      '<!-- ----------------------------------------------------- -->\n' +
        '<!-- Code by Carlos Salvador, http://cachosalvador.com (2025)                   -->\n' +
        '<!-- ----------------------------------------------------- -->',
    )
  }, [])

  return (
    <motion.header
      className={s.header}
      ref={headerRef}
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      transition={{duration: 0.3, delay: 0.5}}
      // ✅ al salir de TODO el header (menu + submenu), cerramos
      onMouseLeave={closeSubmenu}
    >
      {/* ... top header igual ... */}
      <div className={s.topHeaderContainer}>
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
                >
                  <SvgLogoUcSanDiego />
                </Link>
              </div>
              <div className="mobile_visible">
                <Hamburger onClick={toggleMobileMenu} open={mobileMenuOpen} />
              </div>
            </div>
          </div>
        </Container>
      </div>

      <div className={s.menuHeaderContainer}>
        <Container className={s.menuHeader}>
          <Menu openSubmenu={openSubmenu} links={data?.menu?.links} />
          <DateHeader />
          <ButtonLink href="/support-us" size="lg">
            Support
          </ButtonLink>
        </Container>
      </div>

      {/* ✅ Submenu animado y con contenido del item hover */}
      <AnimatePresence>
        {submenuOpen && (
          <motion.div
            className={s.submenuHeader}
            style={{backgroundColor}}
            initial={{opacity: 0, y: -8}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: -8}}
            transition={{duration: 0.2}}
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
