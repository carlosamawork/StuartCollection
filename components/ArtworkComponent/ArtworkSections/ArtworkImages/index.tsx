'use client'

export default function ArtworkImages({section}: {section: ArtworkImagesSectionData}) {
  if (!section) return <></>

  return <>Artwork Images</>
}

export type ArtworkImagesSectionData = {
  items: any[]
}
