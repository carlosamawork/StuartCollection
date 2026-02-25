'use client'

import Container from '@/components/Common/ui/Container'
import {ArtworkData} from '@/sanity/queries/queries/artwork'
import s from './RelatedArtworksComponent.module.scss'
import Link from 'next/link'
import TabsLayout from '@/components/Common/ui/TabsLayout'
import Icon from '@/components/Common/ui/Icon'
import ArtworksGrid from '@/components/Common/ArtworksGrid'

export default function RelatedArtworksComponent({data}: {data: ArtworkData['related']}) {
  if (!data) return <></>

  return (
    <div className={s.section}>
      <Container>
        <div className={s.topContent}>
          <h2>{'Related Artworks'}</h2>
          <Link className={s.link} href={'/collection/'}>
            <strong>View All</strong>
            <Icon name="chevronRight" alt=">" />
          </Link>
        </div>
        <TabsLayout
          tabs={[
            ...(data.byLocation && data.byLocation.length > 0
              ? [
                  {
                    label: 'Location',
                    content: <ArtworksGrid data={data.byLocation} />,
                  },
                ]
              : []),
            ...(data.byTheme && data.byTheme.length > 0
              ? [
                  {
                    label: 'Theme',
                    content: <ArtworksGrid data={data.byTheme} />,
                  },
                ]
              : []),
            ...(data.byTrail && data.byTrail.length > 0
              ? [
                  {
                    label: 'Trail',
                    content: <ArtworksGrid data={data.byTrail} />,
                  },
                ]
              : []),
          ]}
        />
      </Container>
    </div>
  )
}
