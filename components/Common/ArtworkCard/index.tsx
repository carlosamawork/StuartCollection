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

  const isImageVertical =
    data.image.metadata.dimensions.height >= data.image.metadata.dimensions.width

  return (
    <Link className={s.card} href={`/collection/artwork/${data.slug}`}>
      <div className={s.image}>
        {data.image?.imageUrl && (
          <LazyImage
            src={data.image.imageUrl}
            alt={data.image.filename || 'Top Image'}
            width={data.image.metadata.dimensions.width}
            height={data.image.metadata.dimensions.height}
            {...(isImageVertical
              ? {
                  fill: true,
                  objectFit: 'cover',
                }
              : {})}
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
