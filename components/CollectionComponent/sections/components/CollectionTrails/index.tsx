'use client'

import {CollectionTrailData} from '@/sanity/queries/queries/collection'
import s from './CollectionTrails.module.scss'
import Link from 'next/link'
import LazyImage from '@/components/Common/LazyImage'
import Container from '@/components/Common/ui/Container'

interface Props {
  trails: CollectionTrailData[]
}

export default function CollectionTrails({trails}: Props) {
  return (
    <Container>
      <div className={s.section}>
        <ul className={s.grid}>
          {trails && trails.length ? (
            trails.map((trail, i) => (
              <li key={i}>
                <TrailCard trail={trail} />
              </li>
            ))
          ) : (
            <p>{'No trails found.'}</p>
          )}
        </ul>
      </div>
    </Container>
  )
}

const TrailCard = ({trail}: {trail: CollectionTrailData}) => {
  const {slug, title, artworksCount, image} = trail

  return (
    <Link href={`/collection/trail/${slug}`} className={s.card}>
      <div className={s.image}>
        {image ? (
          <LazyImage
            src={image.imageUrl}
            alt={image.filename || 'Trail Thumbnail'}
            width={image.metadata.dimensions.width}
            height={image.metadata.dimensions.height}
            objectFit="cover"
            fill
          />
        ) : (
          <></>
        )}
      </div>
      <div className={s.content}>
        <h5>{title}</h5>
        <p>{artworksCount === 1 ? '1 Artwork' : `${artworksCount} Artworks`}</p>
      </div>
    </Link>
  )
}
