'use client'

import s from './LinkChevron.module.scss'
import Link from 'next/link'
import Icon from '@/components/Common/ui/Icon'

interface Props {
  label: string
  href: string
}

export default function LinkChevron({label, href}: Props) {
  return (
    <Link className={s.link} href={href}>
      <strong>{label}</strong>
      <Icon name="chevronRight" alt=">" />
    </Link>
  )
}
