'use client'

import s from './Container.module.scss'

interface ContainerProps {
  children: React.ReactNode
  className?: string
  variant?: 'small' | 'alignLeft' | 'fullWidth'
}

export default function Container({children, className, variant}: ContainerProps) {
  const getClassName = () => {
    switch (variant) {
      case 'small':
        return s.containerSmall
      case 'fullWidth':
        return s.containerFullWidth
      case 'alignLeft':
        return s.containerAlignLeft
      default:
        return s.container
    }
  }
  return <div className={`${getClassName()} ${className}`}>{children}</div>
}
