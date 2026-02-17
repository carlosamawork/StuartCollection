'use client'

import {Tags} from '@/components/Common/ui/Tags/Tags'
import Link from 'next/link'
import {useEffect, useState} from 'react'

export default function CollectionComponent({data}: {data: CollectionData}) {
  const {artworks, themes, locations, artists} = data

  return (
    <div>
      <div>
        <h5>List of themes</h5>
        <ul>
          {themes.map((theme: CollectionThemeData) => (
            <li>{theme.title}</li>
          ))}
        </ul>
      </div>
      <div>
        <h5>List of locations</h5>
        <ul>
          {locations.map((location: CollectionLocationData) => (
            <li>{location.name}</li>
          ))}
        </ul>
      </div>
      <div>
        <h5>List of artists</h5>
        <ul>
          {artists.map((artist: CollectionArtistData) => (
            <li>{artist.name}</li>
          ))}
        </ul>
      </div>
      <div>
        <h5>List of artworks</h5>
        <ul>
          {artworks.map((artwork: CollectionArtworkData) => (
            <li>
              <Link href={`/collection/artwork/${artwork.slug}`}>{artwork.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

type CollectionData = {
  artworks: CollectionArtworkData[]
  themes: CollectionThemeData[]
  locations: CollectionLocationData[]
  artists: CollectionArtistData[]
}

type CollectionArtworkData = {
  title: string
  slug: string
  image: any
  artists: {name: string; slug: string}[]
}

type CollectionThemeData = {
  title: string
  slug: string
  artworks: {slug: string}[]
}

type CollectionLocationData = {
  name: string
  slug: string
}

type CollectionArtistData = {
  name: string
  artworks: {slug: string}[]
}
