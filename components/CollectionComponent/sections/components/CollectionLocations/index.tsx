'use client'

import {CollectionLocationData} from '@/sanity/queries/queries/collection'
import s from './CollectionLocations.module.scss'
import IframeComponent from '@/components/PageComponent/Iframe'
import Image from 'next/image'
import LazyImage from '@/components/Common/LazyImage'

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
        <LazyImage src="/locations.png" width={1500} height={1000} />
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
