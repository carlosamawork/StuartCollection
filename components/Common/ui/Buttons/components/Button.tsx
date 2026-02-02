'use client'

import {ButtonBaseProps} from '@/components/Common/ui/Buttons/types/types'
import s from '../styles/Buttons.module.scss'
import {getButtonClasses} from '@/components/Common/ui/Buttons/utils/getButtonClasses'

interface ButtonProps extends ButtonBaseProps {
  onClick: () => void
}

export function Button({onClick, children, className, variant, color, size}: ButtonProps) {
  const styleClasses = getButtonClasses({
    s,
    variant,
    color,
    size,
  })

  return (
    <button className={`${s.button} ${styleClasses} ${className}`} onClick={onClick}>
      {children}
    </button>
  )
}
