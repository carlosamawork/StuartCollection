'use client'

import ArtworkCard from '@/components/Common/ArtworkCard'
import Container from '@/components/Common/ui/Container'
import s from './TrailArtworksComponent.module.scss'
import Link from 'next/link'
import {ArtworkCardData} from '@/sanity/queries/fragments/artwork_card'
import Icon from '@/components/Common/ui/Icon'

export default function TrailArtworksComponent({data}: {data: ArtworkCardData[]}) {
  if (!data) return <></>

  return (
    <div className={s.section}>
      <Container>
        <div className={s.topContent}>
          <h2>{'Artworks in this Trail'}</h2>
          <Link className={s.link} href={'/collection/#trails'}>
            <strong>All Trails </strong>
            <Icon name={'chevronRight'} alt={'>'} />
          </Link>
        </div>
        <ul className={s.artworkGrid}>
          {data && data.length ? (
            data.map((artwork, i) => (
              <li key={i}>
                <ArtworkCard data={artwork} />
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
