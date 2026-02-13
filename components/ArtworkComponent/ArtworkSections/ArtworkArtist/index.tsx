'use client'

export default function ArtworkArtist({section}: {section: ArtworkArtistSectionData}) {
  if (!section) return <></>

  return <>ArtworkArtist</>
}

export type ArtworkArtistSectionData = {
  items: any[]
}
