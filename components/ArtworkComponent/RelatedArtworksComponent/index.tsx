'use client'

import ArtworkThumbnail from '@/components/Common/ArtworkThumbnail'
import Container from '@/components/Common/ui/Container'
import {ArtworkData} from '@/sanity/queries/queries/artwork'
import s from './RelatedArtworksComponent.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import TabsLayout from '@/components/Common/ui/TabsLayout'

export default function RelatedArtworksComponent({data}: {data: ArtworkData['related']}) {
  if (!data) return <></>

  return (
    <div className={s.section}>
      <Container>
        <div className={s.topContent}>
          <h2>{'Related Artworks'}</h2>
          <Link className={s.link} href={'/collection/'}>
            <strong>View all </strong>
            <Image
              src="/assets/svg/chevron-right.svg"
              alt=">"
              width={6.17}
              height={10}
              style={{width: 6.17, height: 10}}
            />
          </Link>
        </div>
        <TabsLayout
          tabs={[
            {
              label: 'Location',
              content: (
                <ul className={s.artworkGrid}>
                  {data.byLocation && data.byLocation.length ? (
                    data.byLocation.map((artwork, i) => (
                      <li key={i}>
                        <ArtworkThumbnail data={artwork} />
                      </li>
                    ))
                  ) : (
                    <p>{'No artworks found.'}</p>
                  )}
                </ul>
              ),
            },
            {
              label: 'Theme',
              content: (
                <ul className={s.artworkGrid}>
                  {data.byTheme && data.byTheme.length ? (
                    data.byTheme.map((artwork, i) => (
                      <li key={i}>
                        <ArtworkThumbnail data={artwork} />
                      </li>
                    ))
                  ) : (
                    <p>{'No artworks found.'}</p>
                  )}
                </ul>
              ),
            },
            {
              label: 'Trail',
              content: (
                <ul className={s.artworkGrid}>
                  {data.byTrail && data.byTrail.length ? (
                    data.byTrail.map((artwork, i) => (
                      <li key={i}>
                        <ArtworkThumbnail data={artwork} />
                      </li>
                    ))
                  ) : (
                    <p>{'No artworks found.'}</p>
                  )}
                </ul>
              ),
            },
          ]}
        />
      </Container>
    </div>
  )
}
