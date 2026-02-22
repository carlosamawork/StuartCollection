'use client'

import s from './FilterComponent.module.scss'
import {LocationData} from '@/sanity/queries/fragments/location'
import Icon from '@/components/Common/ui/Icon'

export default function FilterComponent({location}: {location: LocationData}) {
  if (!location) return <></>

  return (
    <div className={s.component}>
      <p>{location.name}</p>
      <a href="#visit" className={s.link}>
        <strong>View on Map </strong>
        <Icon name="filter" alt={'Filter Icon'} />
      </a>
    </div>
  )
}
