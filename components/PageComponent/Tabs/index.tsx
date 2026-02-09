'use client'

import { useMemo, useState } from 'react'
import s from './TabsComponent.module.scss'

import TitleParagraphsComponent from '../TitleParagraphs'
import TextParagraphsComponent from '../TextParagraphs'
import CalloutComponent from '../Callout'
import SeparatorComponent from '../Separator'
import AccordeonComponent from '../Accordeon/AccordeonComponent'
import ImageComponent from '../Image'
import JumbotronComponent from '../Jumbotron'
import PeopleComponent from '../People'
import TileGroupComponent from '../TileGroup'
import VideoComponent from '../Video'
import IframeComponent from '../Iframe'
import TwoColumnsComponent from '../TwoColumns'
import SliderComponent from '../Slider'
import MediaListComponent from '../MediaList'
import LazyImage from '@/components/Common/LazyImage'

export default function TabsComponent({ data }: { data: any }) {
  const tabs = useMemo(() => data?.tabs ?? [], [data])
  const [activeIndex, setActiveIndex] = useState(0)

  const activeTab = tabs?.[activeIndex]

  if (!tabs || tabs.length === 0) return null


  return (
    <div className={s.tabWrapper}>
      <div className={s.tabTitle}>
        {data?.title && <h2>{data.title}</h2>}
      </div>

      <div className={s.tabMenu}>
        <div className={s.tabs}>
          {tabs.map((tab: any, index: number) => {
            const isActive = index === activeIndex
            return (
              <button
                key={index}
                type="button"
                className={`${s.tab} ${isActive ? s.active : ''}`}
                onClick={() => setActiveIndex(index)}
                aria-current={isActive ? 'page' : undefined}
              >
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      <div className={s.tabContent}>
        {activeTab?.content?.length > 0 && (
          <div className={s.tabModules}>
            {activeTab.content.map((mod: any, moduleIndex: number) => (
              <div key={moduleIndex} className={s.module}>
                <div className={s.tabModules}>
                {mod._type === 'module.textTitles' && <TitleParagraphsComponent data={mod} />}
                {mod._type === 'module.textParagraphs' && <TextParagraphsComponent data={mod} />}
                {mod._type === 'module.callout' && <CalloutComponent data={mod} />}
                {mod._type === 'module.separator' && <SeparatorComponent data={mod} />}
                {mod._type === 'module.accordion' && <AccordeonComponent data={mod} />}
                {mod._type === 'module.image' && <ImageComponent data={mod} />}
                {mod._type === 'module.jumbotron' && <JumbotronComponent data={mod} />}
                {mod._type === 'module.people' && <PeopleComponent data={mod} />}
                {mod._type === 'module.tileGroup' && <TileGroupComponent data={mod} />}
                {mod._type === 'module.video' && <VideoComponent data={mod} />}
                {mod._type === 'module.iframe' && <IframeComponent data={mod} />}
                {mod._type === 'module.twoColumns' && <TwoColumnsComponent data={mod} />}
                {mod._type === 'module.slider' && <SliderComponent data={mod} />}
                {mod._type === 'module.mediaList' && <MediaListComponent data={mod} />}
              </div>
             
            </div>
            ))}
            
          </div>
        )}
        <div className={s.tabImage}>
            {activeTab.imageTab && (
                <LazyImage
                    src={activeTab.imageTab.imageUrl}
                    alt={activeTab.imageTab.filename || 'Image'}
                    width={activeTab.imageTab.metadata.dimensions.width || 800}
                    height={activeTab.imageTab.metadata.dimensions.height || 600}
                />
            )}
        </div>
        
      </div>
    </div>
  )
}
     