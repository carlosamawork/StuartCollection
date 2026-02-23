'use client'

import {Dispatch, SetStateAction, useEffect, useRef, useState} from 'react'
import s from './SortComponent.module.scss'
import Icon from '@/components/Common/ui/Icon'
import {useIsMobileDevice} from '@/utils/isMobileClient'

type SortOption<CardObject extends object> = {
  label: string
  key: keyof CardObject // key in the CardObject that should be used for sorting
  sortLabel: string
  toggleOrder: () => void
}

export interface SortComponentProps<CardObject extends object> {
  options: SortOption<CardObject>[]
  currentOptionKey: keyof CardObject
  setCurrentOptionKey: (key: keyof CardObject) => void
  alignRight?: boolean
}

export default function SortComponent<CardObject extends object>({
  options,
  currentOptionKey,
  setCurrentOptionKey,
  alignRight,
}: SortComponentProps<CardObject>) {
  const [showSelector, setShowSelector] = useState<boolean>(false)

  const currentOption = options.find(({key}) => key === currentOptionKey) ?? options[0]

  const toggleShowSelector = () => {
    setShowSelector((v) => !v)
  }

  const {label, sortLabel, toggleOrder} = currentOption

  return (
    <div className={s.component}>
      <button onClick={() => toggleOrder()}>
        <Icon name="sort" alt="↑↓" />
      </button>
      <p className="p">{'Sort by'}</p>
      <div className={s.buttonContainer}>
        <button className={s.button} onClick={() => toggleShowSelector()}>
          <p className="p">
            <strong>{label}</strong>
          </p>
          <p className={`${s.sortLabel} p-small`}>{sortLabel}</p>
          <Icon name="chevronDown" alt="⌄" />
        </button>
        {showSelector && (
          <div className={s.selectorContainer} style={alignRight ? {right: 0} : {left: 0}}>
            <SortOptionSelector
              options={options}
              currentOptionKey={currentOptionKey}
              setCurrentOptionKey={setCurrentOptionKey}
              setShowSelector={setShowSelector}
            />
          </div>
        )}
      </div>
    </div>
  )
}

const SortOptionSelector = <CardObject extends object>({
  options,
  currentOptionKey,
  setCurrentOptionKey,
  setShowSelector,
}: SortComponentProps<CardObject> & {
  setShowSelector: Dispatch<SetStateAction<boolean>>
}) => {
  const isMobile = useIsMobileDevice()
  const ref = useRef<null | HTMLUListElement>(null)

  // Close Selector when user mouse leaves area in Desktop
  useEffect(() => {
    !isMobile && ref.current?.addEventListener('mouseleave', () => setShowSelector(false))
  }, [])

  // Close Selector when user mouse selects an option in Mobile
  useEffect(() => {
    isMobile && setShowSelector(false)
  }, [currentOptionKey])

  return (
    <ul className={s.selector} ref={ref}>
      {options?.map(({label, sortLabel, toggleOrder, key}, i) => {
        return (
          <li key={i}>
            <label>
              <input
                type="radio"
                name="sortOrder"
                value={key as string | number}
                checked={currentOptionKey === key}
                onChange={(e) => {
                  setCurrentOptionKey(e.target.value as keyof CardObject)
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
