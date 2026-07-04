'use client'

import s from './ArtworkCard.module.scss'
import {ArtworkCardData} from '@/sanity/queries/fragments/artwork_card'
import LazyImage from '@/components/Common/LazyImage'
import Link from 'next/link'

interface Props {
  data: ArtworkCardData
}

export default function ArtworkCard({data}: Props) {
  if (!data) return <></>

  const hasImage = Boolean(data.image?.imageUrl)
  const isImageHorizontal =
    hasImage && data.image.metadata?.dimensions?.height < data.image.metadata?.dimensions?.width

  const artists = data.artists ?? []
  const artistNames = artists.map((a) => a.name).join(', ')
  const ariaLabel = artistNames
    ? `View artwork: ${data.title} by ${artistNames}`
    : `View artwork: ${data.title}`

  return (
    <Link className={s.card} href={`/collection/artwork/${data.slug}`} aria-label={ariaLabel}>
      <div className={s.imageContainer}>
        {hasImage && (
          <div className={`${s.image} ${isImageHorizontal ? s['image--h'] : ''}`}>
            <LazyImage
              src={data.image.imageUrl}
              alt={data.image.filename || 'Artwork Thumbnail'}
              width={data.image.metadata.dimensions.width}
              height={data.image.metadata.dimensions.height}
              fill
              objectFit="cover"
            />
          </div>
        )}
      </div>
      <div className={s.titles}>
        <p className={`${s.title} p-medium`}>{data.title}</p>
        <p className={`${s.artists} p-small`}>
          {artists.map((artist, i) => (
            <span key={i} className={s.artist}>
              {artist.name}
            </span>
          ))}
        </p>
      </div>
    </Link>
  )
}
