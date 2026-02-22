'use client'

import s from './LocationLink.module.scss'
import {LocationData} from '@/sanity/queries/fragments/location'
import Icon from '@/components/Common/ui/Icon'

export default function LocationGoogleLink({location}: {location: LocationData}) {
  if (!location) return <></>

  return (
    <div className={s.component}>
      <p>{location.name}</p>
      <a href="#visit" className={s.link}>
        <strong>View on Map </strong>
        <Icon name="arrowDown" alt={'↓'} size={16} />
      </a>
    </div>
  )
}
