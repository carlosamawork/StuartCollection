'use client'

import {useState} from 'react'
import s from './TabsLayout.module.scss'

export interface TabData {
  label: string
  content: React.ReactNode
}

interface Props {
  tabs: TabData[]
  initialTab?: string
  enableUrlHash?: boolean
  paddingTop?: number
}

export default function TabsLayout({tabs, initialTab, enableUrlHash, paddingTop = 40}: Props) {
  const [activeIndex, setActiveIndex] = useState(0)

  if (!tabs || tabs.length === 0) return null

  return (
    <div className={s.tabsLayout}>
      <div className={s.menu}>
        <div className={s.tabs}>
          {initialTab && <span key="initial">{initialTab}</span>}
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
      </div>
      <div style={{paddingTop}}>{tabs[activeIndex].content}</div>
    </div>
  )
}
