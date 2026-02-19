'use client'

import s from './LocationDescription.module.scss'
import {LocationData} from '@/sanity/queries/fragments/location'
import {ButtonLink} from '@/components/Common/ui/Buttons/components/ButtonLink'
import TextBody from '@/components/Common/ui/TextBody'

interface LocationDescriptionProps {
  location: LocationData
  visitDescription: string
}

export default function LocationDescription({
  location,
  visitDescription,
}: LocationDescriptionProps) {
  if (!location || !visitDescription) return <></>

  return (
    <div className={s.component}>
      <TextBody body={visitDescription} size="sm" />
      <ButtonLink href="// TO-DO">Sign up to visit</ButtonLink>
    </div>
  )
}
