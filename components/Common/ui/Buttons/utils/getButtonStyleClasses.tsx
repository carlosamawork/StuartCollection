'use client'

import {ButtonVariant, ButtonColor, ButtonSize} from '../types/types'

const VARIANT_DEFAULT: ButtonVariant = 'filled'
const COLOR_DEFAULT: ButtonColor = 'default'
const SIZE_DEFAULT: ButtonSize = 'md'

interface GetButtonStyleClassesProps {
  s: {[key: string]: string}
  size?: ButtonSize
  color?: ButtonColor
  variant?: ButtonVariant
}

export const getButtonStyleClasses = ({size, color, variant, s}: GetButtonStyleClassesProps) => {
  const sizeClass = size ? s[`buttonSize-${size}`] : s[`buttonSize-${SIZE_DEFAULT}`]
  const styleClass = s[`buttonStyle-${color ?? COLOR_DEFAULT}-${variant ?? VARIANT_DEFAULT}`]

  return `${sizeClass} ${styleClass}`
}
