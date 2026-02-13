'use client'

export default function ArtworkVideos({section}: {section: ArtworkVideosSectionData}) {
  if (!section) return <></>

  return <>ArtworkVideos</>
}

export type ArtworkVideosSectionData = {
  items: any[]
}
