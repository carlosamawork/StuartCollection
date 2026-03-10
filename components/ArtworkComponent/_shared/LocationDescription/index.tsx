'use client'

import s from './LocationDescription.module.scss'
import {ButtonLink} from '@/components/Common/ui/Buttons/components/ButtonLink'
import TextBody from '@/components/Common/ui/TextBody'

interface LocationDescriptionProps {
  visitDescription: string
  signupLink: string | undefined
}

export default function LocationDescription({
  visitDescription,
  signupLink,
}: LocationDescriptionProps) {
  if (!visitDescription) return <></>

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
