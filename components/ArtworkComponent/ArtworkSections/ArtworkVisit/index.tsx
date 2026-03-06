'use client'

import Container from '@/components/Common/ui/Container'
import s from './ArtworkVisit.module.scss'
import {ArtworkVisitSectionData} from '@/sanity/queries/modules/artwork/visitSection'
import IframeComponent from '@/components/PageComponent/Iframe'
import LocationGoogleLink from '@/components/ArtworkComponent/_shared/LocationGoogleLink'
import LocationDescription from '@/components/ArtworkComponent/_shared/LocationDescription'

interface ArtworkVisitProps {
  section: ArtworkVisitSectionData
}

export default function ArtworkVisit({section}: ArtworkVisitProps) {
  if (!section) return <></>

  return (
    <Container>
      <div className={s.section}>
        <h2>{section.title}</h2>
        <div className={s.visitDetails}>
          <LocationDescription
            location={section.location}
            visitDescription={section.visitDescription}
            signupLink={section.signupLink}
          />
          <LocationGoogleLink location={section.location} showLabel />
        </div>
        <div className={s.iFrame}>
          <IframeComponent data={section.location.iframe} />
        </div>
      </div>
    </Container>
  )
}
