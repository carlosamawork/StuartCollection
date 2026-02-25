'use client'

import {ButtonBaseProps} from '@/components/Common/ui/Buttons/types/types'
import s from '../styles/Buttons.module.scss'
import Link from 'next/link'
import {getButtonStyleClasses} from '@/components/Common/ui/Buttons/utils/getButtonStyleClasses'

interface ButtonLinkProps extends ButtonBaseProps {
  href: string
  target?: string
}

export function ButtonLink({
  href,
  target,
  children,
  className,
  variant,
  color,
  size,
}: ButtonLinkProps) {
  const styleClasses = getButtonStyleClasses({
    s,
    variant,
    color,
    size,
  })

  return (
    <Link href={href} className={s.link} target={target}>
      <div className={`${s.button} ${styleClasses} ${className ?? ''}`}>{children}</div>
    </Link>
  )
}
