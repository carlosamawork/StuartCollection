'use client'

import {CollectionArtworkData, CollectionThemeData} from '@/sanity/queries/queries/collection'
import s from './CollectionArtworks.module.scss'
import ArtworkCard from '@/components/Common/ArtworkCard'
import {Tags} from '@/components/Common/ui/Tags/Tags'
import useThemesSelection from '@/components/CollectionComponent/_shared/hooks/useThemesSelection'
import SortComponent from '@/components/CollectionComponent/_shared/components/SortComponent'
import {useSort} from '@/components/CollectionComponent/_shared/hooks/useSort'
import {useMemo} from 'react'

interface Props {
  themes: CollectionThemeData[]
  artworks: CollectionArtworkData[]
}

export default function CollectionArtworks({themes, artworks}: Props) {
  const {themeTags, selectedThemesIds} = useThemesSelection(themes)

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
    const artworksFilteredByTheme = artworks?.filter(filterByThemeId(selectedThemesIds))
    return getSorted([...artworksFilteredByTheme]) as CollectionArtworkData[]
  }, [artworks, selectedThemesIds, selectedSortOrder, selectedSortKey])

  return (
    <div className={s.section}>
      <div className={s.top}>
        <Tags tags={themeTags} />
        <SortComponent
          sortOptions={sortComponentOptions}
          selectedSortKey={selectedSortKey}
          setSelectedSortKey={setSelectedSortKey}
        />
      </div>
      <ul className={s.artworksGrid}>
        {artworksFilteredAndSorted && artworksFilteredAndSorted.length ? (
          artworksFilteredAndSorted.map((artwork, i) => (
            <li key={i}>
              <ArtworkCard data={artwork} />
            </li>
          ))
        ) : (
          <p>{'No artworks found.'}</p>
        )}
      </ul>
    </div>
  )
}

const filterByThemeId = (themesIds: string[]) => (artwork: CollectionArtworkData) => {
  for (const id of artwork.themesIds) {
    if (themesIds.includes(id)) return true
  }

  return false
}
