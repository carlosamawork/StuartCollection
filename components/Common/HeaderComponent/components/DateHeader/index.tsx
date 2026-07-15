'use client'

import useDateHeader from '@/components/Common/HeaderComponent/components/DateHeader/hooks/useDateHeader'
import s from './DateHeader.module.scss'

export default function DateHeader() {
  const {tempF, tempLoading} = useDateHeader()

  return (
    <div className={s.dateHeader}>
      <p>
        <strong>Open 24/7</strong>
      </p>
      <p>
        La Jolla
        {' | '}
        {tempLoading ? '—' : tempF == null ? '—' : `${Math.round(tempF)}ºF`}
      </p>
    </div>
  )
}
