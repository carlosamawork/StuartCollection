export type ButtonVariants = 'outlined' | 'filled'
export type ButtonColors = 'default' | 'inverted'
export type ButtonSizes = 'sm' | 'md' | 'lg'

export interface ButtonBaseProps {
  children: React.ReactNode
  size?: ButtonSizes
  color?: ButtonColors
  variant?: ButtonVariants
  className?: string
}
