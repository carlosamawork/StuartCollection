'use client'

import s from './MobileMenu.module.scss'
import {motion, AnimatePresence, useReducedMotion} from 'framer-motion'
import Container from '@/components/Common/ui/Container'
import {ButtonLink} from '@/components/Common/ui/Buttons/components/ButtonLink'
import DateHeader from '@/components/Common/HeaderComponent/components/DateHeader'
import AccordeonComponent from '@/components/PageComponent/Accordeon/AccordeonComponent'
import Link from 'next/link'
import DirectionsComponent from '@/components/Common/DirectionsComponent/DirectionsComponent'
import {useEffect, useRef} from 'react'

const FOCUSABLE_SELECTORS =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'

export default function MobileMenu({data, isOpen, close, backgroundColor}: any) {
  const shouldReduceMotion = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<Element | null>(null)

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement
      const firstFocusable = containerRef.current?.querySelector<HTMLElement>(FOCUSABLE_SELECTORS)
      firstFocusable?.focus()
    } else {
      ;(previousFocusRef.current as HTMLElement)?.focus()
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close()
        return
      }
      if (e.key !== 'Tab') return

      const container = containerRef.current
      if (!container) return
      const focusable = Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS))
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last.focus()
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, close])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={containerRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className={s.container}
          style={{backgroundColor}}
          initial={shouldReduceMotion ? {opacity: 0} : {opacity: 0, y: -8}}
          animate={{opacity: 1, y: 0}}
          exit={shouldReduceMotion ? {opacity: 0} : {opacity: 0, y: -8}}
          transition={shouldReduceMotion ? {duration: 0} : {duration: 0.2}}
        >
          <Container className={s.mobileMenu}>
            <div className={s.top}>
              <DateHeader />
              <div onClick={() => close()}>
                <ButtonLink href="/support-us" size="lg">
                  Support
                </ButtonLink>
              </div>
            </div>
            <AccordeonComponent
              small
              data={{
                items:
                  data?.menu?.links?.map((link, i) => {
                    const isExternalLink = !!link.url

                    return {
                      key: i,
                      label: link.title,
                      labelUrl: isExternalLink ? link.url : undefined,
                      onLabelUrlClick: isExternalLink ? close : undefined,
                      content: [
                        {
                          _type: 'free-component',
                          component: isExternalLink ? null : (
                            <DefaultMenuItem
                              sections={link.sections}
                              slug={link.slug}
                              onClick={close}
                            />
                          ),
                        },
                      ],
                    }
                  }) ?? [],
              }}
            />
            <AdditionalData data={data} />
          </Container>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

interface DefaultMenuItemProps {
  sections: any
  slug: string
  onClick: () => void
}

const DefaultMenuItem = ({sections, slug, onClick}: DefaultMenuItemProps) => {
  return (
    <ul>
      {sections?.map((section: any, index: number) => {
        return (
          <li key={index} className={s.section}>
            <Link
              href={'/' + slug + '#' + section.id}
              className={s.sectionLink}
              onClick={() => onClick()}
            >
              <span>{section.title}</span>
              <svg
                width="7"
                height="10"
                viewBox="0 0 7 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 1.175L3.81667 5L3.34392e-07 8.825L1.175 10L6.175 5L1.175 0L0 1.175Z"
                  fill="#747678"
                />
              </svg>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

const AdditionalData = ({data}: {data: any}) => {
  return (
    <div className={s.additionalData}>
      <DirectionsComponent directions={data.directions} googleMapsUrl={data.googleMapsUrl} />
      <div className={s.contactInfo}>
        <p>
          <Link href={`mailto:${data.email}`}>{data.email}</Link>
        </p>
        <p>
          <Link href={`tel:${data.telephone}`}>{data.telephone}</Link>
        </p>
      </div>
    </div>
  )
}
