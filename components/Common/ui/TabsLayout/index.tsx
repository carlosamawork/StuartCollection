'use client'

import {useEffect, useState} from 'react'
import s from './TabsLayout.module.scss'
import {useUrlHash} from '@/hooks/useUrlHash'

export interface TabData {
  label: string
  content: React.ReactNode
  id?: string
}

interface Props {
  tabs: TabData[]
  label?: string
  paddingTop?: number
  enableUrlHashInteraction?: boolean
  addPaddingToNav?: boolean
}

export default function TabsLayout({
  tabs,
  label,
  paddingTop = 40,
  enableUrlHashInteraction,
  addPaddingToNav,
}: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(enableUrlHashInteraction ? null : 0)
  const {hash, setHash} = useUrlHash()

  const currentTabId = activeIndex !== null ? tabs[activeIndex].id : undefined

  useEffect(() => {
    if (!enableUrlHashInteraction) return
    if (!currentTabId) return
    setHash(currentTabId)
  }, [activeIndex])

  useEffect(() => {
    if (!enableUrlHashInteraction) return
    if (hash === null) return
    const tabIndex = findTabIndex(hash)
    if (tabIndex !== activeIndex) {
      setActiveIndex(tabIndex)
    }
  }, [hash])

  const findTabIndex = (id: string | undefined) => {
    if (!id) return 0
    const index = tabs.findIndex((tab) => tab.id === id)
    if (index === -1) return 0
    return index
  }

  if (!tabs || tabs.length === 0 || activeIndex === null) return null

  return (
    <div className={s.tabsLayout}>
      <nav className={`${s.nav} ${addPaddingToNav ? s.container : ''}`}>
        <div className={s.tabs}>
          {label && <span key="initial">{label}</span>}
          {tabs.map((tab: any, index: number) => {
            const isActive = index === activeIndex
            return (
              <button
                key={index}
                type="button"
                className={isActive ? s.active : ''}
                onClick={() => setActiveIndex(index)}
                aria-current={isActive ? 'page' : undefined}
              >
                {tab.label}
              </button>
            )
          })}
        </div>
      </nav>
      <div className={addPaddingToNav ? s.container : ''} style={{paddingTop}}>
        {tabs[activeIndex].content}
      </div>
    </div>
  )
}
