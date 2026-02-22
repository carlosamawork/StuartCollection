'use client'

import s from './FilterComponent.module.scss'
import {LocationData} from '@/sanity/queries/fragments/location'
import Icon from '@/components/Common/ui/Icon'
import {ComponentProps, Dispatch, SetStateAction, useEffect, useRef, useState} from 'react'
import {Tags} from '@/components/Common/ui/Tags/Tags'
import {useIsMobileDevice} from '@/utils/isMobileClient'

type TagsList = ComponentProps<typeof Tags>['tags']

interface Props {
  themeTags: TagsList
  selectedThemesIds: string[]
  selectedThemesList: string
}

export default function FilterComponent({themeTags, selectedThemesIds, selectedThemesList}: Props) {
  const [showSelector, setShowSelector] = useState<boolean>(false)

  const toggleShowSelector = () => {
    setShowSelector((v) => !v)
  }

  return (
    <div className={s.component}>
      <Icon name="filter" alt="Filter Icon" />
      <p className="p">{'Filter by'}</p>
      <div className={s.buttonContainer}>
        <button className={s.button} onClick={() => toggleShowSelector()}>
          <p className="p">
            <strong>{'Themes'}</strong>
          </p>
          <p className={`${s.sortLabel} p-small`}>{selectedThemesList}</p>
          <Icon name="chevronDown" alt="⌄" />
        </button>
        {showSelector && (
          <ThemesSelector
            themeTags={themeTags}
            selectedThemesIds={selectedThemesIds}
            setShowSelector={setShowSelector}
          />
        )}
      </div>
    </div>
  )
}

interface ThemesSelectorProps {
  themeTags: TagsList
  selectedThemesIds: string[]
  setShowSelector: Dispatch<SetStateAction<boolean>>
}

const ThemesSelector = ({themeTags, selectedThemesIds, setShowSelector}: ThemesSelectorProps) => {
  const isMobile = useIsMobileDevice()
  const ref = useRef<null | HTMLDivElement>(null)

  // Close Selector when user mouse leaves area in Desktop
  useEffect(() => {
    !isMobile && ref.current?.addEventListener('mouseleave', () => setShowSelector(false))
  }, [])

  // Close Selector when user mouse selects an option in Mobile
  useEffect(() => {
    isMobile && setShowSelector(false)
  }, [selectedThemesIds])

  return (
    <div className={s.selector} ref={ref}>
      <Tags tags={themeTags} />
    </div>
  )
}
