'use client'

import s from './ArtworksGrid.module.scss'
import {ArtworkCardData} from '@/sanity/queries/fragments/artwork_card'
import ArtworkCard from '@/components/Common/ArtworkCard'

interface Props {
  data: ArtworkCardData[]
  addPadding?: boolean
}

export default function ArtworksGrid({data, addPadding}: Props) {
  return (
    <ul className={`${s.grid} ${addPadding ? s.container : ''}`}>
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
  )
}
