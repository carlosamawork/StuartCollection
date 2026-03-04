import LazyImage from '@/components/Common/LazyImage'
import Container from '@/components/Common/ui/Container'
import s from './HeroCover.module.scss'
import LazyVideo from '@/components/Common/LazyVideo'

interface HeroCoverProps {
  image?: any
  videoUrl?: string
  flat?: boolean
}

export function HeroCover({image, videoUrl, flat}: HeroCoverProps) {
  if (!image && !videoUrl) return null

  return (
    <div
      className={`${s.heroCover} ${flat && videoUrl ? s['heroCover--flatVideo'] : flat ? s['heroCover--flat'] : videoUrl ? s['heroCover--fullHeightVideo'] : s['heroCover--fullHeight']}`}
    >
      {videoUrl ? (
        <LazyVideo src={videoUrl} alt={'Hero Video'} muted={true} autoplay={true} />
      ) : (
        <LazyImage
          src={image.imageUrl}
          alt={image.filename || 'Hero Image'}
          width={image.metadata.dimensions.width}
          height={image.metadata.dimensions.height}
          fill={true}
          objectFit="cover"
        />
      )}
    </div>
  )
}
