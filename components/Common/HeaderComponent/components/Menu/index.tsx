'use client'

import Link from 'next/link'
import s from './Menu.module.scss'

export default function Menu({openSubmenu, closeSubmenu, links}: any) {
  return (
    <nav className={s.mainNav} onKeyDown={(e) => e.key === 'Escape' && closeSubmenu?.()}>
      <ul>
        {links?.map((link: any, index: number) => {
          const label = link.title || link.reference?.title || 'Untitled'

          // ✅ solo abre submenu si ese item tiene contenido de submenu
          const hasSubmenu = Boolean(
            link?.submenu?.length || link?.children?.length || link?._type === 'linkWithSubmenu',
          )

          if (link._type === 'linkInternal') {
            return (
              <li
                key={index}
                onMouseEnter={() => openSubmenu(link)}
                onFocus={() => openSubmenu(link)}
                className={s.linkInternal}
              >
                <Link href={`/${link.slug}`} aria-haspopup={hasSubmenu ? 'true' : undefined}>
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
  )
}
