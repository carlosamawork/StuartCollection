'use client'

import Link from 'next/link'
import s from './HeaderComponent.module.scss'
import {useEffect, useMemo, useRef, useState} from 'react'
import {motion, AnimatePresence} from 'framer-motion'
import Container from '@/components/Common/ui/Container'
import {ButtonLink} from '@/components/Common/ui/Buttons/components/ButtonLink'
import SubmenuComponent from './Submenu'
import {usePathname} from 'next/navigation'

type DayHours = { day: string; open: string | null; close: string | null }

const SAN_DIEGO_TZ = 'America/Los_Angeles'

function getWeekdayInTimeZone(timeZone: string) {
  // Ej: "Monday", "Tuesday", ...
  return new Intl.DateTimeFormat('en-US', { weekday: 'long', timeZone }).format(new Date())
}

function isClosedToday(openValue: string | null | undefined, closeValue: string | null | undefined) {
  // Con tu data: Sunday => open: "Closed", close: null
  return !openValue || openValue.toLowerCase() === 'closed' || !closeValue
}

function formatTodayLabel(openValue: string | null | undefined, closeValue: string | null | undefined) {
  if (isClosedToday(openValue, closeValue)) return 'Closed'
  return `${openValue} – ${closeValue}`
}

async function fetchSanDiegoTempF(signal?: AbortSignal): Promise<number | null> {
  // San Diego aprox: 32.7157, -117.1611
  const url =
    'https://api.open-meteo.com/v1/forecast?latitude=32.7157&longitude=-117.1611&current=temperature_2m&temperature_unit=fahrenheit&timezone=America%2FLos_Angeles'

  const res = await fetch(url, { signal, cache: 'no-store' })
  if (!res.ok) return null

  const json = await res.json()
  const t = json?.current?.temperature_2m
  return typeof t === 'number' ? t : null
}

export default function HeaderComponent({data}: any) {
  const pathname = usePathname()

  const headerRef = useRef<HTMLElement>(null)

  const [activeItem, setActiveItem] = useState<any>(null)
  const [submenuOpen, setSubmenuOpen] = useState(false)

  const isArtwork = pathname.includes('collection/artwork')
  const backgroundColor = isArtwork ? '#E7ECF2' : undefined

  useEffect(() => {
    console.log(
      '<!-- ----------------------------------------------------- -->\n' +
        '<!-- Code by Carlos Salvador, http://cachosalvador.com (2025)                   -->\n' +
        '<!-- ----------------------------------------------------- -->',
    )
  }, [])

  // CALCULATE IF IS OPEN AND TEMPERATURE OF SAN DIEGO

  const [tempF, setTempF] = useState<number | null>(null)
  const [tempLoading, setTempLoading] = useState(true)

  const hours: DayHours[] = data?.hours ?? data?.openingHours ?? [] // <-- ajusta aquí

  const today = useMemo(() => {
    const todayName = getWeekdayInTimeZone(SAN_DIEGO_TZ) // "Monday"...
    const todayHours = hours.find((h) => h.day === todayName) ?? null

    const open = todayHours?.open ?? null
    const close = todayHours?.close ?? null
    const closed = isClosedToday(open, close)

    return {
      dayName: todayName,
      isOpen: !closed,
      label: closed ? 'Closed' : 'Open today',
      timeLabel: formatTodayLabel(open, close),
    }
  }, [hours])

  useEffect(() => {
    const ac = new AbortController()
    setTempLoading(true)

    fetchSanDiegoTempF(ac.signal)
      .then((t) => setTempF(t))
      .catch(() => setTempF(null))
      .finally(() => setTempLoading(false))

    return () => ac.abort()
  }, [])

  const openSubmenu = (item: any) => {
    setActiveItem(item)
    setSubmenuOpen(true)
  }

  const closeSubmenu = () => {
    setSubmenuOpen(false)
    setActiveItem(null)
  }

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
            <div className={s.logoSanDiego}>
              <Link
                href="https://stuartcollection.ucsd.edu/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  width="169"
                  height="32"
                  viewBox="0 0 169 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.323 16.4765C20.323 21.4278 19.6016 25.1922 12.0787 25.1922C4.55574 25.1922 3.43865 21.5791 3.43865 16.4765V4.43291C3.43865 1.72164 2.28083 1.47145 0.291016 1.47145V0.75H9.79793V1.47145C7.84883 1.47145 6.65029 1.72164 6.65029 4.43873V16.4765C6.65029 20.1653 7.5172 23.7784 12.2183 23.7784C17.4314 23.7784 18.2576 20.7762 18.2576 16.4765V4.43291C18.2576 1.72164 17.0648 1.46564 15.1157 1.46564V0.75H23.4648V1.47145C21.475 1.47145 20.3172 1.72164 20.3172 4.43873V16.4765H20.323Z"
                    fill="#272728"
                  />
                  <path
                    d="M40.3198 24.2151C38.5453 24.8667 36.5205 25.1926 33.85 25.1926C26.618 25.1926 23.1445 19.6944 23.1445 11.9969C23.1445 5.30601 25.3089 0.389648 33.0529 0.389648C35.9445 0.389648 38.4056 0.965648 39.9998 1.40201L40.3256 7.08056H39.4238C38.9525 5.05583 37.5096 1.79765 33.018 1.79765C27.1998 1.79765 26.7285 7.98238 26.7285 11.706C26.7285 16.3722 27.7409 23.5693 35.6594 23.5693C38.0798 23.5693 39.3831 23.0282 40.3256 22.6675V24.2209L40.3198 24.2151Z"
                    fill="#272728"
                  />
                  <path
                    d="M59.7412 5.95183C59.4154 4.03765 57.9667 1.79183 54.0976 1.79183C51.6714 1.79183 49.5419 3.34528 49.5419 5.73656C49.5419 8.95401 53.8474 10.0013 56.995 11.8456C59.8517 13.5096 61.7659 14.9933 61.7659 18.426C61.7659 23.0166 57.7863 25.1867 52.835 25.1867C50.3797 25.1867 47.523 24.6456 46.6154 24.5002L46.3594 19.4035H47.267C47.5521 21.3176 49.2568 23.5635 53.1259 23.5635C56.3085 23.5635 58.3681 21.5038 58.3681 19.0078C58.3681 15.1038 52.3637 13.9111 49.0008 11.3453C47.4125 10.1176 46.6503 8.81438 46.6503 6.49874C46.6503 2.15838 50.2343 0.389648 54.7841 0.389648C57.2103 0.389648 58.7637 0.680557 60.3928 1.00056L60.643 5.95183H59.7412Z"
                    fill="#272728"
                  />
                  <path
                    d="M76.5449 24.8605C76.1609 24.9594 75.3521 25.1514 74.2001 25.1514C72.3325 25.1514 71.7856 24.1856 71.7856 22.8066H71.7216C70.7325 24.2554 69.3478 25.1514 67.1543 25.1514C64.9609 25.1514 63.2969 23.6096 63.2969 21.515C63.2969 16.8488 69.3478 16.8488 71.7856 16.6219V15.4001C71.7856 13.1485 71.7507 10.7688 69.0511 10.7688C67.0554 10.7688 66.7994 11.6066 66.7994 12.6365C66.7994 13.9514 65.8336 14.3063 65.2867 14.3063C64.4198 14.3063 63.7449 13.7245 63.7449 12.8576C63.7449 10.7688 66.8634 9.7041 69.086 9.7041C73.4903 9.7041 74.2932 11.8277 74.2932 14.8183V22.795C74.2932 23.9237 74.6772 24.3077 75.678 24.3077C75.9631 24.3077 76.254 24.2437 76.5449 24.1797V24.8546V24.8605ZM71.7856 17.6866C70.2729 17.7216 66.1536 18.0125 66.1536 21.003C66.1536 22.6728 67.2532 23.8016 68.3471 23.8016C70.4358 23.8016 71.7856 21.7768 71.7856 19.5892V17.6925V17.6866Z"
                    fill="#272728"
                  />
                  <path
                    d="M77.2539 24.2787C78.6037 24.2787 79.6975 23.9936 79.6975 21.8991V13.1194C79.6975 11.1878 78.1848 11.0947 77.2539 11.0307V10.4838L82.2052 9.70996V13.9572H82.2692C82.7172 12.7645 84.1659 9.70996 87.3485 9.70996C90.7579 9.70996 91.0837 11.5718 91.0837 14.5681V21.9049C91.0837 23.9936 92.1775 24.2845 93.5274 24.2845V24.8314H86.1324V24.2845C87.4823 24.2845 88.5761 23.9994 88.5761 21.9049V15.278C88.5761 12.5085 88.547 11.2576 86.4175 11.2576C84.5266 11.2576 82.2052 14.894 82.2052 17.9485V21.9049C82.2052 23.9936 83.2932 24.2845 84.6488 24.2845V24.8314H77.2539V24.2845V24.2787Z"
                    fill="#272728"
                  />
                  <path
                    d="M97.2051 24.1042C99.16 24.1042 100.353 23.8482 100.353 21.1427V4.43291C100.353 1.72164 99.16 1.46564 97.2051 1.46564V0.75H105.671C111.669 0.75 118.034 2.05327 118.034 12.8285C118.034 23.6038 111.349 24.8373 105.671 24.8373H97.2051V24.11V24.1042ZM103.57 20.3805C103.57 23.022 103.861 23.4176 105.671 23.4176C111.89 23.4176 114.456 20.0896 114.456 12.8227C114.456 6.16673 112.542 2.158 105.671 2.158C103.861 2.158 103.57 2.37327 103.57 5.19509V20.3805Z"
                    fill="#272728"
                  />
                  <path
                    d="M119.348 24.2786C120.703 24.2786 121.797 23.9936 121.797 21.899V13.1194C121.797 11.1877 120.319 11.0946 119.348 11.0306V10.4837L124.305 9.70992V21.899C124.305 23.9877 125.399 24.2786 126.748 24.2786V24.8256H119.348V24.2786ZM121.122 4.91573C121.122 3.88592 121.925 3.08301 122.955 3.08301C123.985 3.08301 124.788 3.88592 124.788 4.91573C124.788 5.94555 123.985 6.74846 122.955 6.74846C121.925 6.74846 121.122 5.94555 121.122 4.91573Z"
                    fill="#272728"
                  />
                  <path
                    d="M138.39 24.5696C137.617 24.8605 136.523 25.1514 134.562 25.1514C129.576 25.1514 126.783 22.4169 126.783 17.0118C126.783 12.3165 128.68 9.70996 133.311 9.70996C136.203 9.70996 138.815 11.3158 138.815 15.0452V15.7551H129.454C129.454 18.4547 130.769 23.9587 136.145 23.9587C136.884 23.9587 137.75 23.8598 138.396 23.5398V24.5696H138.39ZM135.947 14.6961C135.947 12.9914 135.365 10.7747 132.892 10.7747C130.42 10.7747 129.448 13.5092 129.448 14.6961H135.947Z"
                    fill="#272728"
                  />
                  <path
                    d="M149.265 22.2548C150.807 22.2548 154.379 22.3188 154.379 25.8912C154.379 29.4636 150.778 31.6163 146.495 31.6163C143.342 31.6163 140.066 30.4236 140.066 27.5319C140.066 25.5363 141.544 24.6694 142.574 24.1516C142.027 23.8316 141.189 23.2207 141.189 21.8708C141.189 20.6781 142.219 19.4563 142.574 19.0723C141.829 18.4614 140.706 17.4956 140.706 14.761C140.706 10.6127 143.726 9.71083 146.781 9.71083C148.264 9.71083 149.067 9.96683 150.097 10.5137C150.609 9.29192 151.377 7.0752 153.343 7.0752C154.245 7.0752 154.891 7.6512 154.891 8.61701C154.891 9.48974 154.344 10.0657 153.378 10.0657C152.541 10.0657 152.349 9.61192 151.93 9.61192C151.226 9.61192 150.935 10.5487 150.772 11.0607C151.156 11.4796 152.215 12.6723 152.215 14.9239C152.215 18.1705 150.19 20.0032 146.333 20.0032C145.047 20.0032 144.11 19.8403 143.406 19.5203C143.208 19.7763 142.824 20.2592 142.824 20.969C142.824 22.2548 144.43 22.2548 145.46 22.2548H149.259H149.265ZM143.697 24.5356C143.051 25.0185 142.155 25.5654 142.155 27.0141C142.155 28.9108 143.854 30.5516 146.653 30.5516C149.451 30.5516 152.285 29.0388 152.285 26.7232C152.285 25.0825 150.935 24.5356 149.323 24.5356H143.697ZM146.495 18.9385C149.201 18.9385 149.55 16.8148 149.55 15.1101C149.55 12.7014 148.712 10.7697 146.397 10.7697C143.854 10.7697 143.377 12.6374 143.377 14.4992C143.377 16.9428 144.18 18.9385 146.495 18.9385Z"
                    fill="#272728"
                  />
                  <path
                    d="M154.414 17.4307C154.414 12.6016 157.015 9.70996 161.134 9.70996C165.253 9.70996 167.86 12.6016 167.86 17.4307C167.86 22.2598 165.259 25.1514 161.134 25.1514C157.009 25.1514 154.414 22.2598 154.414 17.4307ZM161.134 24.0867C164.352 24.0867 164.997 20.1012 164.997 17.4307C164.997 14.7601 164.352 10.7689 161.134 10.7689C157.917 10.7689 157.277 14.7543 157.277 17.4307C157.277 20.1071 157.917 24.0867 161.134 24.0867Z"
                    fill="#272728"
                  />
                  <path
                    d="M138.426 30.3711H0.291016V31.1856H139.2C138.903 30.9355 138.642 30.662 138.42 30.3711H138.426Z"
                    fill="#272728"
                  />
                  <path
                    d="M167.599 30.3711H154.892C154.607 30.6678 154.281 30.9355 153.932 31.1856H167.593V30.3711H167.599Z"
                    fill="#272728"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </Container>
      </div>

      <div className={s.menuHeaderContainer}>
        <Container className={s.menuHeader}>
          <nav className={s.mainNav}>
            <ul>
              {data?.menu?.links?.map((link: any, index: number) => {
                const label = link.title || link.reference?.title || 'Untitled'

                // ✅ solo abre submenu si ese item tiene contenido de submenu
                const hasSubmenu = Boolean(
                  link?.submenu?.length ||
                  link?.children?.length ||
                  link?._type === 'linkWithSubmenu',
                )

                if (link._type === 'linkInternal') {
                  return (
                    <li
                      key={index}
                      onMouseEnter={() => openSubmenu(link)}
                      className={s.linkInternal}
                    >
                      <Link href={`/${link.slug}`}>
                        {label}
                        <svg
                          width="10"
                          height="7"
                          viewBox="0 0 10 7"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8.825 0L5 3.81667L1.175 0L0 1.175L5 6.175L10 1.175L8.825 0Z"
                            fill="#272728"
                          />
                        </svg>
                      </Link>
                    </li>
                  )
                }

                if (link._type === 'linkExternal') {
                  return (
                    <li key={index} onMouseEnter={() => hasSubmenu && openSubmenu(link)}>
                      <a
                        href={link.url}
                        target={link.newWindow ? '_blank' : '_self'}
                        rel={link.newWindow ? 'noopener noreferrer' : undefined}
                      >
                        {label}
                      </a>
                    </li>
                  )
                }

                return null
              })}
            </ul>
          </nav>

          <div className={s.dateHeader}>
            <p>
              <strong>{today.isOpen ? 'Open today' : 'Closed today'}</strong>
            </p>

            <p>
              {today.timeLabel}
              {' | '}
              {tempLoading ? '—' : tempF == null ? '—' : `${Math.round(tempF)}ºF`}
            </p>
          </div>

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
