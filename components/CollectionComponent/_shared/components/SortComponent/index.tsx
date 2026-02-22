'use client'

import {Dispatch, SetStateAction, useState} from 'react'
import s from './SortComponent.module.scss'
import Icon from '@/components/Common/ui/Icon/Icon'

export type SortComponentOption<CardObject extends object> = {
  label: string
  key: keyof CardObject // key in the CardObject that should be used for sorting
  sortLabel: string
  toggleOrder: () => void
}

interface Props<CardObject extends object> {
  sortOptions: SortComponentOption<CardObject>[]
  selectedSortKey: keyof CardObject
  setSelectedSortKey: Dispatch<SetStateAction<keyof CardObject>>
}

export default function SortComponent<CardObject extends object>({
  sortOptions,
  selectedSortKey,
  setSelectedSortKey,
}: Props<CardObject>) {
  const [showSelector, setShowSelector] = useState<boolean>(false)

  const selectedOption = sortOptions.find(({key}) => key === selectedSortKey) ?? sortOptions[0]

  const {label, sortLabel, toggleOrder} = selectedOption

  return (
    <div className={s.component}>
      <Icon name={'sort'} alt={'↑↓'} />
      <p className="p">{'Sort by'}</p>
      <button className={s.button} onClick={() => toggleOrder()}>
        <p className="p">
          <strong>{label}</strong>
        </p>
        <p className={`${s.label} p-small`}>{sortLabel}</p>
      </button>
      {sortOptions.length > 1 && (
        <button onClick={() => setShowSelector((v) => !v)}>
          <Icon name={'chevron-down'} alt={'⌄'} />
        </button>
      )}
      {showSelector && (
        <SortOptionSelector
          sortOptions={sortOptions}
          selectedSortKey={selectedSortKey}
          setSelectedSortKey={setSelectedSortKey}
        />
      )}
    </div>
  )
}

const SortOptionSelector = <CardObject extends object>({
  sortOptions,
  selectedSortKey,
  setSelectedSortKey,
}: Props<CardObject>) => {
  return (
    <form action="/procesar" method="POST">
      <ul className={s.selector}>
        {sortOptions?.map(({label, sortLabel, toggleOrder, key}, i) => {
          return (
            <li key={i}>
              <label>
                <input
                  type="radio"
                  name="sortOrder"
                  value={key}
                  checked={selectedSortKey === key}
                  onChange={(e) => setSelectedSortKey(e.target.value)}
                />
                <strong>{label}</strong>
                {sortLabel}
              </label>
            </li>
          )
        })}
      </ul>
    </form>
  )
}
