'use client'

import Container from '@/components/Common/ui/Container'
import s from './TrailArtworksComponent.module.scss'
import {ArtworkCardData} from '@/sanity/queries/fragments/artwork_card'
import ArtworksGrid from '@/components/Common/ArtworksGrid'
import LinkChevron from '@/components/Common/ui/LinkChevron'

export default function TrailArtworksComponent({data}: {data: ArtworkCardData[]}) {
  if (!data) return <></>

  return (
    <div className={s.section}>
      <Container>
        <div className={s.topContent}>
          <h2>{'Artworks in this Trail'}</h2>
          <LinkChevron label={'All Trails'} href={'/collection/#trails'} />
        </div>
      </Container>
      <div className={s.artworks}>
        <ArtworksGrid data={data} addPadding={true} />
      </div>
    </div>
  )
}
