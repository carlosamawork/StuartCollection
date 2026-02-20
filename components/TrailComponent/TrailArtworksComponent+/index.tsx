'use client'

import ArtworkThumbnail from '@/components/Common/ArtworkThumbnail'
import Container from '@/components/Common/ui/Container'
import s from './TrailArtworksComponent.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import {ArtworkThumbnailData} from '@/sanity/queries/fragments/artwork_thumbnail'

export default function TrailArtworksComponent({data}: {data: ArtworkThumbnailData[]}) {
  if (!data) return <></>

  return (
    <div className={s.section}>
      <Container>
        <div className={s.topContent}>
          <h2>{'Artworks in this Trail'}</h2>
          <Link className={s.link} href={'/collection/#trails'}>
            <strong>All Trails </strong>
            <Image
              src="/assets/svg/chevron-right.svg"
              alt=">"
              width={6.17}
              height={10}
              style={{width: 6.17, height: 10}}
            />
          </Link>
        </div>
        <ul className={s.artworkGrid}>
          {data && data.length ? (
            data.map((artwork, i) => (
              <li key={i}>
                <ArtworkThumbnail data={artwork} />
              </li>
            ))
          ) : (
            <p>{'No artworks found.'}</p>
          )}
        </ul>
      </Container>
    </div>
  )
}
