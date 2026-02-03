'use client'

import {
  ButtonVariants,
  ButtonColors,
  ButtonSizes,
  ButtonBaseProps,
} from '@/components/Common/ui/Buttons/types/types'

const VARIANT_DEFAULT: ButtonVariants = 'filled'
const COLOR_DEFAULT: ButtonColors = 'default'
const SIZE_DEFAULT: ButtonSizes = 'md'

interface GetButtonClassesProps {
  s: {[key: string]: string}
  size?: ButtonSizes
  color?: ButtonColors
  variant?: ButtonVariants
}

export const getButtonClasses = ({size, color, variant, s}: GetButtonClassesProps) => {
  const sizeClass = size ? s[`buttonSize-${size}`] : s[`buttonSize-${SIZE_DEFAULT}`]
  const styleClass = s[`buttonStyle-${color ?? COLOR_DEFAULT}-${variant ?? VARIANT_DEFAULT}`]

  return `${sizeClass} ${styleClass}`
}
