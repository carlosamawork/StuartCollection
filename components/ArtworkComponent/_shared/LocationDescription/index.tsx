'use client'

import s from './LocationDescription.module.scss'
import {LocationData} from '@/sanity/queries/fragments/location'
import {ButtonLink} from '@/components/Common/ui/Buttons/components/ButtonLink'
import TextBody from '@/components/Common/ui/TextBody'

interface LocationDescriptionProps {
  location: LocationData
  visitDescription: string
  signupLink: string | undefined
}

export default function LocationDescription({
  location,
  visitDescription,
  signupLink,
}: LocationDescriptionProps) {
  if (!location || !visitDescription) return <></>

  return (
    <div className={s.component}>
      <TextBody body={visitDescription} size="sm" />
      {signupLink && (
        <ButtonLink href={signupLink} target="_blank">
          Sign up to visit
        </ButtonLink>
      )}
    </div>
  )
}
