'use client'

import Container from '@/components/Common/ui/Container'
import {ArtworkData} from '@/sanity/queries/queries/artwork'
import s from './RelatedArtworksComponent.module.scss'
import TabsLayout from '@/components/Common/ui/TabsLayout'
import ArtworksGrid from '@/components/Common/ArtworksGrid'
import LinkChevron from '@/components/Common/ui/LinkChevron'
import {useIsMobileDevice} from '@/utils/isMobileClient'

export default function RelatedArtworksComponent({data}: {data: ArtworkData['related']}) {
  const isMobile = useIsMobileDevice(992)

  if (!data) return <></>

  return (
    <div className={s.section}>
      <Container>
        <div className={s.topContent}>
          <h2>{'Related Artworks'}</h2>
          <LinkChevron label={'View All'} href={'/collection/'} />
        </div>
      </Container>
      <div className={s.tabs}>
        <TabsLayout
          tabs={[
            ...(data.byLocation && data.byLocation.length > 0
              ? [
                  {
                    label: 'Location',
                    content: <ArtworksGrid data={data.byLocation} addPadding={isMobile} />,
                  },
                ]
              : []),
            ...(data.byTheme && data.byTheme.length > 0
              ? [
                  {
                    label: 'Theme',
                    content: <ArtworksGrid data={data.byTheme} addPadding={isMobile} />,
                  },
                ]
              : []),
            ...(data.byTrail && data.byTrail.length > 0
              ? [
                  {
                    label: 'Trail',
                    content: <ArtworksGrid data={data.byTrail} addPadding={isMobile} />,
                  },
                ]
              : []),
          ]}
          addPaddingToNav={isMobile}
        />
      </div>
    </div>
  )
}
