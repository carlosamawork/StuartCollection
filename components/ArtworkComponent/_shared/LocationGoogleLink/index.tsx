'use client'

import s from './LocationLink.module.scss'
import {LocationData} from '@/sanity/queries/fragments/location'
import Icon from '@/components/Common/ui/Icon'

interface Props {
  location: LocationData
  showLabel?: boolean
}

export default function LocationGoogleLink({location, showLabel}: Props) {
  if (!location) return <></>

  return (
    <div className={s.component}>
      <p>
        {showLabel && 'Directions: '}
        {location.name}
      </p>
      <a href="#visit" className={s.link}>
        <strong>View on Map </strong>
        <Icon name="arrowDown" alt={'↓'} size={16} />
      </a>
    </div>
  )
}
