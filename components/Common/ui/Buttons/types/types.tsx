export type ButtonVariant = 'outlined' | 'filled'
export type ButtonColor = 'default' | 'inverted'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonBaseProps {
  children: React.ReactNode
  size?: ButtonSize
  color?: ButtonColor
  variant?: ButtonVariant
  className?: string
  'aria-label'?: string
}
