'use client'

import Link from 'next/link'
import s from './Breadcrumbs.module.scss'

type BreadcrumbItem = {
  label: string
  href: string
}

interface BreadcrumbsProps {
  breadcrumbs: BreadcrumbItem[]
  showLastSlash?: boolean
}

export default function Breadcrumbs({breadcrumbs, showLastSlash = true}: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={s.breadcrumbs}>
      <ol>
        {breadcrumbs.map((breadcrumb, index) => {
          const isLast = index === breadcrumbs.length - 1
          return (
            <li className={`${s.item} ${showLastSlash ? s.showLastSlash : ''}`} key={index}>
              <Link href={breadcrumb.href} aria-current={isLast ? 'page' : undefined}>
                {breadcrumb.label}
              </Link>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

// Example
// <Breadcrumbs
//   breadcrumbs={[
//     { label: 'Home', href: '/' },
//     { label: 'The Collection', href: '/collection' },
//     { label: 'Artwork Title', href: '/collection/artwork/artwork-title' },
//   ]}
// />

// The `showLastSlash` prop can be used to control whether the last breadcrumb item
// should have a slash after it or not.
// By default, it is set to `true`, meaning that all breadcrumb items will have a
// slash after them.
