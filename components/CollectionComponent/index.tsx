'use client'

import ThemesSelectionComponent from '@/components/CollectionComponent/ThemesSelectionComponent'
import {CollectionData} from '@/sanity/queries/queries/collection'
import Link from 'next/link'

export default function CollectionComponent({data}: {data: CollectionData}) {
  const {artworks, themes, locations, artists} = data

  return (
    <div>
      <ThemesSelectionComponent themes={themes} />
      <div>
        <h5>List of locations</h5>
        <ul>
          {locations.map((location) => (
            <li key={location.slug}>{location.name}</li>
          ))}
        </ul>
      </div>
      <div>
        <h5>List of artists</h5>
        <ul>
          {artists.map((artist) => (
            <li key={artist.name}>{artist.name}</li>
          ))}
        </ul>
      </div>
      <div>
        <h5>List of artworks</h5>
        <ul>
          {artworks.map((artwork) => (
            <li key={artwork.slug}>
              <Link href={`/collection/artwork/${artwork.slug}`}>{artwork.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
