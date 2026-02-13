'use client'

import {ArtworkData} from '@/components/ArtworkComponent'

export default function ArtworkVisit({data}: {data: ArtworkData}) {
  if (!data) return <></>

  return <>ArtworkVisit</>
}

export type ArtworkVisitSectionData = {
  items: any[]
}
