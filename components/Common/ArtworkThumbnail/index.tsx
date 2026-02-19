'use client'

import s from './ArtworkThumbnail.module.scss'
import {ArtworkThumbnailData} from '@/sanity/queries/fragments/artwork_thumbnail'
import LazyImage from '@/components/Common/LazyImage'
import Link from 'next/link'

interface ArtworkThumbnailProps {
  data: ArtworkThumbnailData
}

export default function ArtworkThumbnail({data}: ArtworkThumbnailProps) {
  if (!data) return <></>

  return (
    <Link className={s.card} href={`/collection/artwork/${data.slug}`}>
      <div className={s.image}>
        {data.image?.imageUrl && (
          <LazyImage
            src={data.image.imageUrl}
            alt={data.image.filename || 'Top Image'}
            width={data.image.metadata.dimensions.width}
            height={data.image.metadata.dimensions.height}
          />
        )}
      </div>
      <div className={s.titles}>
        <p className={`${s.title} p-medium`}>{data.title}</p>
        <p className={`${s.artists} p-small`}>
          {data.artists.map((artist, i) => (
            <span key={i} className={s.artist}>
              {artist.name}
            </span>
          ))}
        </p>
      </div>
    </Link>
  )
}
