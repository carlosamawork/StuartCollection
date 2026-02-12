'use client'

import {ButtonBaseProps} from '@/components/Common/ui/Buttons/types/types'
import s from '../styles/Buttons.module.scss'
import Link from 'next/link'
import {getButtonStyleClasses} from '@/components/Common/ui/Buttons/utils/getButtonStyleClasses'

interface ButtonLinkProps extends ButtonBaseProps {
  href: string
}

export function ButtonLink({href, children, className, variant, color, size}: ButtonLinkProps) {
  const styleClasses = getButtonStyleClasses({
    s,
    variant,
    color,
    size,
  })

  return (
    <Link href={href} className={s.link}>
      <div className={`${s.button} ${styleClasses} ${className ?? ''}`}>{children}</div>
    </Link>
  )
}
