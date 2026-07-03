'use client'

import s from './SpecsComponent.module.scss'
import Breadcrumbs from '@/components/Common/ui/Breadcrumbs'
import {Tags} from '@/components/Common/ui/Tags/Tags'
import {ArtworkData} from '@/sanity/queries/queries/artwork'
import LocationGoogleLink from '@/components/ArtworkComponent/_shared/LocationGoogleLink'
import LocationDescription from '@/components/ArtworkComponent/_shared/LocationDescription'

export default function SpecsComponent({data}: {data: ArtworkData}) {
  const hasVisitSeciton = !!data.sections.find(
    (section) => section._type === 'module.artwork.visit',
  )

  return (
    <aside className={s.specsComponent}>
      <Breadcrumbs
        breadcrumbs={[
          {label: 'Home', href: '/'},
          {label: 'The Collection', href: '/collection'},
        ]}
      />
      <div className={s.titleContainer}>
        <div className={s.artistContainer}>
          {data.artists.map((artist: any, i: number) => (
            <h1 className={s.artist} key={i}>
              {artist.name}
            </h1>
          ))}
        </div>
        <h1>{data.title}</h1>
      </div>
      <div className={s.specsDetails}>
        {data.specs.year && <div className={s.item}>
          <div className={s.label}>Year:</div>
          <div className={s.content}>{data.specs.year}</div>
        </div>}
        {(data.specs.visitDescription || data.specs.signupLink) && <div className={s.item}>
          <div className={s.label}>Visit:</div>
          <LocationDescription
            visitDescription={data.specs.visitDescription}
            signupLink={data.specs.signupLink}
          />
        </div>}
        {data.specs.locations && data.specs.locations.length > 0 && <div className={s.item}>
          <div className={s.label}>Location:</div>
          <LocationGoogleLink
            locations={data.specs.locations}
            hash={hasVisitSeciton ? 'visit' : undefined}
          />
        </div>}
        {data.specs.themes && data.specs.themes.length > 0 && <div className={s.item}>
          <div className={s.label}>Themes:</div>
          <div className={s.content}>
            <Tags
              tags={data.specs.themes.map((theme) => ({
                label: theme.title,
              }))}
            />
          </div>
        </div>}
      </div>
    </aside>
  )
}
