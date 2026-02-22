import {WEBSITE_ICONS} from '@/components/Common/ui/Icon/svg'

type IconName = keyof typeof WEBSITE_ICONS

type IconProps = {
  name: IconName
  size?: number
  className?: string
  alt?: string
}

export default function Icon({name, size = 20, className, alt = 'Icon'}: IconProps) {
  const SvgIcon = WEBSITE_ICONS[name]

  if (!SvgIcon) return null

  return <SvgIcon width={size} height={size} className={className} alt={alt} />
}
