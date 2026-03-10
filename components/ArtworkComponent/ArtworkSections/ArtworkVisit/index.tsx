'use client'

import Container from '@/components/Common/ui/Container'
import s from './ArtworkVisit.module.scss'
import {ArtworkVisitSectionData} from '@/sanity/queries/modules/artwork/visitSection'
import LocationGoogleLink from '@/components/ArtworkComponent/_shared/LocationGoogleLink'
import LocationDescription from '@/components/ArtworkComponent/_shared/LocationDescription'
import CustomMap from '@/components/Common/CustomMap/CustomMap'
import {LocationsMap} from '@/utils/Locations.map'

interface ArtworkVisitProps {
  section: ArtworkVisitSectionData
}

export default function ArtworkVisit({section}: ArtworkVisitProps) {
  if (!section) return <></>

  return (
    <Container>
      <div className={s.section} id="visit">
        <h2>{section.title}</h2>
        <div className={s.visitDetails}>
          <LocationDescription
            visitDescription={section.visitDescription}
            signupLink={section.signupLink}
          />
          <LocationGoogleLink locations={section.locations} showLabel hash="visit_map" />
        </div>
        <div className={s.map} id="visit_map">
          <CustomMap locations={section.locations.map(LocationsMap.toCoordinates)} />
        </div>
      </div>
    </Container>
  )
}
