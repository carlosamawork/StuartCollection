'use client'

import s from './ArtworkSections.module.scss'
import ArtworkImages from '@/components/ArtworkComponent/ArtworkSections/ArtworkImages'
import ArtworkArtist from '@/components/ArtworkComponent/ArtworkSections/ArtworkArtist'
import ArtworkVisit from '@/components/ArtworkComponent/ArtworkSections/ArtworkVisit'
import ArtworkVideos from '@/components/ArtworkComponent/ArtworkSections/ArtworkVideos'
import ArtworkSocial from '@/components/ArtworkComponent/ArtworkSections/ArtworkSocial'
import {ArtworkData} from '@/sanity/queries/queries/artwork'

export default function ArtworkSections({data}: {data: ArtworkData}) {
  if (!data.sections) return <></>

  return data.sections.map((module: any, i: number) => (
    <div className={s.sectionItem} key={module.id || i}>
      {module._type === 'module.artwork.images' && <ArtworkImages section={module} />}
      {module._type === 'module.artwork.artist' && <ArtworkArtist section={module} />}
      {module._type === 'module.artwork.visit' && <ArtworkVisit section={module} />}
      {module._type === 'module.artwork.videos' && <ArtworkVideos section={module} />}
      {module._type === 'module.artwork.social' && <ArtworkSocial section={module} />}
    </div>
  ))
}
