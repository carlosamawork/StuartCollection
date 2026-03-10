'use client'

import s from './LocationLink.module.scss'
import {LocationData} from '@/sanity/queries/fragments/location'
import Icon from '@/components/Common/ui/Icon'

interface Props {
  locations: LocationData[]
  hash?: string
  showLabel?: boolean
}

export default function LocationGoogleLink({locations, hash, showLabel}: Props) {
  if (!locations || locations.length === 0) return <></>

  return (
    <div className={s.component}>
      {showLabel && <p>{'Directions: '}</p>}
      <ul>
        {locations.map((location, i) => (
          <li key={i}>{location.name}</li>
        ))}
      </ul>
      {hash && (
        <a href={`#${hash}`} className={s.link}>
          <strong>View on Map </strong>
          <Icon name="arrowDown" alt={'↓'} size={16} />
        </a>
      )}
    </div>
  )
}
