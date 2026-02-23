'use client'

import {CollectionLocationData} from '@/sanity/queries/queries/collection'
import s from './CollectionLocations.module.scss'
import IframeComponent from '@/components/PageComponent/Iframe'

interface Props {
  locations: CollectionLocationData[]
}

export default function CollectionLocations({locations}: Props) {
  return (
    <div className={s.section}>
      <ul className={s.grid}>
        {/* {locations && locations.length ? (
          locations.map((location, i) => (
            <li key={i}>
              <LocationCard location={location} />
            </li>
          ))
        ) : (
          <p>{'No locations found.'}</p>
        )} */}
        <li>
          <LocationCard location={locations?.[0]} />
        </li>
      </ul>
    </div>
  )
}

const LocationCard = ({location}: {location: CollectionLocationData}) => {
  if (!location.iframe) return <></>

  return (
    <div className={s.card}>
      <IframeComponent data={location.iframe} />
    </div>
  )
}
