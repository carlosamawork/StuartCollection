'use client'

import {Dispatch, SetStateAction, useEffect, useRef, useState} from 'react'
import s from './SortComponent.module.scss'
import Icon from '@/components/Common/ui/Icon'
import {useIsMobileDevice} from '@/utils/isMobileClient'

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

  const toggleShowSelector = () => {
    setShowSelector((v) => !v)
  }

  const {label, sortLabel, toggleOrder} = selectedOption

  return (
    <div className={s.component}>
      <button onClick={() => toggleOrder()}>
        <Icon name="sort" alt="↑↓" />
      </button>
      <p className="p">{'Sort by'}</p>
      <button className={s.button} onClick={() => toggleShowSelector()}>
        <p className="p">
          <strong>{label}</strong>
        </p>
        <p className={`${s.sortLabel} p-small`}>{sortLabel}</p>
        <Icon name="chevronDown" alt="⌄" />
      </button>
      {showSelector && (
        <SortOptionSelector
          sortOptions={sortOptions}
          selectedSortKey={selectedSortKey}
          setSelectedSortKey={setSelectedSortKey}
          setShowSelector={setShowSelector}
        />
      )}
    </div>
  )
}

const SortOptionSelector = <CardObject extends object>({
  sortOptions,
  selectedSortKey,
  setSelectedSortKey,
  setShowSelector,
}: Props<CardObject> & {setShowSelector: Dispatch<SetStateAction<boolean>>}) => {
  const isMobile = useIsMobileDevice()
  const ref = useRef<null | HTMLUListElement>(null)

  // Close Selector when user mouse leaves area in Desktop
  useEffect(() => {
    !isMobile && ref.current?.addEventListener('mouseleave', () => setShowSelector(false))
  }, [])

  // Close Selector when user mouse selects an option in Mobile
  useEffect(() => {
    isMobile && setShowSelector(false)
  }, [selectedSortKey])

  return (
    <ul className={s.selector} ref={ref}>
      {sortOptions?.map(({label, sortLabel, toggleOrder, key}, i) => {
        return (
          <li key={i}>
            <label>
              <input
                type="radio"
                name="sortOrder"
                value={key as string | number}
                checked={selectedSortKey === key}
                onChange={(e) => {
                  setSelectedSortKey(e.target.value as keyof CardObject)
                }}
              />
              <div className={s.labelContent}>
                <strong>{label}</strong>
                <p className="p-small">{sortLabel}</p>
              </div>
            </label>
          </li>
        )
      })}
    </ul>
  )
}
