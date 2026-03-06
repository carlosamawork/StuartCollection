'use client'

import {CollectionData} from '@/sanity/queries/queries/collection'
import s from './CollectionComponent.module.scss'
import Container from '@/components/Common/ui/Container'
import Breadcrumbs from '@/components/Common/ui/Breadcrumbs'
import TabsLayout from '@/components/Common/ui/TabsLayout'
import CollectionArtworks from '@/components/CollectionComponent/sections/components/CollectionArtworks'
import CollectionTrails from '@/components/CollectionComponent/sections/components/CollectionTrails'
import CollectionLocations from '@/components/CollectionComponent/sections/components/CollectionLocations'
import CollectionArtists from '@/components/CollectionComponent/sections/components/CollectionArtists'
import {useUrlHash} from '@/hooks/useUrlHash'
import {useIsMobileDevice} from '@/utils/isMobileClient'

export default function CollectionComponent({data}: {data: CollectionData}) {
  const {hash} = useUrlHash()
  const isMobile = useIsMobileDevice(992)

  if (!data) return <></>

  const {artworks, themes, locations, artists, trails, sections} = data

  const currentSection = sections.find((section) => section.id === hash)

  return (
    <div className={s.component}>
      <Container>
        <div className={s.top}>
          <Breadcrumbs
            breadcrumbs={[
              {label: 'Home', href: '/'},
              {label: 'The Collection', href: `/collection/`},
              ...(hash
                ? [
                    {
                      label: currentSection ? currentSection.title : '',
                      href: `#${hash}`,
                    },
                  ]
                : []),
            ]}
            showLastSlash={false}
          />
          <h1>{'The Collection'}</h1>
        </div>
      </Container>
      <article className={s.article}>
        <TabsLayout
          label="Explore by"
          enableUrlHashInteraction
          addPaddingToNav
          fullLine={isMobile}
          paddingTop={8}
          tabs={[
            {
              label: 'Artworks',
              content: <CollectionArtworks artworks={artworks} themes={themes} />,
              id: 'artworks',
            },
            {
              label: 'Artists',
              content: <CollectionArtists artists={artists} />,
              id: 'artists',
            },
            {
              label: 'Locations',
              content: <CollectionLocations locations={locations} />,
              id: 'locations',
            },
            {
              label: 'Trails',
              content: <CollectionTrails trails={trails} />,
              id: 'trails',
            },
          ]}
        />
      </article>
    </div>
  )
}
