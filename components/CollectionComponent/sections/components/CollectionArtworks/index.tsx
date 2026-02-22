'use client'

import {CollectionArtworkData, CollectionThemeData} from '@/sanity/queries/queries/collection'
import s from './CollectionArtworks.module.scss'
import {Tags} from '@/components/Common/ui/Tags/Tags'
import useThemesSelection from '@/components/CollectionComponent/_shared/hooks/useThemesSelection'
import SortComponent from '@/components/CollectionComponent/_shared/components/SortComponent'
import {useSort} from '@/components/CollectionComponent/_shared/hooks/useSort'
import {useMemo} from 'react'
import ArtworksGrid from '@/components/Common/ArtworksGrid'
import FilterComponent from '@/components/CollectionComponent/_shared/components/FilterComponent'

interface Props {
  themes: CollectionThemeData[]
  artworks: CollectionArtworkData[]
}

export default function CollectionArtworks({themes, artworks}: Props) {
  const themeSelection = useThemesSelection(themes)

  const {sortComponentOptions, getSorted, selectedSortOrder, selectedSortKey, setSelectedSortKey} =
    useSort({
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
      initialSortKey: 'title',
    })

  const artworksFilteredAndSorted = useMemo(() => {
    const artworksFilteredByTheme = artworks?.filter(
      filterByThemeId(themeSelection.selectedThemesIds),
    )
    return getSorted([...artworksFilteredByTheme]) as CollectionArtworkData[]
  }, [artworks, themeSelection.selectedThemesIds, selectedSortOrder, selectedSortKey])

  return (
    <div className={s.section}>
      <div className={s.top}>
        <FilterComponent {...themeSelection} />
        <SortComponent
          sortOptions={sortComponentOptions}
          selectedSortKey={selectedSortKey}
          setSelectedSortKey={setSelectedSortKey}
          alignRight
        />
      </div>
      <div className={s.artworks}>
        <ArtworksGrid data={artworksFilteredAndSorted} />
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
