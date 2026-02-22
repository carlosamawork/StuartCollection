'use client'

import {CollectionArtistData} from '@/sanity/queries/queries/collection'
import s from './CollectionArtists.module.scss'
import Link from 'next/link'
import SortComponent from '@/components/CollectionComponent/_shared/components/SortComponent'
import {useSort} from '@/components/CollectionComponent/_shared/hooks/useSort'

interface Props {
  artists: CollectionArtistData[]
}

export default function CollectionArtists({artists}: Props) {
  const {sortComponentOptions, getSorted, selectedSortKey, setSelectedSortKey} = useSort({
    sortBy: [
      {
        label: 'Name',
        key: 'name',
        sortLabels: {
          ['asc']: 'A → Z',
          ['desc']: 'Z → A',
        },
        defaultSortOrder: 'asc',
      },
    ],
    initialSortKey: 'name',
  })

  const artistsSorted = getSorted(artists) as CollectionArtistData[]

  return (
    <div className={s.section}>
      <SortComponent
        sortOptions={sortComponentOptions}
        selectedSortKey={selectedSortKey}
        setSelectedSortKey={setSelectedSortKey}
      />
      <ul className={s.grid}>
        {artistsSorted && artistsSorted.length ? (
          artistsSorted.map((artist, i) => (
            <li key={i}>
              <ArtistCard artist={artist} />
            </li>
          ))
        ) : (
          <p>{'No artists found.'}</p>
        )}
      </ul>
    </div>
  )
}

const ArtistCard = ({artist}: {artist: CollectionArtistData}) => {
  const {name, artworks} = artist

  return (
    <div className={s.card}>
      <h5 className={`${s.artistName} p-xlarge`}>{name}</h5>
      <p className={s.artworkList}>
        {artworks.map((artwork: any, i: number) => (
          <Link href={`/collection/artwork/${artwork.slug}`} className={s.artwork}>
            {artwork.title}
          </Link>
        ))}
      </p>
    </div>
  )
}
