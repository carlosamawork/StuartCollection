'use client'

import {CollectionArtworkData, CollectionThemeData} from '@/sanity/queries/queries/collection'
import s from './CollectionArtworks.module.scss'
import useThemesSelection from '@/components/CollectionComponent/_shared/hooks/useThemesSelection'
import SortComponent from '@/components/CollectionComponent/_shared/components/SortComponent'
import {useSort} from '@/components/CollectionComponent/_shared/hooks/useSort'
import {useMemo} from 'react'
import ArtworksGrid from '@/components/Common/ArtworksGrid'
import FilterComponent from '@/components/CollectionComponent/_shared/components/FilterComponent'
import {useIsMobileDevice} from '@/utils/isMobileClient'
import Container from '@/components/Common/ui/Container'

interface Props {
  themes: CollectionThemeData[]
  artworks: CollectionArtworkData[]
}

export default function CollectionArtworks({themes, artworks}: Props) {
  const themeSelection = useThemesSelection(themes)
  const isMobile = useIsMobileDevice(768)

  const {sortComponentProps, getSorted} = useSort({
    sortBy: [
      {
        label: 'Name',
        key: 'title',
        sortLabels: {
          ['asc']: 'A → Z',
          ['desc']: 'Z → A',
        },
        defaultSortOrder: 'asc',
      },
      {
        label: 'Year',
        key: 'year',
        sortLabels: {
          ['asc']: 'Oldest First',
          ['desc']: 'Newest First',
        },
        defaultSortOrder: 'desc',
      },
    ],
  })

  const artworksFilteredByTheme = useMemo(
    () => artworks?.filter(filterByThemeId(themeSelection.selectedThemesIds)),
    [artworks, themeSelection.selectedThemesIds],
  )

  return (
    <div className={s.section}>
      <Container>
        <div className={s.top}>
          <FilterComponent {...themeSelection} />
          <SortComponent {...sortComponentProps} alignRight />
        </div>
      </Container>
      <div className={`${s.artworks} ${isMobile ? '' : s.container}`}>
        <ArtworksGrid
          data={getSorted(artworksFilteredByTheme) as CollectionArtworkData[]}
          addPadding={isMobile}
        />
      </div>
    </div>
  )
}

const filterByThemeId = (themesIds: string[]) => (artwork: CollectionArtworkData) => {
  for (const id of artwork.themesIds) {
    if (themesIds.includes(id)) return true
  }

  return false
}
