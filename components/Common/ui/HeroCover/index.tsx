import LazyImage from '@/components/Common/LazyImage'
import Container from '@/components/Common/ui/Container'
import s from './HeroCover.module.scss'

interface HeroCoverProps {
  imageSrc: any | undefined
  height: string
}

export function HeroCover({imageSrc, height}: HeroCoverProps) {
  if (!imageSrc) return null

  return (
    <div className={s.heroCover} style={{height}}>
      <LazyImage
        src={imageSrc.imageUrl}
        alt={imageSrc.filename || 'Top Image'}
        width={imageSrc.metadata.dimensions.width}
        height={imageSrc.metadata.dimensions.height}
        fill={true}
        objectFit="cover"
      />
    </div>
  )
}
