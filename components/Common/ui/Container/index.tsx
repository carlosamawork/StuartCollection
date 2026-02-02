'use client'

import s from './Container.module.scss'

interface ContainerProps {
  children: React.ReactNode
  className?: string
  size?: 'small' | 'medium' | 'fullWidth'
}

export default function Container({children, className, size}: ContainerProps) {
  const getClassName = () => {
    switch (size) {
      case 'small':
        return s.containerSmall
      case 'fullWidth':
        return s.containerFullWidth
      case 'medium':
      default:
        return s.container
    }
  }
  return <div className={`${getClassName()} ${className}`}>{children}</div>
}
