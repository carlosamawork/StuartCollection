'use client'

import s from './LocationLink.module.scss'
import Image from 'next/image'
import {LocationData} from '@/sanity/queries/fragments/location'

export default function LocationGoogleLink({location}: {location: LocationData}) {
  if (!location) return <></>

  return (
    <div className={s.component}>
      <p>{location.name}</p>
      <a href="#visit" className={s.link}>
        <strong>View on Map </strong>
        <Image
          src="/assets/svg/arrow-down.svg"
          alt="↓"
          width={11}
          height={11}
          style={{width: 11, height: 11}}
        />
      </a>
    </div>
  )
}
