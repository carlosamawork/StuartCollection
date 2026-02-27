'use client'

import useDateHeader from '@/components/Common/HeaderComponent/components/DateHeader/hooks/useDateHeader'
import s from './DateHeader.module.scss'

export default function DateHeader({data}: any) {
  const {tempF, tempLoading, today} = useDateHeader({data})

  return (
    <div className={s.dateHeader}>
      <p>
        <strong>{today.isOpen ? 'Open today' : 'Closed today'}</strong>
      </p>
      <p>
        {today.timeLabel}
        {' | '}
        {tempLoading ? '—' : tempF == null ? '—' : `${Math.round(tempF)}ºF`}
      </p>
    </div>
  )
}
